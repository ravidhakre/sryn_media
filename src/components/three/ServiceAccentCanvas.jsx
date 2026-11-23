import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import StudioLighting from './StudioLighting';
import WebGLErrorBoundary from './WebGLErrorBoundary';

/* =========================================================
   1. SOCIAL MEDIA PAGE: 3D PHONE MOCKUP (Instagram Grid & Reels)
========================================================= */
function SocialPhoneSculpture() {
  const phoneRef = useRef();
  const orbitRef = useRef();

  const heartGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.2);
    shape.bezierCurveTo(0, 0.2, -0.04, 0.4, -0.2, 0.4);
    shape.bezierCurveTo(-0.44, 0.4, -0.44, 0.12, -0.44, 0.12);
    shape.bezierCurveTo(-0.44, -0.08, -0.28, -0.26, 0, -0.42);
    shape.bezierCurveTo(0.28, -0.26, 0.44, -0.08, 0.44, 0.12);
    shape.bezierCurveTo(0.44, 0.12, 0.44, 0.4, 0.2, 0.4);
    shape.bezierCurveTo(0.06, 0.4, 0, 0.2, 0, 0.2);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    geom.center();
    return geom;
  }, []);

  const gridTiles = useMemo(
    () => [
      { pos: [-0.46, 0.46, 0.11], color: '#4F46E5' },
      { pos: [0, 0.46, 0.11], color: '#FF5A36' },
      { pos: [0.46, 0.46, 0.11], color: '#818CF8' },
      { pos: [-0.46, 0.0, 0.11], color: '#FF7A59' },
      { pos: [0, 0.0, 0.11], color: '#EEF2FF' },
      { pos: [0.46, 0.0, 0.11], color: '#4F46E5' },
      { pos: [-0.46, -0.46, 0.11], color: '#C7D2FE' },
      { pos: [0, -0.46, 0.11], color: '#4F46E5' },
      { pos: [0.46, -0.46, 0.11], color: '#FF5A36' },
    ],
    []
  );

  useFrame((state, delta) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.28 - 0.12;
      phoneRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.6) * 0.08;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={phoneRef}>
        {/* Sleek Ceramic White Smartphone Body */}
        <RoundedBox args={[1.82, 3.45, 0.18]} radius={0.26} smoothness={5} castShadow>
          <meshPhysicalMaterial color="#FFFFFF" roughness={0.12} metalness={0.08} clearcoat={1} />
        </RoundedBox>
        {/* Inner Display Screen */}
        <RoundedBox args={[1.64, 3.22, 0.05]} radius={0.2} position={[0, 0, 0.075]}>
          <meshStandardMaterial color="#F9FAFB" roughness={0.25} />
        </RoundedBox>

        {/* Profile Header Bar */}
        <mesh position={[-0.5, 1.18, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.05, 28]} />
          <meshPhysicalMaterial color="#4F46E5" roughness={0.2} clearcoat={0.9} />
        </mesh>
        <RoundedBox args={[0.88, 0.14, 0.04]} radius={0.06} position={[0.25, 1.26, 0.12]}>
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </RoundedBox>
        <RoundedBox args={[0.64, 0.1, 0.04]} radius={0.04} position={[0.13, 1.07, 0.12]}>
          <meshStandardMaterial color="#9CA3AF" roughness={0.4} />
        </RoundedBox>

        {/* Story Highlight Bubbles */}
        {[-0.54, -0.18, 0.18, 0.54].map((x, idx) => (
          <mesh key={idx} position={[x, 0.82, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.11, 0.025, 12, 24]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#FF5A36' : '#4F46E5'} />
          </mesh>
        ))}

        {/* 3x3 Instagram Visual Grid */}
        {gridTiles.map((t, idx) => (
          <RoundedBox key={idx} args={[0.41, 0.41, 0.05]} radius={0.06} position={t.pos} castShadow>
            <meshPhysicalMaterial color={t.color} roughness={0.18} clearcoat={0.9} />
          </RoundedBox>
        ))}

        {/* Bottom Floating Viral Reels Bar */}
        <RoundedBox args={[1.38, 0.34, 0.08]} radius={0.12} position={[0, -1.16, 0.16]} castShadow>
          <meshPhysicalMaterial color="#111827" roughness={0.25} clearcoat={0.8} />
        </RoundedBox>
        <RoundedBox args={[0.52, 0.12, 0.04]} radius={0.05} position={[-0.3, -1.16, 0.21]}>
          <meshStandardMaterial color="#FF5A36" emissive="#FF5A36" emissiveIntensity={0.4} />
        </RoundedBox>

        {/* Floating Glossy Hearts & Viral Rings around Phone */}
        <group ref={orbitRef} rotation={[0.55, 0.2, 0]}>
          <mesh>
            <torusGeometry args={[1.85, 0.024, 16, 72]} />
            <meshStandardMaterial color="#4F46E5" transparent opacity={0.55} />
          </mesh>
          <mesh geometry={heartGeom} position={[1.85, 0, 0]} scale={0.78} castShadow>
            <meshPhysicalMaterial color="#FF5A36" roughness={0.14} clearcoat={1} />
          </mesh>
          <mesh geometry={heartGeom} position={[-1.85, 0.1, 0]} scale={0.55} castShadow>
            <meshPhysicalMaterial color="#4F46E5" roughness={0.14} clearcoat={1} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export function SocialPhone3DCanvas({ className = 'h-[420px] w-full' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <WebGLErrorBoundary>
        <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 0.15, 6.2], fov: 38 }}>
          <Suspense fallback={null}>
            <StudioLighting shadowY={-2.2} />
            <SocialPhoneSculpture />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.6} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}

