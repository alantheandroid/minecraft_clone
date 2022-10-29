import React from "react";
import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

export default function Ground() {
  const [planeRef] = usePlane(() => ({
    // [x, y, z]
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));
  const [addCube] = useStore((state) => [state.addCube]);

  // set groundTexture to be repeated across the mesh
  groundTexture.repeat.set(100, 100);

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((value) =>
          Math.ceil(value)
        );
        addCube(x, y, z);
      }}
      ref={planeRef}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
}
