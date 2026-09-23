import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const CLICK_DURATION_THRESHOLD_MS = 300;

type MarkerProps = {
  position: THREE.Vector3;
  size: number; // screen pixels
  color?: string;
};

export function Marker({ position, size, color = "#ff3366" }: MarkerProps) {
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
        <meshBasicMaterial color={color} depthTest={false} />
      </mesh>
    </group>
  );
}

type ClickLayerProps = {
  radius: number;
  onSelect: (position: THREE.Vector3) => void;
};

export function ClickLayer({ radius, onSelect }: ClickLayerProps) {
  const pointerStart = useRef<[number, number]>([0, 0]);
  const pointerDownTimeRef = useRef<number | null>(null);

  return (
    <mesh
      onPointerDown={(event) => {
        pointerStart.current = [event.clientX, event.clientY];
        pointerDownTimeRef.current = performance.now();
      }}
      onPointerUp={(event) => {
        if (pointerDownTimeRef.current === null) {
          return;
        }

        const duration = performance.now() - pointerDownTimeRef.current;
        pointerDownTimeRef.current = null;

        if (
          duration > CLICK_DURATION_THRESHOLD_MS ||
          event.delta > 5 ||
          Math.hypot(
            event.clientX - pointerStart.current[0],
            event.clientY - pointerStart.current[1],
          ) > 5
        ) {
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