/* =========================================================
   2. WEB DEV PAGE: 3D DESKTOP + MOBILE DEVICE SHOWCASE
========================================================= */
function WebDevDevicesSculpture() {
  const rootRef = useRef();
  const cardLayerRef = useRef();

  useFrame((state) => {
    if (rootRef.current) {
      rootRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.22 - 0.18;
    }
    if (cardLayerRef.current) {
      cardLayerRef.current.position.z = 0.28 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.3}>
      <group ref={rootRef}>
        {/* Desktop 3D Glass Browser */}
        <group position={[-0.45, 0.12, 0]}>
          <RoundedBox args={[3.3, 2.2, 0.12]} radius={0.15} smoothness={4} castShadow>
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.45}
              roughness={0.14}
              clearcoat={1}
              thickness={0.4}
            />
          </RoundedBox>
          <RoundedBox args={[3.15, 0.26, 0.04]} radius={0.05} position={[0, 0.9, 0.07]}>
            <meshStandardMaterial color="#EEF2FF" />
          </RoundedBox>
          {/* Floating Exploded Web UI Components */}
          <group ref={cardLayerRef} position={[0, 0, 0.28]}>
            <RoundedBox args={[1.7, 1.0, 0.08]} radius={0.09} position={[-0.62, 0.1, 0]} castShadow>
              <meshPhysicalMaterial color="#4F46E5" roughness={0.18} clearcoat={1} />
            </RoundedBox>
            <RoundedBox args={[1.05, 0.45, 0.08]} radius={0.08} position={[0.92, 0.36, 0]} castShadow>
              <meshPhysicalMaterial color="#FFFFFF" roughness={0.16} clearcoat={1} />
            </RoundedBox>
            <RoundedBox args={[1.05, 0.45, 0.08]} radius={0.08} position={[0.92, -0.18, 0]} castShadow>
              <meshPhysicalMaterial color="#FF5A36" roughness={0.16} clearcoat={1} />
            </RoundedBox>
            <RoundedBox args={[2.8, 0.3, 0.06]} radius={0.07} position={[0, -0.72, 0]}>
              <meshStandardMaterial color="#F3F4F6" />
            </RoundedBox>
          </group>
        </group>

        {/* Mobile Companion Device */}
        <group position={[1.55, -0.32, 0.6]} rotation={[0.04, -0.3, 0.05]}>
          <RoundedBox args={[1.05, 2.02, 0.14]} radius={0.18} smoothness={5} castShadow>
            <meshPhysicalMaterial color="#FFFFFF" roughness={0.12} clearcoat={1} />
          </RoundedBox>
          <RoundedBox args={[0.92, 1.84, 0.04]} radius={0.12} position={[0, 0, 0.065]}>
            <meshStandardMaterial color="#F9FAFB" />
          </RoundedBox>
          <RoundedBox args={[0.74, 0.56, 0.06]} radius={0.08} position={[0, 0.42, 0.14]} castShadow>
            <meshPhysicalMaterial color="#FF5A36" roughness={0.16} clearcoat={1} />
          </RoundedBox>
          <RoundedBox args={[0.74, 0.38, 0.05]} radius={0.07} position={[0, -0.15, 0.12]}>
            <meshPhysicalMaterial color="#4F46E5" roughness={0.18} clearcoat={0.95} />
          </RoundedBox>
          <RoundedBox args={[0.74, 0.26, 0.05]} radius={0.06} position={[0, -0.58, 0.1]}>
            <meshStandardMaterial color="#E0E7FF" />
          </RoundedBox>
        </group>
      </group>
    </Float>
  );
}

