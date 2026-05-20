"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { skillCategories } from "@/data/portfolio-data";

interface SkillNodeProps {
  name: string;
  color: string;
  position: [number, number, number];
  onHover: (name: string | null) => void;
}

function SkillNode({ name, color, position, onHover }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setHovered(true);
          onHover(name);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
        scale={hovered ? 1.5 : 1}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.3}
        color={hovered ? "#ffffff" : "#8888a0"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
}

function SkillGalaxyScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Calculate positions for clustered layout
  const skillNodes = useMemo(() => {
    const nodes: { name: string; color: string; position: [number, number, number] }[] = [];
    const categoryCount = skillCategories.length;
    const radius = 4;

    skillCategories.forEach((category, catIndex) => {
      const angle = (catIndex / categoryCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      category.skills.forEach((skill, skillIndex) => {
        const spread = 1.2;
        const offsetX = (Math.random() - 0.5) * spread;
        const offsetY = (Math.random() - 0.5) * spread;
        const offsetZ = (Math.random() - 0.5) * spread;

        nodes.push({
          name: skill.name,
          color: category.color,
          position: [x + offsetX, offsetY, z + offsetZ],
        });
      });
    });

    return nodes;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && !hoveredSkill) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {skillNodes.map((node, i) => (
        <SkillNode
          key={`${node.name}-${i}`}
          name={node.name}
          color={node.color}
          position={node.position}
          onHover={setHoveredSkill}
        />
      ))}
    </group>
  );
}

export default function SkillGalaxy() {
  return (
    <div className="h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00b4ff" />
        <SkillGalaxyScene />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
