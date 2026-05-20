"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { skillCategories } from "@/data/portfolio-data";

// Helper to get a brighter version of the color for better visibility
const getBrightColor = (hex: string) => {
  // Simple brightening logic or just return a lighter variant
  // For now, we'll rely on emissive properties, but let's keep the base color vibrant
  return hex;
};

interface SkillNodeProps {
  name: string;
  color: string;
  position: [number, number, number];
  onHover: (name: string | null) => void;
}

function SkillNode({ name, color, position, onHover }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Gentle floating animation handled by <Float> wrapper, but we can add slight rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        {/* Glow Light */}
        <pointLight
          color={color}
          intensity={hovered ? 3 : 1.5}
          distance={4}
          decay={2}
        />
        
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
          scale={hovered ? 1.3 : 1}
        >
          <sphereGeometry args={[0.35, 32, 32]} />
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={0.1}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Label */}
        <Html
          position={[0, -0.8, 0]}
          center
          style={{
            color: hovered ? "#ffffff" : color,
            fontSize: "13px",
            fontWeight: hovered ? 700 : 600,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            textShadow: `0 0 10px ${color}`,
            transition: "all 0.3s ease",
            fontFamily: "var(--font-body)",
          }}
        >
          {name}
        </Html>
      </group>
    </Float>
  );
}

function SkillGalaxyScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Calculate positions for a structured "Molecule" layout
  const skillNodes = useMemo(() => {
    const nodes: { name: string; color: string; position: [number, number, number] }[] = [];
    const categoryCount = skillCategories.length;
    const mainRadius = 6; // Distance of category centers from origin

    skillCategories.forEach((category, catIndex) => {
      // Position of the category center
      const angle = (catIndex / categoryCount) * Math.PI * 2;
      const cx = Math.cos(angle) * mainRadius;
      const cz = Math.sin(angle) * mainRadius;
      const cy = (Math.random() - 0.5) * 2; // Slight vertical variation for categories

      // Position skills around the category center
      const skillCount = category.skills.length;
      const clusterRadius = 1.5;

      category.skills.forEach((skill, skillIndex) => {
        const skillAngle = (skillIndex / skillCount) * Math.PI * 2;
        
        // Add some randomness to make it look organic but structured
        const r = clusterRadius * (0.6 + Math.random() * 0.4);
        const x = cx + Math.cos(skillAngle) * r;
        const y = cy + (Math.random() - 0.5) * 1.2;
        const z = cz + Math.sin(skillAngle) * r;

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
      <Canvas camera={{ position: [0, 4, 14], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4444ff" />
        
        {/* Background Stars (Optional subtle effect) */}
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
