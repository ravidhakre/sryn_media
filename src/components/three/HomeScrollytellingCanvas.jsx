import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import StudioLighting from './StudioLighting';
import WebGLErrorBoundary from './WebGLErrorBoundary';

// Smooth bell-curve weight for chapter visibility across scroll progress [0..1]
function chapterWeight(progress, start, end, feather = 0.065) {
  const fadeIn = THREE.MathUtils.smoothstep(progress, start - feather, start + feather);
  const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, end - feather, end + feather);
  if (start === 0) return fadeOut;
  if (end === 1) return fadeIn;
  return fadeIn * fadeOut;
}

// Custom 3D extruded heart geometry
function useHeartGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.25);
    shape.bezierCurveTo(0, 0.25, -0.05, 0.5, -0.25, 0.5);
    shape.bezierCurveTo(-0.55, 0.5, -0.55, 0.15, -0.55, 0.15);
    shape.bezierCurveTo(-0.55, -0.1, -0.35, -0.32, 0, -0.52);
    shape.bezierCurveTo(0.35, -0.32, 0.55, -0.1, 0.55, 0.15);
    shape.bezierCurveTo(0.55, 0.15, 0.55, 0.5, 0.25, 0.5);
    shape.bezierCurveTo(0.08, 0.5, 0, 0.25, 0, 0.25);

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    geom.center();
    return geom;
  }, []);
}

// Custom rounded triangle play button geometry
function usePlayGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.22, -0.26);
    shape.lineTo(0.28, 0);
    shape.lineTo(-0.22, 0.26);
    shape.closePath();

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    geom.center();
    return geom;
  }, []);
}

/* =========================================================
   CHAPTER 1 (0%–20%): THE SPARK
   Translucent frosted-glass 3D Prism/Cube with glowing mini nodes
========================================================= */
function ChapterSpark({ progressRef }) {
  const groupRef = useRef();
  const prismRef = useRef();
  const coreNodesRef = useRef();

  const innerNodes = useMemo(
    () => [
      { pos: [0, 0, 0], r: 0.22, color: '#4F46E5' },
      { pos: [0.52, 0.38, 0.24], r: 0.11, color: '#FF5A36' },
      { pos: [-0.48, 0.42, -0.18], r: 0.1, color: '#6366F1' },
      { pos: [0.36, -0.45, -0.32], r: 0.12, color: '#4F46E5' },
      { pos: [-0.44, -0.36, 0.36], r: 0.1, color: '#FF5A36' },
      { pos: [0.05, 0.56, -0.28], r: 0.08, color: '#818CF8' },
      { pos: [-0.14, -0.52, -0.1], r: 0.09, color: '#FF7A59' },
    ],
    []
  );

  const filaments = useMemo(() => {
    const pairs = [];
    for (let i = 1; i < innerNodes.length; i++) {
      pairs.push([innerNodes[0].pos, innerNodes[i].pos]);
    }
    pairs.push([innerNodes[1].pos, innerNodes[2].pos]);
    pairs.push([innerNodes[3].pos, innerNodes[4].pos]);
    return pairs;
  }, [innerNodes]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const p = progressRef.current;
    const w = chapterWeight(p, 0, 0.22, 0.065);
    groupRef.current.visible = w > 0.005;

    const targetScale = THREE.MathUtils.lerp(0.2, 1.08, w);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 5, delta)
    );
    // Open slightly as we transition into Chapter 2
    const openSpread = THREE.MathUtils.smoothstep(p, 0.12, 0.25);
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      Math.sin(state.clock.elapsedTime * 1.1) * 0.14 + openSpread * 0.6,
      4,
      delta
    );

    if (prismRef.current) {
      prismRef.current.rotation.x += delta * 0.24;
      prismRef.current.rotation.y += delta * 0.34;
    }
    if (coreNodesRef.current) {
      coreNodesRef.current.rotation.y -= delta * 0.48;
      coreNodesRef.current.rotation.z += delta * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.35}>
        {/* Outer Translucent Frosted-Glass Cube/Prism */}
        <group ref={prismRef}>
          <RoundedBox args={[2.1, 2.1, 2.1]} radius={0.26} smoothness={5} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.86}
              opacity={1}
              transparent
              roughness={0.14}
              metalness={0.04}
              ior={1.46}
              thickness={1.4}
              clearcoat={1}
              clearcoatRoughness={0.12}
              attenuationColor="#E0E7FF"
              attenuationDistance={3.2}
            />
          </RoundedBox>

          {/* Subtle architectural metallic prism edges */}
          <mesh>
            <octahedronGeometry args={[1.65, 0]} />
            <meshStandardMaterial
              color="#4F46E5"
              wireframe
              transparent
              opacity={0.22}
            />
          </mesh>
        </group>

        {/* Glowing Inner Digital Potential Nodes */}
        <group ref={coreNodesRef}>
          {innerNodes.map((n, idx) => (
            <mesh key={idx} position={n.pos}>
              <sphereGeometry args={[n.r, 24, 24]} />
              <meshStandardMaterial
                color={n.color}
                emissive={n.color}
                emissiveIntensity={0.85}
                roughness={0.2}
                metalness={0.1}
              />
            </mesh>
          ))}

          {filaments.map((pts, idx) => (
            <Line
              key={idx}
              points={pts}
              color={idx % 2 === 0 ? '#6366F1' : '#FF7A59'}
              lineWidth={1.3}
              transparent
              opacity={0.55}
            />
          ))}
        </group>
      </Float>
    </group>
  );
}

