import * as THREE from 'three';
import { Line } from '@react-three/drei';
import ConstellationLinePairs from './data/constellation-lines.json';

type Vec3 = [number, number, number];
type Pair = [Vec3 , Vec3];
const pairs = ConstellationLinePairs as Pair[];

function arcBetween(
  a: [number, number, number],
  b: [number, number, number],
  radius: number,
  segments?: number,
): THREE.Vector3[] {
  segments ||= 32;
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
  const lines = pairs.map((a, i) => {
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

