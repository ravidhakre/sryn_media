import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import StudioLighting from './StudioLighting';
import WebGLErrorBoundary from './WebGLErrorBoundary';

/* =========================================================
   THEMED FULL-PAGE 3D SCROLLYTELLING SCULPTURES
   Each dedicated page gets its own scroll-driven 3D centerpiece
========================================================= */

function SocialScrollBackdrop({ progressRef }) {
  const rootRef = useRef();
  const ringARef = useRef();
  const ringBRef = useRef();

  const heartGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.22);
    shape.bezierCurveTo(0, 0.22, -0.05, 0.45, -0.22, 0.45);
    shape.bezierCurveTo(-0.5, 0.45, -0.5, 0.14, -0.5, 0.14);
    shape.bezierCurveTo(-0.5, -0.09, -0.32, -0.3, 0, -0.48);
    shape.bezierCurveTo(0.32, -0.3, 0.5, -0.09, 0.5, 0.14);
    shape.bezierCurveTo(0.5, 0.14, 0.5, 0.45, 0.22, 0.45);
    shape.bezierCurveTo(0.07, 0.45, 0, 0.22, 0, 0.22);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    geom.center();
    return geom;
  }, []);

  useFrame((state, delta) => {
    const p = progressRef.current;
    if (rootRef.current) {
      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        p * Math.PI * 2 + state.pointer.x * 0.25,
        4,
        delta
      );
      rootRef.current.position.x = THREE.MathUtils.damp(
        rootRef.current.position.x,
        Math.cos(p * Math.PI * 2) * 1.35 + 0.6,
        3.5,
        delta
      );
      rootRef.current.position.y = THREE.MathUtils.damp(
        rootRef.current.position.y,
        Math.sin(state.clock.elapsedTime * 0.9) * 0.16 - p * 0.4 + 0.2,
        3.5,
        delta
      );
    }
    if (ringARef.current) ringARef.current.rotation.z += delta * 0.45;
    if (ringBRef.current) ringBRef.current.rotation.z -= delta * 0.35;
  });

  return (
    <group ref={rootRef} scale={0.95}>
      <group ref={ringARef} rotation={[0.6, 0.3, 0]}>
        <mesh>
          <torusGeometry args={[2.15, 0.028, 16, 80]} />
          <meshPhysicalMaterial color="#4F46E5" roughness={0.18} clearcoat={1} transparent opacity={0.65} />
        </mesh>
        <mesh geometry={heartGeom} position={[2.15, 0, 0]} scale={0.65}>
          <meshPhysicalMaterial color="#FF5A36" roughness={0.14} clearcoat={1} />
        </mesh>
        <mesh geometry={heartGeom} position={[-2.15, 0, 0]} scale={0.5}>
          <meshPhysicalMaterial color="#4F46E5" roughness={0.14} clearcoat={1} />
        </mesh>
      </group>
      <group ref={ringBRef} rotation={[-0.7, 0.5, 0.2]}>
        <mesh>
          <torusGeometry args={[2.65, 0.022, 16, 80]} />
          <meshPhysicalMaterial color="#FF5A36" roughness={0.2} transparent opacity={0.5} />
        </mesh>
        <RoundedBox args={[0.72, 0.54, 0.18]} radius={0.12} position={[0, 2.65, 0]}>
          <meshPhysicalMaterial color="#4F46E5" roughness={0.16} clearcoat={1} />
        </RoundedBox>
        <RoundedBox args={[0.65, 0.65, 0.18]} radius={0.16} position={[0, -2.65, 0]}>
          <meshPhysicalMaterial color="#FFFFFF" roughness={0.14} clearcoat={1} />
        </RoundedBox>
      </group>
    </group>
  );
}

