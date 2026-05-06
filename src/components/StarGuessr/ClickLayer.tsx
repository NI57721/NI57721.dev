import { forwardRef, useImperativeHandle, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CLICK_DURATION_THRESHOLD_MS = 300;

export type MarkerHandle = {
  place: (position: THREE.Vector3) => void;
  clear: () => void;
};

type MarkerProps = {
  size: number; // screen pixels
};

export const Marker = forwardRef<MarkerHandle, MarkerProps>(function Marker(
  { size },
  ref,
) {
  const markerRef = useRef<THREE.Group>(null);
  const positionRef = useRef<THREE.Vector3 | null>(null);
  const { camera, size: canvasSize } = useThree();

  useImperativeHandle(
    ref,
    () => ({
      place: (position: THREE.Vector3) => {
        positionRef.current = position.clone();

        if (markerRef.current === null) {
          return;
        }

        markerRef.current.position.copy(position);
        markerRef.current.visible = true;
      },
      clear: () => {
        positionRef.current = null;

        if (markerRef.current === null) {
          return;
        }

        markerRef.current.visible = false;
      },
    }),
    [],
  );

  useFrame(() => {
    if (markerRef.current === null) {
      return;
    }

    if (positionRef.current === null) {
      return;
    }

    if (!(camera instanceof THREE.PerspectiveCamera)) {
      return;
    }

    const distance = camera.position.distanceTo(positionRef.current);

    const visibleHeight =
      2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;

    const worldSize = visibleHeight * (size / canvasSize.height);

    markerRef.current.scale.setScalar(worldSize);
  });

  return (
    <group ref={markerRef} visible={false}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ff3366" depthTest={false} />
      </mesh>
    </group>
  );
});

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
      <sphereGeometry args={[radius, 32, 32]} />
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
