import React from "react";
import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";

export default function Ground() {
  const [planeRef] = usePlane(() => ({
    // [x, y, z]
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  // set groundTexture to be repeated across the mesh
  groundTexture.repeat.set(100, 100);

  return (
    <mesh ref={planeRef}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
}
