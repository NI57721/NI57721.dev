import React from 'react'
import * as THREE from 'three'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'

type StarDotsProps = {
  count: number;
  distance: float;
};

function StarDots({ count, distance }: StarDotsProps) {
  const positions = [
    0,0,0,
    0.1, 0.1, -0.1,
    2, 1, -1,
    10, 10, -20,
    100, 100, -100,
    150, 150, -150,
    distance, 0, 0,
    0, distance, 0,
    0, 0, -distance,
  ];
  const pos = React.useMemo(() => new Float32Array(positions), [positions]);

  return (
    <Points positions={pos} stride={3} frustumCulled={false}>
    <PointMaterial
    transparent
    color={'#fff'}
    size={2.2}
    sizeAttenuation={false}
    depthWrite={false}
    blending={THREE.AdditiveBlending}
    toneMapped={false}
    />
    </Points>
  );
};

export default StarDots;