/* =========================================================
   CHAPTER 2 (20%–40%): SOCIAL ORBIT
   Orbiting 3D rings, glossy hearts, play buttons & 3D megaphone
========================================================= */
function ChapterSocialOrbit({ progressRef }) {
  const groupRef = useRef();
  const orbitARef = useRef();
  const orbitBRef = useRef();
  const megaRef = useRef();
  const heartGeom = useHeartGeometry();
  const playGeom = usePlayGeometry();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const p = progressRef.current;
    const w = chapterWeight(p, 0.2, 0.42, 0.065);
    groupRef.current.visible = w > 0.005;

    const targetScale = THREE.MathUtils.lerp(0.15, 1.05, w);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 5, delta)
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      (p - 0.3) * 3.0,
      4,
      delta
    );

    if (orbitARef.current) {
      orbitARef.current.rotation.z += delta * 0.55;
      orbitARef.current.rotation.x = 0.65 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
    if (orbitBRef.current) {
      orbitBRef.current.rotation.z -= delta * 0.42;
      orbitBRef.current.rotation.y += delta * 0.28;
    }
    if (megaRef.current) {
      megaRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.35 - 0.35;
      megaRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.14;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sleek Centerpiece 3D Megaphone */}
      <group ref={megaRef} rotation={[0.1, -0.35, 0.18]} scale={1.15}>
        {/* Megaphone Cone */}
        <mesh position={[0.25, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.18, 0.62, 1.35, 36]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.14}
            metalness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Megaphone Front Rim (Coral-Orange) */}
        <mesh position={[0.92, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.62, 0.065, 20, 48]} />
          <meshPhysicalMaterial color="#FF5A36" roughness={0.18} clearcoat={0.9} />
        </mesh>
        {/* Megaphone Back Cap (Indigo) */}
        <mesh position={[-0.48, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.2, 0.28, 28]} />
          <meshPhysicalMaterial color="#4F46E5" roughness={0.2} clearcoat={0.8} />
        </mesh>
        {/* Ergonomic Handle */}
        <mesh position={[-0.18, -0.45, 0]} rotation={[0, 0, 0.22]} castShadow>
          <capsuleGeometry args={[0.1, 0.56, 12, 20]} />
          <meshPhysicalMaterial color="#4F46E5" roughness={0.22} clearcoat={0.85} />
        </mesh>
        {/* Sound Wave Rings */}
        <mesh position={[1.25, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.45, 0.028, 14, 36]} />
          <meshStandardMaterial color="#FF5A36" emissive="#FF5A36" emissiveIntensity={0.4} transparent opacity={0.75} />
        </mesh>
        <mesh position={[1.55, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.72, 0.022, 14, 36]} />
          <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.35} transparent opacity={0.55} />
        </mesh>
      </group>

      {/* Orbit Ring A with Glossy Hearts */}
      <group ref={orbitARef} rotation={[0.7, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.05, 0.032, 16, 80]} />
          <meshPhysicalMaterial color="#6366F1" roughness={0.2} metalness={0.3} clearcoat={1} />
        </mesh>

        {/* Glossy Coral Heart 1 */}
        <mesh geometry={heartGeom} position={[2.05, 0, 0]} scale={0.72} castShadow>
          <meshPhysicalMaterial
            color="#FF5A36"
            roughness={0.14}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* Glossy Coral Heart 2 */}
        <mesh geometry={heartGeom} position={[-2.05, 0, 0]} scale={0.56} rotation={[0, 0.5, 0]} castShadow>
          <meshPhysicalMaterial
            color="#FF7A59"
            roughness={0.16}
            clearcoat={1}
          />
        </mesh>
      </group>

      {/* Orbit Ring B with Glossy Play Buttons */}
      <group ref={orbitBRef} rotation={[-0.65, 0.5, 0.4]}>
        <mesh>
          <torusGeometry args={[2.55, 0.025, 16, 80]} />
          <meshPhysicalMaterial color="#FF5A36" roughness={0.25} transparent opacity={0.72} />
        </mesh>

        {/* Play Button Capsule 1 */}
        <group position={[0, 2.55, 0]}>
          <RoundedBox args={[0.78, 0.58, 0.2]} radius={0.14} smoothness={4} castShadow>
            <meshPhysicalMaterial color="#4F46E5" roughness={0.15} clearcoat={1} />
          </RoundedBox>
          <mesh geometry={playGeom} position={[0.04, 0, 0.12]} scale={0.55}>
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
        </group>

        {/* Play Button Capsule 2 */}
        <group position={[0, -2.55, 0]} rotation={[0, 0, 0.3]}>
          <RoundedBox args={[0.68, 0.52, 0.18]} radius={0.12} smoothness={4} castShadow>
            <meshPhysicalMaterial color="#FFFFFF" roughness={0.14} clearcoat={1} />
          </RoundedBox>
          <mesh geometry={playGeom} position={[0.03, 0, 0.11]} scale={0.48}>
            <meshStandardMaterial color="#FF5A36" roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* =========================================================
   CHAPTER 3 (40%–60%): PRECISION & ROI
   3D Bullseye Target + Rising Crystal Bar-Chart Pillars
