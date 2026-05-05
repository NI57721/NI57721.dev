import { useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import StarDots from "./StarDots";
import ConstellationLines from "./ConstellationLines";

const MIN_FOV = 8;
const MAX_FOV = 100;
const FOV_ZOOM_SPEED = 0.03;

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

function FovZoomControls() {
  const { camera, gl } = useThree();

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) {
      return;
    }

    const element = gl.domElement;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      camera.fov = THREE.MathUtils.clamp(
        camera.fov + event.deltaY * FOV_ZOOM_SPEED,
        MIN_FOV,
        MAX_FOV,
      );

      camera.updateProjectionMatrix();
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [camera, gl]);

  return null;
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
        fov: MAX_FOV,
        near: 0.001,
        far: 1000,
      }}
    >
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <Sphere radius={radius} />
      <StarDots distance={radius * 0.99} magnitudeCap={magnitudeCap} />
      {lined && <ConstellationLines distance={radius} />}

      <FovZoomControls />

      <OrbitControls
        enableZoom={false}
        enablePan={true}
        screenSpacePanning={true}
        maxDistance={radius * 0.98}
        rotateSpeed={-0.5}
        panSpeed={0.5}
      />
    </Canvas>
  );
}
