import React from "react";
import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures";

export default function Cube({ position, texture }) {
  const [cubeRef] = useBox(() => ({
    type: "Static",
    position,
  }));

  const activeTexture = textures[texture + "Texture"];
  console.log("activeTexture", activeTexture);

  return (
    <mesh ref={cubeRef}>
      <boxGeometry attach={"geometry"} />
      <meshStandardMaterial map={activeTexture} attach={"material"} />
    </mesh>
  );
}