========================================================= */
function ChapterPrecisionROI({ progressRef }) {
  const groupRef = useRef();
  const barRefs = useRef([]);
  const arrowRef = useRef();

  const bars = useMemo(
    () => [
      { x: -1.45, h: 1.05, color: '#C7D2FE' },
      { x: -0.95, h: 1.55, color: '#818CF8' },
      { x: -0.45, h: 2.15, color: '#4F46E5' },
      { x: 0.05, h: 2.75, color: '#FF5A36' },
    ],
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const p = progressRef.current;
    const w = chapterWeight(p, 0.4, 0.62, 0.065);
    groupRef.current.visible = w > 0.005;

    const targetScale = THREE.MathUtils.lerp(0.15, 1.04, w);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 5, delta)
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      -0.28 + Math.sin(state.clock.elapsedTime * 0.7) * 0.14,
      4,
      delta
    );

    // Animate rising bars dynamically with chapter scroll progress
    const localProgress = THREE.MathUtils.clamp((p - 0.36) / 0.22, 0, 1);
    barRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const targetYScale = Math.max(0.15, localProgress * (0.95 + idx * 0.06));
      mesh.scale.y = THREE.MathUtils.damp(mesh.scale.y, targetYScale, 5, delta);
      mesh.position.y = -1.25 + (bars[idx].h * mesh.scale.y) / 2;
    });

    if (arrowRef.current) {
      const dartSlide = THREE.MathUtils.lerp(0.9, 0, THREE.MathUtils.clamp(localProgress * 1.4, 0, 1));
      arrowRef.current.position.z = THREE.MathUtils.damp(arrowRef.current.position.z, 0.38 + dartSlide, 6, delta);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Frosted Base Platform for Bars */}
      <RoundedBox args={[2.5, 0.16, 1.1]} radius={0.06} position={[-0.7, -1.35, 0]} receiveShadow>
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.22} clearcoat={0.8} />
      </RoundedBox>

      {/* Rising Crystal Bar-Chart Pillars */}
      {bars.map((bar, idx) => (
        <RoundedBox
          key={idx}
          ref={(el) => (barRefs.current[idx] = el)}
          args={[0.36, bar.h, 0.36]}
          radius={0.08}
          smoothness={4}
          position={[bar.x, -1.25 + bar.h / 2, 0]}
          castShadow
        >
          <meshPhysicalMaterial
            color={bar.color}
            transmission={0.35}
            roughness={0.14}
            metalness={0.06}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.45}
            thickness={0.7}
          />
        </RoundedBox>
      ))}

      {/* 3D Bullseye Target */}
      <group position={[1.25, 0.32, 0.15]} rotation={[0.08, -0.35, 0]}>
        {/* Outer Alabaster Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[1.15, 1.15, 0.14, 48]} />
          <meshPhysicalMaterial color="#FFFFFF" roughness={0.18} clearcoat={1} />
        </mesh>
        {/* Indigo Ring */}
        <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.84, 0.84, 0.14, 48]} />
          <meshPhysicalMaterial color="#4F46E5" roughness={0.16} clearcoat={0.95} />
        </mesh>
        {/* White Inner Ring */}
        <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.14, 48]} />
          <meshPhysicalMaterial color="#F9FAFB" roughness={0.16} clearcoat={0.95} />
        </mesh>
        {/* Coral-Orange Bullseye Center */}
        <mesh position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.16, 36]} />
          <meshPhysicalMaterial
            color="#FF5A36"
            emissive="#FF5A36"
            emissiveIntensity={0.28}
            roughness={0.14}
            clearcoat={1}
          />
        </mesh>

        {/* Sleek 3D Arrow hitting the Bullseye */}
        <group ref={arrowRef} position={[0, 0, 0.38]}>
          {/* Shaft */}
          <mesh position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 1.15, 16]} />
            <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.25} />
          </mesh>
          {/* Tail Fletching */}
          <mesh position={[0, 0.12, 1.05]}>
            <boxGeometry args={[0.02, 0.22, 0.28]} />
            <meshPhysicalMaterial color="#FF5A36" roughness={0.2} clearcoat={0.9} />
          </mesh>
          <mesh position={[0.12, 0, 1.05]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.02, 0.22, 0.28]} />
            <meshPhysicalMaterial color="#4F46E5" roughness={0.2} clearcoat={0.9} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* =========================================================
   CHAPTER 4 (60%–80%): DIGITAL FLAGSHIP
   Exploded-view 3D floating browser window + 3D mobile UI frame
