"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function Particles({ count, mouse }: { count: number; mouse: React.RefObject<{ x: number; y: number } | null> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002,
        scale: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;

    particles.forEach((p, i) => {
      // Gentle floating motion
      p.x += Math.sin(time * p.speed + i) * 0.001 + p.vx;
      p.y += Math.cos(time * p.speed + i * 0.7) * 0.001 + p.vy;

      // Wrap around bounds
      if (p.x > 10) p.x = -10;
      if (p.x < -10) p.x = 10;
      if (p.y > 10) p.y = -10;
      if (p.y < -10) p.y = 10;

      // Mouse repulsion
      const dx = p.x - mx * 5;
      const dy = p.y - my * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.01;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshBasicMaterial color="#00b4ff" transparent opacity={0.5} />
    </instancedMesh>
  );
}

function Lines({ count, mouse }: { count: number; mouse: React.RefObject<{ x: number; y: number } | null> }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const maxConnections = 150;

  const positions = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);
  const colors = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);

  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < Math.min(count, 80); i++) {
      temp.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 16,
        z: (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.005,
        vy: (Math.random() - 0.5) * 0.005,
        speed: Math.random() * 0.2 + 0.1,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.getElapsedTime();
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;

    // Update node positions
    nodes.forEach((n, i) => {
      n.x += Math.sin(time * n.speed + i) * 0.003 + n.vx;
      n.y += Math.cos(time * n.speed + i * 0.5) * 0.003 + n.vy;
      if (n.x > 8) n.x = -8;
      if (n.x < -8) n.x = 8;
      if (n.y > 8) n.y = -8;
      if (n.y < -8) n.y = 8;

      // Mouse influence
      const dx = n.x - mx * 5;
      const dy = n.y - my * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        const force = (4 - dist) * 0.003;
        n.x += (dx / dist) * force;
        n.y += (dy / dist) * force;
      }
    });

    // Draw connections
    let lineIdx = 0;
    for (let i = 0; i < nodes.length && lineIdx < maxConnections; i++) {
      for (let j = i + 1; j < nodes.length && lineIdx < maxConnections; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 3) {
          const alpha = 1 - dist / 3;
          const idx = lineIdx * 6;

          positions[idx] = nodes[i].x;
          positions[idx + 1] = nodes[i].y;
          positions[idx + 2] = nodes[i].z;
          positions[idx + 3] = nodes[j].x;
          positions[idx + 4] = nodes[j].y;
          positions[idx + 5] = nodes[j].z;

          // Blue to purple gradient
          colors[idx] = 0;
          colors[idx + 1] = 0.7 * alpha;
          colors[idx + 2] = 1 * alpha;
          colors[idx + 3] = 0.66 * alpha;
          colors[idx + 4] = 0.33 * alpha;
          colors[idx + 5] = 0.97 * alpha;

          lineIdx++;
        }
      }
    }

    // Clear remaining
    for (let i = lineIdx * 6; i < maxConnections * 6; i++) {
      positions[i] = 0;
      colors[i] = 0;
    }

    const geom = linesRef.current.geometry;
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;
    geom.setDrawRange(0, lineIdx * 2);
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.3} />
    </lineSegments>
  );
}

function Scene() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const count = isMobile ? 200 : 500;

  useFrame(({ pointer }) => {
    mouseRef.current = { x: pointer.x, y: pointer.y };
  });

  return (
    <>
      <Particles count={count} mouse={mouseRef} />
      {!isMobile && <Lines count={count} mouse={mouseRef} />}
      <ambientLight intensity={0.1} />
    </>
  );
}

export default function ParticleField() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reducedMotion || isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
