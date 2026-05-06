import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { TrackballControls } from "three-stdlib";

const SEGMENTS = 256;
const DURATION = 1.8;
const APPROACH_DURATION = 0.7;

type Props = {
  guess: THREE.Vector3;
  answer: THREE.Vector3;
  radius: number;
  controlsRef: React.RefObject<TrackballControls | null>;
};

export function GuessReveal({ guess, answer, radius, controlsRef }: Props) {
  const { camera } = useThree();
  const elapsed = useRef(0);
  const complete = useRef(false);
  const reducedMotion = useRef(false);
  const view = useMemo(
    () => ({
      position: new THREE.Vector3(),
      rotation: new THREE.Quaternion(),
      startRotation: new THREE.Quaternion(),
      arcRotation: new THREE.Quaternion(),
      fov: 80,
    }),
    [],
  );
  const direction = useMemo(() => new THREE.Vector3(), []);
  const { line, start, tangent, angle } = useMemo(() => {
    const start = guess.clone().normalize();
    const end = answer.clone().normalize();
    const angle = start.angleTo(end);
    const tangent = end.clone().addScaledVector(start, -start.dot(end));
    // Opposite points have no unique shortest arc; choose a stable plane.
    if (tangent.lengthSq() < 1e-20) {
      const axis =
        Math.abs(start.z) < 0.9
          ? new THREE.Vector3(0, 0, 1)
          : new THREE.Vector3(0, 1, 0);
      tangent.crossVectors(axis, start);
    }
    tangent.normalize();
    const positions = new Float32Array((SEGMENTS + 1) * 3);
    const colors = new Float32Array((SEGMENTS + 1) * 3);
    const pink = new THREE.Color("#ff3366");
    const green = new THREE.Color("#69f0ae");
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      start
        .clone()
        .multiplyScalar(Math.cos(angle * t))
        .addScaledVector(tangent, Math.sin(angle * t))
        .multiplyScalar(radius)
        .toArray(positions, i * 3);
      pink
        .clone()
        .lerp(green, t)
        .toArray(colors, i * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setDrawRange(0, 0);
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      depthTest: false,
      depthWrite: false,
    });
    const line = new THREE.Line(geometry, material);
    line.frustumCulled = false;
    line.renderOrder = 1;
    return { line, start, tangent, angle };
  }, [guess, answer, radius]);

  useLayoutEffect(() => {
    view.position.copy(camera.position);
    view.rotation.copy(camera.quaternion);
    camera.getWorldDirection(direction);
    view.startRotation
      .setFromUnitVectors(direction, start)
      .multiply(view.rotation);
    view.fov = camera instanceof THREE.PerspectiveCamera ? camera.fov : 80;
    elapsed.current = 0;
    complete.current = false;
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const controls = controlsRef.current;
    if (controls) controls.enabled = false;
    return () => {
      if (controls) controls.enabled = true;
      line.geometry.dispose();
      line.material.dispose();
    };
  }, [line, controlsRef, camera, direction, start, view]);

  useFrame((_, delta) => {
    if (complete.current) return;
    elapsed.current += delta;
    if (!reducedMotion.current && elapsed.current < APPROACH_DURATION) {
      const t = elapsed.current / APPROACH_DURATION;
      const eased = t * t * (3 - 2 * t);
      direction.copy(start).multiplyScalar(-0.1);
      camera.position.lerpVectors(view.position, direction, eased);
      camera.quaternion.slerpQuaternions(
        view.rotation,
        view.startRotation,
        eased,
      );
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = THREE.MathUtils.lerp(view.fov, 80, eased);
        camera.updateProjectionMatrix();
      }
      return;
    }
    const progress = reducedMotion.current
      ? 1
      : Math.min((elapsed.current - APPROACH_DURATION) / DURATION, 1);
    const eased = progress * progress * (3 - 2 * progress);
    line.geometry.setDrawRange(0, Math.floor(eased * SEGMENTS) + 1);
    // Follow the growing end so even guesses on the opposite side stay visible.
    direction
      .copy(start)
      .multiplyScalar(Math.cos(angle * eased))
      .addScaledVector(tangent, Math.sin(angle * eased));
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.copy(direction).multiplyScalar(-0.1);
      view.arcRotation.setFromUnitVectors(start, direction);
      camera.quaternion.copy(view.startRotation).premultiply(view.arcRotation);
      camera.up.set(0, 1, 0).applyQuaternion(camera.quaternion);
      camera.fov = 80;
      camera.updateProjectionMatrix();
    }
    if (progress === 1) {
      complete.current = true;
      if (controlsRef.current) controlsRef.current.enabled = true;
    }
  });

  return <primitive object={line} />;
}
