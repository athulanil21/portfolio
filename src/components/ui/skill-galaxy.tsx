"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, MeshDistortMaterial } from "@react-three/drei";
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
      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.15;
      meshRef.current.rotation.y += 0.005;
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
        scale={hovered ? 1.4 : 1}
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>
      
      {/* Html ensures text always faces camera and is crisp */}
      <Html
        position={[0, -0.7, 0]}
        center
        style={{
          color: hovered ? "#ffffff" : "#8888a0",
          fontSize: "12px",
          fontWeight: 500,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          textShadow: "0 0 4px rgba(0,0,0,0.8)",
          transition: "color 0.2s",
        }}
      >
        {name}
      </Html>
    </group>
  );
}

function SkillGalaxyScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Calculate positions for clustered layout with better distribution
  const skillNodes = useMemo(() => {
    const nodes: { name: string; color: string; position: [number, number, number] }[] = [];
    const categoryCount = skillCategories.length;
    const mainRadius = 5; // Distance of clusters from center
    const clusterRadius = 1.8; // Spread within a cluster

    skillCategories.forEach((category, catIndex) => {
      // Angle for this category's cluster
      const angle = (catIndex / categoryCount) * Math.PI * 2;
      const centerX = Math.cos(angle) * mainRadius;
      const centerZ = Math.sin(angle) * mainRadius;

      // Distribute skills in a circle/arc within the cluster
      category.skills.forEach((skill, skillIndex) => {
        const skillAngle = (skillIndex / category.skills.length) * Math.PI * 2;
        const r = clusterRadius * (0.5 + Math.random() * 0.5); // Random radius within cluster
        
        const x = centerX + Math.cos(skillAngle) * r;
        const y = (Math.random() - 0.5) * 1.5; // Vertical spread
        const z = centerZ + Math.sin(skillAngle) * r;

        nodes.push({
          name: skill.name,
          color: category.color,
          position: [x, y, z],
        });
      });
    });

    return nodes;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && !hoveredSkill) {
      groupRef.current.rotation.y += delta * 0.08;
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
      <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -5, -10]} intensity={0.6} color="#00b4ff" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#a855f7" />
        <SkillGalaxyScene />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
