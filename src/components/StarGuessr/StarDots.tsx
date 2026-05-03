import React from "react";
import * as THREE from "three";
import { Points } from "@react-three/drei";
import StarData from "./data/8.5.json";

function clamp(v: number, min: number, max: number): number {
  if (v > max) {
    return max;
  } else if (v > min) {
    return v;
  } else {
    return min;
  }
}

type StarDotsProps = {
  distance: number;
  magnitudeCap: number;
};

function StarDots({ distance, magnitudeCap }: StarDotsProps) {
  const { positions, colors } = React.useMemo(() => {
    const n = StarData.length;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const datum = StarData[i];
      if (datum.magnitude > magnitudeCap) {
        continue;
      }
      pos[i * 3] = datum.position[0] * distance;
      pos[i * 3 + 1] = datum.position[1] * distance;
      pos[i * 3 + 2] = datum.position[2] * distance;
      col[i * 3] = datum.color[0];
      col[i * 3 + 1] = datum.color[1];
      col[i * 3 + 2] = datum.color[2];
    }
    return { positions: pos, colors: col };
  }, [distance, magnitudeCap]);

  const { sizes } = React.useMemo(() => {
    const n = StarData.length;
    const siz = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const datum = StarData[i];
      if (datum.magnitude > magnitudeCap) {
        continue;
      }
      siz[i] = clamp(
        (-9 / (magnitudeCap + 1.01)) * (datum.magnitude + 1) + 10,
        1,
        20,
      );
    }
    return { sizes: siz };
  }, [magnitudeCap]);

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
}

export default StarDots;