========================================================= */
function ChapterDigitalFlagship({ progressRef }) {
  const groupRef = useRef();
  const layer1Ref = useRef();
  const layer2Ref = useRef();
  const phoneRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const p = progressRef.current;
    const w = chapterWeight(p, 0.6, 0.82, 0.065);
    groupRef.current.visible = w > 0.005;

    const targetScale = THREE.MathUtils.lerp(0.15, 1.02, w);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 5, delta)
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      -0.25 + Math.sin(state.clock.elapsedTime * 0.7) * 0.12,
      4,
      delta
    );

    const explode = 0.28 + Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
    if (layer1Ref.current) layer1Ref.current.position.z = explode;
    if (layer2Ref.current) layer2Ref.current.position.z = explode * 2.1;
    if (phoneRef.current) {
      phoneRef.current.position.y = -0.25 + Math.sin(state.clock.elapsedTime * 1.4 + 1) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Frosted Glass Browser Window Chassis */}
      <group position={[-0.38, 0.1, 0]}>
        <RoundedBox args={[2.95, 1.95, 0.1]} radius={0.14} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.55}
            roughness={0.14}
            clearcoat={1}
            ior={1.45}
            thickness={0.4}
          />
        </RoundedBox>

        {/* Browser Header Strip */}
        <RoundedBox args={[2.86, 0.28, 0.04]} radius={0.06} position={[0, 0.78, 0.06]}>
          <meshStandardMaterial color="#F3F4F6" roughness={0.3} />
        </RoundedBox>
        {/* Window Traffic Lights */}
        <mesh position={[-1.22, 0.78, 0.1]}>
          <sphereGeometry args={[0.048, 16, 16]} />
          <meshStandardMaterial color="#FF5A36" />
        </mesh>
        <mesh position={[-1.06, 0.78, 0.1]}>
          <sphereGeometry args={[0.048, 16, 16]} />
          <meshStandardMaterial color="#FBBF24" />
        </mesh>
        <mesh position={[-0.9, 0.78, 0.1]}>
          <sphereGeometry args={[0.048, 16, 16]} />
          <meshStandardMaterial color="#4F46E5" />
        </mesh>

        {/* Exploded UI Layer 1: Hero & Metric Cards */}
        <group ref={layer1Ref} position={[0, 0, 0.3]}>
          <RoundedBox args={[1.5, 0.88, 0.07]} radius={0.08} position={[-0.55, 0.06, 0]} castShadow>
            <meshPhysicalMaterial color="#4F46E5" roughness={0.18} clearcoat={0.95} />
          </RoundedBox>
          <RoundedBox args={[0.98, 0.4, 0.07]} radius={0.07} position={[0.8, 0.3, 0]} castShadow>
            <meshPhysicalMaterial color="#EEF2FF" roughness={0.2} clearcoat={0.8} />
          </RoundedBox>
          <RoundedBox args={[0.98, 0.4, 0.07]} radius={0.07} position={[0.8, -0.18, 0]} castShadow>
            <meshPhysicalMaterial color="#FFFFFF" roughness={0.18} clearcoat={0.9} />
          </RoundedBox>
          {/* Bottom CTA Bar */}
          <RoundedBox args={[2.55, 0.28, 0.06]} radius={0.07} position={[0, -0.66, 0]}>
            <meshPhysicalMaterial color="#F3F4F6" roughness={0.22} />
          </RoundedBox>
        </group>

        {/* Exploded UI Layer 2: Floating Coral CTA Pill & Badge */}
        <group ref={layer2Ref} position={[0, 0, 0.6]}>
          <RoundedBox args={[0.76, 0.24, 0.07]} radius={0.11} position={[-0.82, -0.15, 0]} castShadow>
            <meshPhysicalMaterial color="#FF5A36" roughness={0.16} clearcoat={1} />
          </RoundedBox>
          <RoundedBox args={[0.52, 0.22, 0.06]} radius={0.08} position={[0.8, 0.32, 0]}>
            <meshPhysicalMaterial color="#6366F1" roughness={0.18} clearcoat={0.9} />
          </RoundedBox>
        </group>
      </group>

      {/* Floating 3D Mobile UI Frame */}
      <group ref={phoneRef} position={[1.45, -0.22, 0.55]} rotation={[0.05, -0.32, 0.06]}>
        <RoundedBox args={[0.96, 1.82, 0.12]} radius={0.16} smoothness={5} castShadow>
          <meshPhysicalMaterial color="#FFFFFF" roughness={0.12} clearcoat={1} metalness={0.08} />
        </RoundedBox>
        {/* Mobile Screen */}
        <RoundedBox args={[0.84, 1.66, 0.04]} radius={0.12} position={[0, 0, 0.055]}>
          <meshStandardMaterial color="#F9FAFB" roughness={0.25} />
        </RoundedBox>
        {/* Floating Mobile Cards */}
        <RoundedBox args={[0.68, 0.52, 0.06]} radius={0.08} position={[0, 0.36, 0.14]} castShadow>
          <meshPhysicalMaterial color="#FF5A36" roughness={0.16} clearcoat={1} />
        </RoundedBox>
        <RoundedBox args={[0.68, 0.34, 0.05]} radius={0.07} position={[0, -0.16, 0.12]}>
          <meshPhysicalMaterial color="#4F46E5" roughness={0.18} clearcoat={0.95} />
        </RoundedBox>
        <RoundedBox args={[0.68, 0.24, 0.05]} radius={0.06} position={[0, -0.54, 0.1]}>
          <meshPhysicalMaterial color="#E0E7FF" roughness={0.2} />
        </RoundedBox>
      </group>
    </group>
  );
}

