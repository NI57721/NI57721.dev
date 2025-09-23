import React from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import ConstellationLinePairs from './data/constellation-lines.json';

function arcBetween(
  a: [number, number, number],
  b: [number, number, number],
  radius: number,
  segments = 32,
): Vector3[] {
  const va = new THREE.Vector3(...a).normalize();
  const vb = new THREE.Vector3(...b).normalize();

  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = Math.acos(THREE.MathUtils.clamp(va.dot(vb), -1, 1));
    if (angle < 1e-6) {
      pts.push(va.clone().multiplyScalar(radius));
    } else {
      const sin = Math.sin(angle);
      const w1 = Math.sin((1 - t) * angle) / sin;
      const w2 = Math.sin(t * angle) / sin;
      const p = va.clone().multiplyScalar(w1).addScaledVector(vb, w2);
      pts.push(p.normalize().multiplyScalar(radius));
    }
  }
  return pts;
}

type ConstellationLinesProps = {
  distance: number;
};

function ConstellationLines({ distance }: ConstellationLinesProps) {
  const lines = ConstellationLinePairs.map((a, i) => {
    if (a[1] === null) {
      return;
    }
    const arcPts = arcBetween(a[0], a[1], distance * 0.99);
    return <Line key={i} points={arcPts} color="#ff4" lineWidth={1} />;
  });

  return (
    <>
      {lines}
    </>
  );
};

export default ConstellationLines;

