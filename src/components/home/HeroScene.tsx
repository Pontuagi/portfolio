"use client";

import { Float, Line, PerspectiveCamera, PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Points as ThreePoints, Group } from "three";

type Palette = {
  background: string;
  block: string;
  accent: string;
  line: string;
  particle: string;
};

const lightPalette: Palette = {
  background: "#f7f5ef",
  block: "#0f766e",
  accent: "#f4c86a",
  line: "#0d9488",
  particle: "#134e4a",
};

const darkPalette: Palette = {
  background: "#071412",
  block: "#2dd4bf",
  accent: "#f5c96b",
  line: "#5eead4",
  particle: "#ccfbf1",
};

export default function HeroScene() {
  const prefersReducedMotion = useReducedMotion();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const palette = useSystemPalette();

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setIsSmallScreen(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div aria-hidden="true" className="h-[22rem] min-h-80 w-full sm:h-[30rem]">
      <Canvas
        dpr={isSmallScreen ? [1, 1.25] : [1, 1.75]}
        gl={{ antialias: !isSmallScreen, alpha: true, powerPreference: "high-performance" }}
        frameloop={prefersReducedMotion ? "demand" : "always"}
      >
        <PerspectiveCamera makeDefault position={[0, 2.2, 7]} fov={44} />
        <color attach="background" args={[palette.background]} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} />
        <pointLight position={[-3, 2, 3]} intensity={0.7} color={palette.accent} />
        <BuilderPath
          compact={isSmallScreen}
          paused={Boolean(prefersReducedMotion)}
          palette={palette}
        />
      </Canvas>
    </div>
  );
}

function BuilderPath({
  compact,
  paused,
  palette,
}: {
  compact: boolean;
  paused: boolean;
  palette: Palette;
}) {
  const groupRef = useRef<Group>(null);
  const pointRef = useRef<ThreePoints>(null);
  const nodes = compact ? compactNodes : desktopNodes;
  const linePoints = useMemo(() => nodes.map((node) => node.position), [nodes]);

  useFrame(({ clock }) => {
    if (paused || !groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(elapsed * 0.18) * 0.08;
    groupRef.current.position.y = Math.sin(elapsed * 0.35) * 0.08;

    if (pointRef.current) {
      pointRef.current.rotation.y = elapsed * 0.025;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.25, 0]} rotation={[-0.12, -0.2, 0]}>
      <Line
        points={linePoints}
        color={palette.line}
        lineWidth={compact ? 1.25 : 1.7}
        transparent
        opacity={0.58}
      />

      {nodes.map((node, index) => (
        <Float
          key={`${node.position.join("-")}-${index}`}
          speed={paused ? 0 : node.speed}
          rotationIntensity={paused ? 0 : 0.35}
          floatIntensity={paused ? 0 : node.float}
        >
          <mesh position={node.position} rotation={node.rotation}>
            <boxGeometry args={node.size} />
            <meshStandardMaterial
              color={index % 3 === 1 ? palette.accent : palette.block}
              emissive={index % 3 === 1 ? palette.accent : palette.block}
              emissiveIntensity={0.12}
              roughness={0.55}
              metalness={0.08}
            />
          </mesh>
        </Float>
      ))}

      <mesh position={[0, -1.15, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.05, compact ? 1.08 : 1.1, 80]} />
        <meshBasicMaterial color={palette.line} transparent opacity={0.22} />
      </mesh>

      {!compact ? (
        <Points ref={pointRef} positions={particlePositions} stride={3}>
          <PointMaterial
            transparent
            color={palette.particle}
            size={0.035}
            sizeAttenuation
            depthWrite={false}
            opacity={0.55}
          />
        </Points>
      ) : null}
    </group>
  );
}

function useSystemPalette() {
  const [palette, setPalette] = useState<Palette>(lightPalette);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setPalette(query.matches ? darkPalette : lightPalette);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return palette;
}

const desktopNodes = [
  {
    position: [-2.5, -0.6, 0] as [number, number, number],
    rotation: [0.25, 0.3, 0.1] as [number, number, number],
    size: [0.72, 0.44, 0.36] as [number, number, number],
    speed: 1.1,
    float: 0.35,
  },
  {
    position: [-1.35, 0.25, -0.35] as [number, number, number],
    rotation: [0.1, -0.25, 0.18] as [number, number, number],
    size: [0.52, 0.78, 0.42] as [number, number, number],
    speed: 0.95,
    float: 0.28,
  },
  {
    position: [0, -0.1, 0.25] as [number, number, number],
    rotation: [0.3, 0.55, -0.14] as [number, number, number],
    size: [0.86, 0.5, 0.5] as [number, number, number],
    speed: 1.2,
    float: 0.3,
  },
  {
    position: [1.35, 0.55, -0.2] as [number, number, number],
    rotation: [-0.2, 0.2, 0.28] as [number, number, number],
    size: [0.48, 0.95, 0.42] as [number, number, number],
    speed: 0.8,
    float: 0.24,
  },
  {
    position: [2.55, -0.25, 0.1] as [number, number, number],
    rotation: [0.18, -0.38, -0.2] as [number, number, number],
    size: [0.78, 0.54, 0.38] as [number, number, number],
    speed: 1.05,
    float: 0.32,
  },
];

const compactNodes = desktopNodes.filter((_, index) => index !== 1 && index !== 3);

const particlePositions = new Float32Array([
  -2.9, 1.25, -0.9, -2.2, 1.6, 0.6, -1.7, -1.25, -0.7, -1.05, 1.25, 0.9,
  -0.55, -1.55, 0.45, 0.1, 1.45, -0.85, 0.7, -1.2, -0.95, 1.05, 1.2, 0.7,
  1.7, -1.45, 0.35, 2.15, 1.45, -0.55, 2.75, -0.95, 0.8, 3.05, 0.7, -0.2,
]);
