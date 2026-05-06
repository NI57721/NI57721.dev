import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import type { TrackballControls as TrackballControlsImpl } from "three-stdlib";
import StarDots from "./StarDots";
import type { GameMode } from "./";
import ConstellationLines from "./ConstellationLines";
import { ClickLayer, Marker } from "./ClickLayer";

const MIN_FOV = 8;
const DEFAULT_FOV = 80;
const MAX_FOV = 130;
const WHEEL_FOV_ZOOM_SPEED = 0.03;
const PINCH_FOV_ZOOM_SPEED = 0.12;
const MAX_ROTATE_SPEED = -0.1;
const BASE_ROTATE_SPEED = -2;

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

function getRotateSpeed(fov: number): number {
  return Math.min(MAX_ROTATE_SPEED, (BASE_ROTATE_SPEED * fov) / MAX_FOV);
}

function updateRotateSpeed(
  camera: THREE.PerspectiveCamera,
  controls: TrackballControlsImpl | null,
) {
  if (controls === null) {
    return;
  }

  controls.rotateSpeed = getRotateSpeed(camera.fov);
}

type FovZoomControlsProps = {
  controlsRef: React.RefObject<TrackballControlsImpl | null>;
};

function FovZoomControls({ controlsRef }: FovZoomControlsProps) {
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
      updateRotateSpeed(camera, controlsRef.current);
    };

    updateRotateSpeed(camera, controlsRef.current);

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
  }, [camera, gl, controlsRef]);

  return null;
}

type SceneProps = {
  magnitudeCap: number;
  mode: GameMode;
  lined: boolean;
};

export function CelestialSphere({
  magnitudeCap,
  mode: _mode,
  lined,
}: SceneProps) {
  const radius = 10;
  const controlsRef = useRef<TrackballControlsImpl | null>(null);
  const [selectedPosition, setSelectedPosition] =
    useState<THREE.Vector3 | null>(null);

  return (
    <Canvas
      camera={{
        position: [0, 0, 0.1],
        fov: DEFAULT_FOV,
        near: 0.001,
        far: 1000,
      }}
    >
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <Sphere radius={radius} />
      <StarDots distance={radius * 0.99} magnitudeCap={magnitudeCap} />
      {lined && <ConstellationLines distance={radius} />}

      <ClickLayer
        radius={radius * 0.98}
        onSelect={(position) => {
          setSelectedPosition(position);
        }}
      />

      {selectedPosition !== null && (
        <Marker position={selectedPosition} size={16} />
      )}

      <FovZoomControls controlsRef={controlsRef} />

      <TrackballControls
        ref={controlsRef}
        noZoom={true}
        noPan={false}
        rotateSpeed={getRotateSpeed(DEFAULT_FOV)}
        zoomSpeed={2}
        panSpeed={0.5}
        staticMoving={false}
        dynamicDampingFactor={0.08}
      />
    </Canvas>
  );
}
