import { useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import StarDots from "./StarDots";
import ConstellationLines from "./ConstellationLines";

const MIN_FOV = 8;
const MAX_FOV = 100;
const WHEEL_FOV_ZOOM_SPEED = 0.03;
const PINCH_FOV_ZOOM_SPEED = 0.812;

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

function getTouchDistance(event: TouchEvent): number | null {
  if (event.touches.length < 2) {
    return null;
  }

  const [a, b] = event.touches;

  if (a === undefined || b === undefined) {
    return null;
  }

  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function FovZoomControls() {
  const { camera, gl } = useThree();

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) {
      return;
    }

    const element = gl.domElement;
    let previousTouchDistance: number | null = null;

    const setFov = (fov: number) => {
      camera.fov = THREE.MathUtils.clamp(fov, MIN_FOV, MAX_FOV);
      camera.updateProjectionMatrix();
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      setFov(camera.fov + event.deltaY * WHEEL_FOV_ZOOM_SPEED);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 2) {
        previousTouchDistance = null;
        return;
      }

      event.preventDefault();
      previousTouchDistance = getTouchDistance(event);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 2 || previousTouchDistance === null) {
        previousTouchDistance = null;
        return;
      }

      event.preventDefault();

      const distance = getTouchDistance(event);

      if (distance === null) {
        return;
      }

      const delta = distance - previousTouchDistance;

      setFov(camera.fov - delta * PINCH_FOV_ZOOM_SPEED);

      previousTouchDistance = distance;
    };

    const handleTouchEnd = () => {
      previousTouchDistance = null;
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    element.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    element.addEventListener("touchend", handleTouchEnd);
    element.addEventListener("touchcancel", handleTouchEnd);

    element.style.touchAction = "none";

    return () => {
      element.removeEventListener("wheel", handleWheel);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("touchcancel", handleTouchEnd);

      element.style.touchAction = "";
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