/* =========================================================
   CHAPTER 5 (80%–100%): AI GROWTH CORE
   Glowing interconnected 3D Neural Sphere with pulsing data lines
========================================================= */
function ChapterAIGrowthCore({ progressRef }) {
  const groupRef = useRef();
  const sphereNodesRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  // Fibonacci sphere nodes for crisp neural topology
  const { nodes, edges } = useMemo(() => {
    const count = 28;
    const radius = 1.48;
    const pts = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      pts.push(
        new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius)
      );
    }

    const edgeList = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.25) {
          edgeList.push([
            [pts[i].x, pts[i].y, pts[i].z],
            [pts[j].x, pts[j].y, pts[j].z],
          ]);
        }
      }
    }
    return { nodes: pts, edges: edgeList };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const p = progressRef.current;
    const w = chapterWeight(p, 0.8, 1.0, 0.065);
    groupRef.current.visible = w > 0.005;

    const targetScale = THREE.MathUtils.lerp(0.15, 1.08, w);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 5, delta)
    );

    if (sphereNodesRef.current) {
      sphereNodesRef.current.rotation.y += delta * 0.28;
      sphereNodesRef.current.rotation.x += delta * 0.1;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.45;
      ring1Ref.current.rotation.x = 1.1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.35;
      ring2Ref.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Luminous Frosted AI Core */}
      <mesh castShadow>
        <icosahedronGeometry args={[0.68, 3]} />
        <meshPhysicalMaterial
          color="#4F46E5"
          emissive="#4F46E5"
          emissiveIntensity={0.4}
          roughness={0.14}
          metalness={0.12}
          clearcoat={1}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.92, 32, 32]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.78}
          transparent
          roughness={0.14}
          ior={1.42}
          thickness={0.8}
        />
      </mesh>

      {/* Neural Lattice Nodes & Data Synapses */}
      <group ref={sphereNodesRef}>
        {nodes.map((pt, idx) => {
          const isCoral = idx % 4 === 0;
          return (
            <mesh key={idx} position={[pt.x, pt.y, pt.z]}>
              <sphereGeometry args={[isCoral ? 0.095 : 0.072, 16, 16]} />
              <meshStandardMaterial
                color={isCoral ? '#FF5A36' : '#4F46E5'}
                emissive={isCoral ? '#FF5A36' : '#6366F1'}
                emissiveIntensity={0.7}
                roughness={0.2}
              />
            </mesh>
          );
        })}

        {edges.map((seg, idx) => (
          <Line
            key={idx}
            points={seg}
            color={idx % 5 === 0 ? '#FF5A36' : '#6366F1'}
            lineWidth={1.1}
            transparent
            opacity={0.42}
          />
        ))}
      </group>

      {/* Pulsing Data Orbital Halos */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.05, 0.022, 16, 90]} />
          <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.35} transparent opacity={0.65} />
        </mesh>
      </group>
      <group ref={ring2Ref} rotation={[0.5, 0.8, 0.4]}>
        <mesh>
          <torusGeometry args={[2.35, 0.018, 16, 90]} />
          <meshStandardMaterial color="#FF5A36" emissive="#FF5A36" emissiveIntensity={0.35} transparent opacity={0.55} />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================
   AMBIENT FLOATING LUXURY GEOMETRY PARTICLES