function AdsScrollBackdrop({ progressRef }) {
  const rootRef = useRef();
  const barRefs = useRef([]);
  const targetRef = useRef();

  const bars = useMemo(
    () => [
      { x: -1.45, baseH: 0.95, color: '#C7D2FE' },
      { x: -0.92, baseH: 1.5, color: '#818CF8' },
      { x: -0.38, baseH: 2.05, color: '#4F46E5' },
      { x: 0.16, baseH: 2.65, color: '#FF5A36' },
    ],
    []
  );

  useFrame((state, delta) => {
    const p = progressRef.current;
    if (rootRef.current) {
      rootRef.current.position.x = THREE.MathUtils.damp(
        rootRef.current.position.x,
        Math.sin(p * Math.PI * 2.5) * 1.2 + 0.85,
        3.5,
        delta
      );
      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        -0.3 + p * 0.9 + state.pointer.x * 0.2,
        4,
        delta
      );
    }
    barRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const growth = 0.55 + Math.sin(p * Math.PI + idx * 0.4) * 0.35 + p * 0.35;
      mesh.scale.y = THREE.MathUtils.damp(mesh.scale.y, growth, 4, delta);
      mesh.position.y = -1.25 + (bars[idx].baseH * mesh.scale.y) / 2;
    });
    if (targetRef.current) {
      targetRef.current.rotation.z = p * Math.PI * 1.2;
    }
  });

  return (
    <group ref={rootRef} scale={0.92}>
      {bars.map((b, idx) => (
        <RoundedBox
          key={idx}
          ref={(el) => (barRefs.current[idx] = el)}
          args={[0.36, b.baseH, 0.36]}
          radius={0.08}
          position={[b.x, -1.25 + b.baseH / 2, 0]}
        >
          <meshPhysicalMaterial
            color={b.color}
            transmission={0.35}
            roughness={0.14}
            clearcoat={1}
            thickness={0.7}
          />
        </RoundedBox>
      ))}
      <group ref={targetRef} position={[1.45, 0.35, 0.2]} rotation={[0.1, -0.3, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.12, 48]} />
          <meshPhysicalMaterial color="#FFFFFF" roughness={0.16} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.12, 48]} />
          <meshPhysicalMaterial color="#4F46E5" roughness={0.16} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.14, 36]} />
          <meshPhysicalMaterial color="#FF5A36" roughness={0.14} clearcoat={1} />
        </mesh>
      </group>
    </group>
  );
}

function SeoScrollBackdrop({ progressRef }) {
  const rootRef = useRef();
  const lensRef = useRef();

  useFrame((state, delta) => {
    const p = progressRef.current;
    if (rootRef.current) {
      rootRef.current.position.x = THREE.MathUtils.damp(
        rootRef.current.position.x,
        Math.cos(p * Math.PI * 2) * 1.15 + 0.7,
        3.5,
        delta
      );
      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        p * Math.PI * 1.4 + state.pointer.x * 0.25,
        4,
        delta
      );
    }
    if (lensRef.current) {
      lensRef.current.position.y = 0.45 + Math.sin(state.clock.elapsedTime * 1.2) * 0.18;
      lensRef.current.rotation.z = -0.35 + Math.sin(p * Math.PI * 2) * 0.25;
    }
  });

  return (
    <group ref={rootRef} scale={0.95}>
      {/* Rising Crystal SEO Steps */}
      {[
        { x: -1.2, h: 1.0, c: '#E0E7FF' },
        { x: -0.45, h: 1.65, c: '#818CF8' },
        { x: 0.3, h: 2.3, c: '#4F46E5' },
        { x: 1.05, h: 3.0, c: '#FF5A36' },
      ].map((pillar, i) => (
        <RoundedBox
          key={i}
          args={[0.48, pillar.h, 0.48]}
          radius={0.1}
          position={[pillar.x, -1.55 + pillar.h / 2, -0.3]}
        >
          <meshPhysicalMaterial
            color={pillar.c}
            transmission={0.38}
            roughness={0.14}
            clearcoat={1}
            thickness={0.75}
          />
        </RoundedBox>
      ))}

      {/* Floating 3D Magnifying Search Lens */}
      <group ref={lensRef} position={[-0.35, 0.5, 0.85]}>
        <mesh>
          <torusGeometry args={[0.78, 0.1, 24, 56]} />
          <meshPhysicalMaterial color="#4F46E5" roughness={0.15} clearcoat={1} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.72, 0.72, 0.08, 40]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.88}
            roughness={0.08}
            ior={1.48}
            thickness={0.5}
          />
        </mesh>
        <mesh position={[0.78, -0.78, 0]} rotation={[0, 0, Math.PI / 4]}>
          <capsuleGeometry args={[0.095, 0.72, 12, 20]} />
          <meshPhysicalMaterial color="#FF5A36" roughness={0.18} clearcoat={1} />
        </mesh>
      </group>
    </group>
  );
}

