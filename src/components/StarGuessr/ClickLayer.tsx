import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const CLICK_DURATION_THRESHOLD_MS = 300;

type MarkerProps = {
  position: THREE.Vector3;
  size: number; // screen pixels
};

export function Marker({ position, size }: MarkerProps) {
  const markerRef = useRef<THREE.Group>(null);
  const { camera, size: canvasSize } = useThree();

  useFrame(() => {
    if (markerRef.current === null) {
      return;
    }

    if (!(camera instanceof THREE.PerspectiveCamera)) {
      return;
    }

    const distance = camera.position.distanceTo(position);

    const visibleHeight =
      2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;

    const worldSize = visibleHeight * (size / canvasSize.height);

    markerRef.current.scale.setScalar(worldSize);
  });

  return (
    <group ref={markerRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ff3366" depthTest={false} />
      </mesh>
    </group>
  );
}

type ClickLayerProps = {
  radius: number;
  onSelect: (position: THREE.Vector3) => void;
};

export function ClickLayer({ radius, onSelect }: ClickLayerProps) {
  const pointerDownTimeRef = useRef<number | null>(null);

  return (
    <mesh
      onPointerDown={() => {
        pointerDownTimeRef.current = performance.now();
      }}
      onPointerUp={(event) => {
        if (pointerDownTimeRef.current === null) {
          return;
        }

        const duration = performance.now() - pointerDownTimeRef.current;
        pointerDownTimeRef.current = null;

        if (duration > CLICK_DURATION_THRESHOLD_MS) {
          return;
        }

        event.stopPropagation();

        const point = event.point.clone().normalize().multiplyScalar(radius);
        onSelect(point);
      }}
      onPointerLeave={() => {
        pointerDownTimeRef.current = null;
      }}
    >
      <sphereGeometry args={[radius, 64, 64]} />
      <meshBasicMaterial
        transparent
        opacity={0}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default ClickLayer;
