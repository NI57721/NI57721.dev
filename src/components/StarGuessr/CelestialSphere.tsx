import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import StarDots from "./StarDots";
import ConstellationLines from "./ConstellationLines";

type SphereProps = {
  radius: number;
};

function Sphere({ radius }: SphereProps) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshPhysicalMaterial color="#003" side={THREE.BackSide} />
    </mesh>
  );
}

type SceneProps = {
  magnitudeCap: number;
  mode: GameMode;
  lined: boolean;
};

export function CelestialSphere({ magnitudeCap, mode, lined }: SceneProps) {
  const radius = 10;

  return (
    <Canvas
      camera={{
        position: [0, 0, 0.01],
        fov: 75,
        near: 0.001,
        far: 1000,
      }}
    >
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Sphere radius={radius} />
      <StarDots distance={radius * 0.99} magnitudeCap={magnitudeCap} />
      {lined && <ConstellationLines distance={radius} />}
      <OrbitControls
        maxDistance={radius * 0.98}
        rotateSpeed={-1}
      />
    </Canvas>
  );
}
