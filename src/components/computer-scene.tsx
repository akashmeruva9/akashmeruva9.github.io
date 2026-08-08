"use client";

/* three.js objects are mutable by design, and useFrame runs outside React's
   render cycle — flagging `texture.needsUpdate = true` as an illegal mutation
   is a false positive here. Scoped to this file only. */
/* eslint-disable react-hooks/immutability */

import {
  Canvas,
  useFrame,
  useThree,
  type ThreeElements,
} from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const ACCENT = "#e8734a";
const CASE = "#1c1917";
const CASE_LIGHT = "#2a2523";

/* ── Screen texture ────────────────────────────────────────────
   A terminal drawn to a 2D canvas and used as an emissive map, so
   the monitor shows real content instead of a flat glow. */

const SCREEN_W = 1024;
const SCREEN_H = 640;

const LINES: { text: string; tone: "dim" | "ink" | "accent" }[] = [
  { text: "$ saoma --watch", tone: "dim" },
  { text: "▸ health sweep      15 hosts", tone: "ink" },
  { text: "▸ anomaly           disk 94%", tone: "ink" },
  { text: "▸ remediate         auto ✓", tone: "accent" },
  { text: "", tone: "dim" },
  { text: "$ dnsq add CNAME app.corp", tone: "dim" },
  { text: "▸ 13 tools · RAG lookup", tone: "ink" },
  { text: "▸ 920 zones synced", tone: "accent" },
  { text: "", tone: "dim" },
  { text: "$ agents status", tone: "dim" },
  { text: "▸ 10/10 online", tone: "accent" },
];

type Screen = { canvas: HTMLCanvasElement; texture: THREE.CanvasTexture };

function createScreen(): Screen {
  const canvas = document.createElement("canvas");
  canvas.width = SCREEN_W;
  canvas.height = SCREEN_H;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return { canvas, texture };
}

function useScreenTexture() {
  // Created once and repainted every frame by the render loop — never a
  // reason to re-render React. This component is client-only (ssr: false),
  // so `document` is always available in the initialiser.
  const [screen] = useState(createScreen);

  useEffect(() => () => screen.texture.dispose(), [screen]);

  // Typewriter reveal, then a blinking cursor.
  const progress = useRef(0);
  useFrame((state) => {
    const { canvas, texture } = screen;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const total = LINES.reduce((n, l) => n + l.text.length + 1, 0);
    progress.current = Math.min(total, state.clock.elapsedTime * 34);

    ctx.fillStyle = "#0a0908";
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    // Warm vignette so the glass reads as curved.
    const glow = ctx.createRadialGradient(
      SCREEN_W / 2,
      SCREEN_H / 2,
      60,
      SCREEN_W / 2,
      SCREEN_H / 2,
      SCREEN_W * 0.72,
    );
    glow.addColorStop(0, "rgba(232,115,74,0.10)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    ctx.font = "500 30px ui-monospace, 'SF Mono', Menlo, monospace";
    ctx.textBaseline = "top";

    let budget = progress.current;
    let y = 54;
    let cursor: [number, number] | null = null;

    for (const line of LINES) {
      if (budget <= 0) break;
      const shown = line.text.slice(0, Math.floor(budget));
      ctx.fillStyle =
        line.tone === "accent"
          ? ACCENT
          : line.tone === "ink"
            ? "#cdc5be"
            : "#6f6660";
      ctx.fillText(shown, 56, y);
      cursor = [56 + ctx.measureText(shown).width + 6, y];
      budget -= line.text.length + 1;
      y += 50;
    }

    // Block cursor, blinking at ~1.6Hz.
    if (cursor && Math.sin(state.clock.elapsedTime * 5) > -0.2) {
      ctx.fillStyle = ACCENT;
      ctx.fillRect(cursor[0], cursor[1] + 3, 15, 30);
    }

    // Scanlines.
    ctx.fillStyle = "rgba(0,0,0,0.16)";
    for (let sy = 0; sy < SCREEN_H; sy += 4) ctx.fillRect(0, sy, SCREEN_W, 2);

    texture.needsUpdate = true;
  });

  return screen.texture;
}

/* ── The machine ───────────────────────────────────────────── */

function Computer(props: ThreeElements["group"]) {
  const screen = useScreenTexture();

  return (
    <group {...props}>
      {/* Monitor shell */}
      <RoundedBox args={[3.5, 2.35, 0.22]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color={CASE} roughness={0.55} metalness={0.25} />
      </RoundedBox>

      {/* Bezel inset */}
      <RoundedBox
        args={[3.24, 2.09, 0.02]}
        radius={0.04}
        smoothness={4}
        position={[0, 0.04, 0.12]}
      >
        <meshStandardMaterial color="#0a0908" roughness={0.9} />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0.04, 0.135]}>
        <planeGeometry args={[3.12, 1.97]} />
        {screen ? (
          <meshStandardMaterial
            map={screen}
            emissiveMap={screen}
            emissive="#ffffff"
            emissiveIntensity={1.15}
            toneMapped={false}
          />
        ) : (
          <meshStandardMaterial color="#0a0908" />
        )}
      </mesh>

      {/* Chin + power LED */}
      <mesh position={[0, -1.06, 0.13]}>
        <boxGeometry args={[3.2, 0.16, 0.02]} />
        <meshStandardMaterial color={CASE_LIGHT} roughness={0.6} />
      </mesh>
      <mesh position={[1.4, -1.06, 0.15]}>
        <circleGeometry args={[0.028, 16]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>

      {/* Neck + foot */}
      <mesh position={[0, -1.5, -0.05]}>
        <cylinderGeometry args={[0.11, 0.14, 0.62, 20]} />
        <meshStandardMaterial color={CASE_LIGHT} roughness={0.4} metalness={0.5} />
      </mesh>
      <RoundedBox
        args={[1.5, 0.09, 0.78]}
        radius={0.04}
        smoothness={4}
        position={[0, -1.83, 0.05]}
      >
        <meshStandardMaterial color={CASE_LIGHT} roughness={0.4} metalness={0.5} />
      </RoundedBox>

      {/* Keyboard */}
      <group position={[0, -1.92, 1.35]} rotation={[-0.06, 0, 0]}>
        <RoundedBox args={[2.6, 0.1, 0.85]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color={CASE} roughness={0.7} />
        </RoundedBox>
        <Keys />
      </group>
    </group>
  );
}

/** Keycaps, instanced-by-hand into a 5×14 grid. */
function Keys() {
  const keys = useMemo(() => {
    const out: [number, number, number][] = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 14; col++) {
        out.push([(col - 6.5) * 0.172, 0.06, (row - 2) * 0.15]);
      }
    }
    return out;
  }, []);

  return (
    <>
      {keys.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.14, 0.03, 0.115]} />
          <meshStandardMaterial color="#3a3330" roughness={0.85} />
        </mesh>
      ))}
    </>
  );
}

