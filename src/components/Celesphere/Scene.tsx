import * as THREE from 'three'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import StarDots from './StarDots';

type SphereProps = {
  radius: number;
};

function Sphere({ radius }: SphereProps ) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshPhysicalMaterial color="#003" side={THREE.BackSide} />
    </mesh>
  )
}

type SceneProps = {
  backgroundColor: string;
};

function Scene({ backgroundColor }: SceneProps) {
  const radius = 3;

  return(
    <Canvas camera={{ position: [0, 0, 1] }}>
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Sphere radius={radius} />
      <StarDots count={15000} distance={radius * 0.997} />
      <OrbitControls />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
}

export default Scene;

