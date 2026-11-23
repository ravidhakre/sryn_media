import React from 'react';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';

export default function StudioLighting({ showFloorShadow = true, shadowY = -2.6 }) {
  return (
    <>
      <color attach="background" args={['#F9FAFB']} />
      <fog attach="fog" args={['#F9FAFB', 11, 24]} />

      {/* Bright, airy luxury studio lighting */}
      <ambientLight intensity={0.85} color="#FFFFFF" />
      <hemisphereLight args={['#FFFFFF', '#E5E7EB', 0.95]} />

      {/* Main softbox key light */}
      <directionalLight
        position={[6, 8, 7]}
        intensity={1.5}
        color="#FFFDF9"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0005}
      />

      {/* Indigo studio rim light */}
      <directionalLight position={[-7, 4, -5]} intensity={0.75} color="#C7D2FE" />
      {/* Warm coral fill accent */}
      <pointLight position={[5, -2, 4]} intensity={0.6} color="#FFD6CC" distance={14} />

      {/* Procedural studio softbox HDR environment (zero external network fetches) */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={2.4}
            position={[0, 6, 4]}
            scale={[10, 6, 1]}
            color="#FFFFFF"
          />
          <Lightformer
            form="circle"
            intensity={2.2}
            position={[-7, 2, 2]}
            scale={5}
            color="#E0E7FF"
          />
          <Lightformer
            form="circle"
            intensity={1.8}
            position={[7, -1, 3]}
            scale={4}
            color="#FFE4DC"
          />
          <Lightformer
            form="ring"
            intensity={1.4}
            position={[0, -5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={12}
            color="#F3F4F6"
          />
        </group>
      </Environment>

      {showFloorShadow && (
        <ContactShadows
          position={[0, shadowY, 0]}
          opacity={0.28}
          scale={14}
          blur={2.8}
          far={6}
          color="#4F46E5"
        />
      )}
    </>
  );
}