function WebDevScrollBackdrop({ progressRef }) {
  const rootRef = useRef();
  const layerA = useRef();
  const layerB = useRef();

  useFrame((state, delta) => {
    const p = progressRef.current;
    if (rootRef.current) {
      rootRef.current.position.x = THREE.MathUtils.damp(
        rootRef.current.position.x,
        Math.sin(p * Math.PI * 2) * 1.25 + 0.65,
        3.5,
        delta
      );
      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        -0.25 + p * 1.2 + state.pointer.x * 0.22,
        4,
        delta
      );
    }
    const explode = 0.25 + p * 0.55;
    if (layerA.current) layerA.current.position.z = explode;
    if (layerB.current) layerB.current.position.z = explode * 2.0;
  });

  return (
    <group ref={rootRef} scale={0.92}>
      <RoundedBox args={[3.1, 2.0, 0.1]} radius={0.14} smoothness={4}>
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.55}
          roughness={0.14}
          clearcoat={1}
          thickness={0.4}
        />
      </RoundedBox>
      <group ref={layerA}>
        <RoundedBox args={[1.55, 0.9, 0.07]} radius={0.08} position={[-0.58, 0.1, 0]}>
          <meshPhysicalMaterial color="#4F46E5" roughness={0.18} clearcoat={1} />
        </RoundedBox>
        <RoundedBox args={[1.0, 0.42, 0.07]} radius={0.07} position={[0.85, 0.34, 0]}>
          <meshPhysicalMaterial color="#EEF2FF" roughness={0.2} clearcoat={0.8} />
        </RoundedBox>
        <RoundedBox args={[1.0, 0.42, 0.07]} radius={0.07} position={[0.85, -0.18, 0]}>
          <meshPhysicalMaterial color="#FF5A36" roughness={0.16} clearcoat={1} />
        </RoundedBox>
      </group>
      <group ref={layerB}>
        <RoundedBox args={[0.85, 1.55, 0.1]} radius={0.15} position={[1.6, -0.35, 0]}>
          <meshPhysicalMaterial color="#FFFFFF" roughness={0.12} clearcoat={1} />
        </RoundedBox>
      </group>
    </group>
  );
}

