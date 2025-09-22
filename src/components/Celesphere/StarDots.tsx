import React from 'react';
import * as THREE from 'three';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import StarData from './data/8.5.json';

type StarDatum = {
  position: float[];
  magnitude: float;
  color: number[];
  name: string | null;
};

function loadJSON(): StarDatum[] {
  JSON.parse
}

type StarDotsProps = {
  distance: float;
  magnitudeCap: float;
};

function StarDots({ distance, magnitudeCap }: StarDotsProps) {
  const { positions, colors, sizes } = React.useMemo(() => {
    const n = StarData.length
    const pos = new Float32Array(n * 3)
    const col = new Float32Array(n * 3)
    const siz = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const datum = StarData[i];
      if (datum.magnitude > magnitudeCap) {
        continue;
      }
      pos[i * 3]     = datum.position[0] * distance;
      pos[i * 3 + 1] = datum.position[1] * distance;
      pos[i * 3 + 2] = datum.position[2] * distance;
      col[i * 3]     = datum.color[0];
      col[i * 3 + 1] = datum.color[1];
      col[i * 3 + 2] = datum.color[2];
      siz[i] = (magnitudeCap + 4) / (datum.magnitude + 2);
    }
    return { positions: pos, colors: col, sizes: siz }
  }, [magnitudeCap, distance])

  const vertexShader = `
    attribute float size;
    attribute vec3 color;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
      if (alpha < 0.001) discard;
      gl_FragColor = vec4(vColor, alpha);
    }
  `;

  return (
    <Points positions={positions} colors={colors} sizes={sizes}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        depthTest={true}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default StarDots;

