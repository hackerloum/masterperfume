"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { BottleStyleId } from "@/types";
import {
  buildLiquidPoints,
  getBottleProfile,
  sizeScale,
  type CapSpec,
  type ProfilePoint,
} from "./bottleProfiles";

const SEGMENTS = 64;

function toVec2(points: ProfilePoint[]) {
  return points.map(([r, y]) => new THREE.Vector2(r, y));
}

/** The cap geometry varies per bottle style. */
function Cap({ cap, neckTopY }: { cap: CapSpec; neckTopY: number }) {
  const metal = (
    <meshStandardMaterial color={cap.color} roughness={0.35} metalness={0.55} />
  );

  switch (cap.type) {
    case "screw":
      return (
        <mesh position={[0, neckTopY + cap.h / 2 - 0.04, 0]} castShadow>
          <cylinderGeometry args={[cap.r, cap.r, cap.h, SEGMENTS]} />
          {metal}
        </mesh>
      );

    case "roller":
      return (
        <group>
          <mesh position={[0, neckTopY + cap.collarH / 2 - 0.02, 0]}>
            <cylinderGeometry
              args={[cap.collarR, cap.collarR, cap.collarH, SEGMENTS]}
            />
            {metal}
          </mesh>
          <mesh
            position={[0, neckTopY + cap.collarH + cap.capH / 2 - 0.02, 0]}
            castShadow
          >
            <cylinderGeometry args={[cap.capR, cap.capR, cap.capH, SEGMENTS]} />
            {metal}
          </mesh>
        </group>
      );

    case "spray":
      return (
        <group>
          {/* crimp collar */}
          <mesh position={[0, neckTopY + cap.collarH / 2 - 0.02, 0]}>
            <cylinderGeometry
              args={[cap.collarR, cap.collarR, cap.collarH, SEGMENTS]}
            />
            {metal}
          </mesh>
          {/* stem */}
          <mesh position={[0, neckTopY + cap.collarH + cap.stemH / 2, 0]}>
            <cylinderGeometry
              args={[cap.stemR, cap.stemR, cap.stemH, SEGMENTS]}
            />
            {metal}
          </mesh>
          {/* actuator button */}
          <mesh
            position={[0, neckTopY + cap.collarH + cap.stemH + 0.05, 0.02]}
            castShadow
          >
            <boxGeometry args={[0.26, 0.12, 0.22]} />
            {metal}
          </mesh>
        </group>
      );

    case "flask":
      return (
        <group>
          <mesh position={[0, neckTopY + cap.h / 2 - 0.03, 0]} castShadow>
            <cylinderGeometry args={[cap.r, cap.r * 0.92, cap.h, SEGMENTS]} />
            {metal}
          </mesh>
          <mesh position={[0, neckTopY + cap.h + cap.knobR * 0.6, 0]} castShadow>
            <sphereGeometry args={[cap.knobR, SEGMENTS, SEGMENTS]} />
            {metal}
          </mesh>
        </group>
      );
  }
}

function Bottle({
  style,
  oilColor,
  sizeMl,
}: {
  style: BottleStyleId;
  oilColor: string;
  sizeMl: number;
}) {
  const profile = useMemo(() => getBottleProfile(style), [style]);
  const wallPoints = useMemo(() => toVec2(profile.wall), [profile]);
  const liquidPoints = useMemo(
    () => toVec2(buildLiquidPoints(profile)),
    [profile]
  );
  const scale = sizeScale(sizeMl);
  const yOffset = -(profile.totalHeight * scale) / 2;

  return (
    <>
      <group position={[0, yOffset, 0]} scale={scale}>
        {/* Liquid (opaque, tinted to the oil colour) */}
        <mesh>
          <latheGeometry args={[liquidPoints, SEGMENTS]} />
          <meshStandardMaterial
            color={oilColor}
            roughness={0.18}
            metalness={0}
            emissive={oilColor}
            emissiveIntensity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Glass shell (translucent overlay) */}
        <mesh renderOrder={1}>
          <latheGeometry args={[wallPoints, SEGMENTS]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.22}
            roughness={0.06}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.08}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        <Cap cap={profile.cap} neckTopY={profile.neckTopY} />
      </group>

      <ContactShadows
        position={[0, yOffset - 0.01, 0]}
        opacity={0.35}
        scale={4}
        blur={2.6}
        far={3}
        resolution={256}
        color="#000000"
      />
    </>
  );
}

export default function Bottle3DScene({
  style,
  oilColor,
  sizeMl,
}: {
  style: BottleStyleId;
  oilColor: string;
  sizeMl: number;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.15, 4.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} />
      <pointLight position={[0, -2, 3]} intensity={0.3} />

      <Bottle style={style} oilColor={oilColor} sizeMl={sizeMl} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.6}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