export function DeviceShowcase3DCanvas({ className = 'h-[400px] w-full' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <WebGLErrorBoundary>
        <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 0.25, 6.4], fov: 40 }}>
          <Suspense fallback={null}>
            <StudioLighting shadowY={-1.95} />
            <WebDevDevicesSculpture />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.75} minPolarAngle={Math.PI / 2.6} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}

/* =========================================================
   3. REUSABLE HERO 3D ACCENT SCULPTURE (Ads / SEO / AI / About)
========================================================= */
function AccentSculpture({ variant = 'neural' }) {
  const ref = useRef();

  const neuralData = useMemo(() => {
    const pts = [];
    const count = 18;
    const r = 1.25;
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const t = ga * i;
      pts.push([Math.cos(t) * rad * r, y * r, Math.sin(t) * rad * r]);
    }
    const edges = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i][0] - pts[j][0];
        const dy = pts[i][1] - pts[j][1];
        const dz = pts[i][2] - pts[j][2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 1.35) {
          edges.push([pts[i], pts[j]]);
        }
      }
    }
    return { pts, edges };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.32;
    ref.current.rotation.x += delta * 0.08;
  });

  if (variant === 'bars') {
    return (
      <Float speed={1.8} floatIntensity={0.35}>
        <group ref={ref} rotation={[0.1, -0.35, 0]}>
          {[
            { x: -0.9, h: 0.9, c: '#C7D2FE' },
            { x: -0.3, h: 1.45, c: '#818CF8' },
            { x: 0.3, h: 2.0, c: '#4F46E5' },
            { x: 0.9, h: 2.55, c: '#FF5A36' },
          ].map((b, idx) => (
            <RoundedBox
              key={idx}
              args={[0.42, b.h, 0.42]}
              radius={0.09}
              position={[b.x, -1.1 + b.h / 2, 0]}
              castShadow
            >
              <meshPhysicalMaterial color={b.c} roughness={0.14} clearcoat={1} transmission={0.25} thickness={0.6} />
            </RoundedBox>
          ))}
        </group>
      </Float>
    );
  }

  if (variant === 'prism') {
    return (
      <Float speed={1.8} floatIntensity={0.35}>
        <group ref={ref}>
          <RoundedBox args={[1.85, 1.85, 1.85]} radius={0.26} smoothness={5} castShadow>
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.82}
              roughness={0.14}
              ior={1.45}
              thickness={1.2}
              clearcoat={1}
            />
          </RoundedBox>
          <mesh>
            <octahedronGeometry args={[0.75, 0]} />
            <meshPhysicalMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.35} roughness={0.16} clearcoat={1} />
          </mesh>
          <mesh position={[0.45, 0.45, 0.45]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial color="#FF5A36" emissive="#FF5A36" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </Float>
    );
  }

  return (
    <Float speed={1.8} floatIntensity={0.35}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[0.55, 2]} />
          <meshPhysicalMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.35} roughness={0.16} clearcoat={1} />
        </mesh>
        {neuralData.pts.map((p, idx) => (
          <mesh key={idx} position={p}>
            <sphereGeometry args={[idx % 3 === 0 ? 0.09 : 0.065, 14, 14]} />
            <meshStandardMaterial
              color={idx % 3 === 0 ? '#FF5A36' : '#4F46E5'}
              emissive={idx % 3 === 0 ? '#FF5A36' : '#6366F1'}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
        {neuralData.edges.map((seg, idx) => (
          <Line key={idx} points={seg} color={idx % 4 === 0 ? '#FF5A36' : '#6366F1'} lineWidth={1.1} transparent opacity={0.45} />
        ))}
      </group>
    </Float>
  );
}

export function HeroAccent3DCanvas({ variant = 'neural', className = 'h-[320px] w-full' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <WebGLErrorBoundary>
        <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 0.1, 5.2], fov: 40 }}>
          <Suspense fallback={null}>
            <StudioLighting shadowY={-1.85} />
            <AccentSculpture variant={variant} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
