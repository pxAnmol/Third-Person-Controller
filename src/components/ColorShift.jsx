import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState } from "react";

export default function ColorShift() {
  const { scene } = useThree();
  const [timeOffset] = useState(Math.random() * 1000);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.05 + timeOffset;
    const colorShift = new THREE.Color(
      0.07 + Math.sin(t) * 0.02,
      0.07 + Math.sin(t + 2) * 0.02,
      0.07 + Math.sin(t + 4) * 0.02
    );
    scene.background = colorShift;
    scene.fog.color = colorShift;
  });

  return null;
}
