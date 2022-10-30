import React from "react";
import useStore from "../hooks/useStore";

export default function Menu() {
  const [saveWorld, resetWorld] = useStore((state) => [
    state.saveWorld,
    state.resetWorld,
  ]);

  return (
    <div className="centered absolute flex menu">
      <button onClick={() => saveWorld()}>Save</button>
      <button onClick={() => resetWorld()}>Reset</button>
    </div>
  );
}