/**
 * Frames the rig by measuring it, so it fills the canvas without cropping at
 * any container shape — the hero column is portrait on desktop and roughly
 * square on phones, which no hand-tuned camera distance covers.
 */
function FitCamera({ target }: { target: React.RefObject<THREE.Group | null> }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);

  useEffect(() => {
    const obj = target.current;
    if (!obj) return;

    const sphere = new THREE.Box3()
      .setFromObject(obj)
      .getBoundingSphere(new THREE.Sphere());
    const aspect = size.width / Math.max(1, size.height);
    const vFov = (camera.fov * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);

    // Distance at which the bounding sphere fits both axes. A sphere around a
    // wide, flat object massively overestimates, so close most of that gap —
    // 0.66 fills the frame without clipping the monitor's corners.
    const distance =
      Math.max(sphere.radius / Math.sin(vFov / 2), sphere.radius / Math.sin(hFov / 2)) *
      0.66;

    camera.position.set(sphere.center.x, sphere.center.y, sphere.center.z + distance);
    camera.lookAt(sphere.center);
    camera.updateProjectionMatrix();
  }, [camera, size, target]);

  return null;
}

/** Tilts the whole rig toward the pointer, damped. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const targetY = state.pointer.x * 0.32;
    const targetX = -state.pointer.y * 0.16;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
  });

  return <group ref={group}>{children}</group>;
}

/* ── Canvas ────────────────────────────────────────────────── */

export default function ComputerScene() {
  const rig = useRef<THREE.Group>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 6.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <FitCamera target={rig} />
      <ambientLight intensity={0.75} />
      {/* Key light, near-neutral, from the upper left. */}
      <directionalLight position={[-4, 5, 4]} intensity={2.2} color="#fff1e6" />
      {/* Cool rim to separate the case from the background. */}
      <directionalLight position={[5, 1.5, -4]} intensity={1.4} color="#8fadff" />
      {/* Just enough screen bounce to warm the bezel — not the whole case. */}
      <pointLight position={[0, 0, 1.4]} intensity={2.6} distance={3.2} color={ACCENT} />

      <Rig>
        <group ref={rig}>
          <Float
            speed={reduced ? 0 : 1.4}
            rotationIntensity={reduced ? 0 : 0.22}
            floatIntensity={reduced ? 0 : 0.5}
          >
            <Computer position={[0, 0.55, 0]} rotation={[0.06, -0.28, 0]} />
          </Float>
        </group>
      </Rig>
    </Canvas>
  );
}
