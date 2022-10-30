import React, { useEffect, useState } from "react";
import useKeyboard from "../hooks/useKeyboard";
import useStore from "../hooks/useStore";
import { dirtImg, grassImg, glassImg, woodImg, logImg } from "../images/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export default function TextureSelector() {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = { dirt, grass, glass, wood, log };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      console.log("pressedTexture", pressedTexture);
      setTexture(pressedTexture[0]);
    }
  }, [dirt, grass, glass, wood, log, setTexture]);

  // show the selector for 2 sec when changing texture
  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute flex texture-selector">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              key={k}
              alt={k}
              src={src}
              className={`${k === activeTexture ? "active" : ""}`}
            />
          );
        })}
      </div>
    )
  );
}
