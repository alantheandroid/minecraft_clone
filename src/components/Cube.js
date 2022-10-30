import React from "react";
import { useBox } from "@react-three/cannon";
import useStore from "../hooks/useStore";
import * as textures from "../images/textures";

export default function Cube({ position, texture }) {
  const [cubeRef] = useBox(() => ({
    type: "Static",
    position,
  }));
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);
  const activeTexture = textures[texture + "Texture"];

  function handleAddCube(e) {
    e.stopPropagation();
    const clickedFace = Math.floor(e.faceIndex / 2);
    const { x, y, z } = cubeRef.current.position;
    if (e.altKey) {
      return removeCube(x, y, z);
    }
    switch (String(clickedFace)) {
      case "0":
        return addCube(x + 1, y, z);
      case "1":
        return addCube(x - 1, y, z);
      case "2":
        return addCube(x, y + 1, z);
      case "3":
        return addCube(x, y - 1, z);
      case "5":
        return addCube(x, y, z - 1);
      case "4":
        return addCube(x, y, z + 1);
      default:
        return console.log(clickedFace);
    }
  }

  return (
    <mesh onClick={(e) => handleAddCube(e)} ref={cubeRef}>
      <boxGeometry attach={"geometry"} />
      <meshStandardMaterial map={activeTexture} attach={"material"} />
    </mesh>
  );
}