========================================================= */
function AmbientAtelierParticles() {
  const groupRef = useRef();
  const particles = useMemo(
    () => [
      { pos: [-4.2, 2.3, -2.5], s: 0.16, color: '#C7D2FE' },
      { pos: [4.4, 2.1, -3.2], s: 0.2, color: '#FFD6CC' },
      { pos: [-3.8, -2.0, -2.0], s: 0.14, color: '#E0E7FF' },
      { pos: [3.9, -1.9, -2.4], s: 0.18, color: '#C7D2FE' },
      { pos: [0.4, 3.1, -3.6], s: 0.15, color: '#FF7A59' },
      { pos: [-2.1, 2.9, -4.0], s: 0.12, color: '#6366F1' },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {particles.map((pt, i) => (
        <mesh key={i} position={pt.pos}>
          <octahedronGeometry args={[pt.s, 0]} />
          <meshPhysicalMaterial color={pt.color} roughness={0.2} clearcoat={1} />
        </mesh>
      ))}
    </group>
  );
}

/* =========================================================
   SCENE STAGE RIG (pointer parallax + chapter horizontal choreography)
========================================================= */
function ScrollytellingStage({ progressRef }) {
  const stageRef = useRef();

  useFrame((state, delta) => {
    if (!stageRef.current) return;
    const p = progressRef.current;

    // Choreograph subtle horizontal sway across the 5 chapters so content & 3D breathe together
    const swayX = Math.sin(p * Math.PI * 4) * 0.85 + 0.55;
    const pointerX = state.pointer.x * 0.35;
    const pointerY = state.pointer.y * 0.25;

    stageRef.current.position.x = THREE.MathUtils.damp(stageRef.current.position.x, swayX + pointerX, 3.5, delta);
    stageRef.current.position.y = THREE.MathUtils.damp(stageRef.current.position.y, pointerY + 0.1, 3.5, delta);
    stageRef.current.rotation.x = THREE.MathUtils.damp(stageRef.current.rotation.x, -state.pointer.y * 0.12, 4, delta);
    stageRef.current.rotation.y = THREE.MathUtils.damp(stageRef.current.rotation.y, state.pointer.x * 0.16, 4, delta);
  });

  return (
    <>
      <StudioLighting showFloorShadow shadowY={-2.55} />
      <AmbientAtelierParticles />
      <group ref={stageRef}>
        <ChapterSpark progressRef={progressRef} />
        <ChapterSocialOrbit progressRef={progressRef} />
        <ChapterPrecisionROI progressRef={progressRef} />
        <ChapterDigitalFlagship progressRef={progressRef} />
        <ChapterAIGrowthCore progressRef={progressRef} />
      </group>
    </>
  );
}

export default function HomeScrollytellingCanvas({ progressRef }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-screen w-full overflow-hidden bg-gradient-to-b from-[#F9FAFB] via-[#F5F7FB] to-[#F3F4F6]"
      aria-hidden="true"
    >
      {/* Soft Pastel Studio Glows behind Canvas */}
      <div
        className="absolute -left-24 top-16 h-[420px] w-[420px] rounded-full opacity-55 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(79,70,229,0.13) 0%, transparent 72%)',
        }}
      />
      <div
        className="absolute -right-20 bottom-16 h-[440px] w-[440px] rounded-full opacity-50 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,90,54,0.12) 0%, transparent 72%)',
        }}
      />

      <WebGLErrorBoundary>
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.25, 7.6], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <ScrollytellingStage progressRef={progressRef} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