function AiNeuralScrollBackdrop({ progressRef }) {
  const rootRef = useRef();
  const latticeRef = useRef();

  const { pts, edges } = useMemo(() => {
    const count = 24;
    const radius = 1.55;
    const list = [];
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = ga * i;
      list.push(new THREE.Vector3(Math.cos(t) * r * radius, y * radius, Math.sin(t) * r * radius));
    }
    const segs = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (list[i].distanceTo(list[j]) < 1.35) {
          segs.push([
            [list[i].x, list[i].y, list[i].z],
            [list[j].x, list[j].y, list[j].z],
          ]);
        }
      }
    }
    return { pts: list, edges: segs };
  }, []);

  useFrame((state, delta) => {
    const p = progressRef.current;
    if (rootRef.current) {
      rootRef.current.position.x = THREE.MathUtils.damp(
        rootRef.current.position.x,
        Math.cos(p * Math.PI * 2) * 1.2 + 0.75,
        3.5,
        delta
      );
      rootRef.current.scale.setScalar(
        THREE.MathUtils.damp(rootRef.current.scale.x, 0.92 + Math.sin(p * Math.PI) * 0.16, 4, delta)
      );
    }
    if (latticeRef.current) {
      latticeRef.current.rotation.y += delta * 0.25;
      latticeRef.current.rotation.x = p * Math.PI * 0.8 + state.pointer.y * 0.2;
    }
  });

  return (
    <group ref={rootRef}>
      <mesh>
        <icosahedronGeometry args={[0.62, 2]} />
        <meshPhysicalMaterial
          color="#4F46E5"
          emissive="#4F46E5"
          emissiveIntensity={0.35}
          roughness={0.14}
          clearcoat={1}
        />
      </mesh>
      <group ref={latticeRef}>
        {pts.map((pt, idx) => (
          <mesh key={idx} position={[pt.x, pt.y, pt.z]}>
            <sphereGeometry args={[idx % 4 === 0 ? 0.09 : 0.068, 14, 14]} />
            <meshStandardMaterial
              color={idx % 4 === 0 ? '#FF5A36' : '#4F46E5'}
              emissive={idx % 4 === 0 ? '#FF5A36' : '#6366F1'}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
        {edges.map((seg, idx) => (
          <Line
            key={idx}
            points={seg}
            color={idx % 5 === 0 ? '#FF5A36' : '#6366F1'}
            lineWidth={1.1}
            transparent
            opacity={0.38}
          />
        ))}
      </group>
      <mesh rotation={[1.1, 0.3, 0]}>
        <torusGeometry args={[2.15, 0.02, 16, 80]} />
        <meshStandardMaterial color="#4F46E5" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function PrismGlobalScrollBackdrop({ progressRef }) {
  const rootRef = useRef();
  const prismRef = useRef();
  const haloRef = useRef();

  useFrame((state, delta) => {
    const p = progressRef.current;
    if (rootRef.current) {
      rootRef.current.position.x = THREE.MathUtils.damp(
        rootRef.current.position.x,
        Math.sin(p * Math.PI * 2) * 1.2 + 0.75,
        3.5,
        delta
      );
    }
    if (prismRef.current) {
      prismRef.current.rotation.y += delta * 0.28;
      prismRef.current.rotation.x = p * Math.PI + state.pointer.y * 0.2;
    }
    if (haloRef.current) {
      haloRef.current.rotation.z -= delta * 0.35;
    }
  });

  return (
    <group ref={rootRef}>
      <Float speed={1.5} floatIntensity={0.3}>
        <group ref={prismRef}>
          <RoundedBox args={[2.0, 2.0, 2.0]} radius={0.28} smoothness={5}>
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.85}
              transparent
              roughness={0.14}
              ior={1.45}
              thickness={1.2}
              clearcoat={1}
            />
          </RoundedBox>
          <mesh>
            <octahedronGeometry args={[0.82, 0]} />
            <meshPhysicalMaterial color="#4F46E5" roughness={0.18} clearcoat={1} />
          </mesh>
        </group>
        <group ref={haloRef} rotation={[0.85, 0.35, 0]}>
          <mesh>
            <torusGeometry args={[2.15, 0.025, 16, 80]} />
            <meshStandardMaterial color="#FF5A36" transparent opacity={0.55} />
          </mesh>
          <mesh position={[2.15, 0, 0]}>
            <sphereGeometry args={[0.14, 18, 18]} />
            <meshStandardMaterial color="#FF5A36" emissive="#FF5A36" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[-2.15, 0, 0]}>
            <sphereGeometry args={[0.12, 18, 18]} />
            <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function PageBackdropStage({ theme, progressRef }) {
  return (
    <>
      <StudioLighting showFloorShadow shadowY={-2.65} />
      {theme === 'social' && <SocialScrollBackdrop progressRef={progressRef} />}
      {theme === 'ads' && <AdsScrollBackdrop progressRef={progressRef} />}
      {theme === 'seo' && <SeoScrollBackdrop progressRef={progressRef} />}
      {theme === 'webdev' && <WebDevScrollBackdrop progressRef={progressRef} />}
      {theme === 'ai' && <AiNeuralScrollBackdrop progressRef={progressRef} />}
      {(theme === 'about' || theme === 'contact') && (
        <PrismGlobalScrollBackdrop progressRef={progressRef} />
      )}
    </>
  );
}

export default function PageScrollytellingCanvas({ theme = 'about', progressRef }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-screen w-full overflow-hidden bg-gradient-to-b from-[#F9FAFB] via-[#F5F7FB] to-[#F3F4F6]"
      aria-hidden="true"
    >
      <div
        className="absolute -left-24 top-20 h-[400px] w-[400px] rounded-full opacity-50 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 72%)',
        }}
      />
      <div
        className="absolute -right-20 bottom-12 h-[420px] w-[420px] rounded-full opacity-45 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,90,54,0.11) 0%, transparent 72%)',
        }}
      />

      <WebGLErrorBoundary>
        <Canvas
          shadows
          dpr={[1, 1.6]}
          camera={{ position: [0, 0.2, 7.8], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <PageBackdropStage theme={theme} progressRef={progressRef} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
