import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import useKeyboard from "../hooks/useKeyboard";

const JUMP_FORCE = 4;
const SPEED = 5;

export default function Player() {
  const { moveBackward, moveForward, moveLeft, moveRight, jump } =
    useKeyboard();

  const { camera } = useThree();
  const [playerRef, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));
  const playerPosition = useRef([0, 0, 0]);
  const playerVelocity = useRef([0, 0, 0]);

  // vectors get uploaded every frame
  useFrame(() => {
    // attach camera to playerPosition
    camera.position.copy(
      new Vector3(
        playerPosition.current[0],
        playerPosition.current[1],
        playerPosition.current[2]
      )
    );

    const direction = new Vector3();

    // vector for fwd/bwd movement
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    // vector for lx/rx movement
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, playerVelocity.current[1], direction.z);

    // make the player jump when pressing spacebar
    if (jump && Math.abs(playerVelocity.current[1]) < 0.05) {
      api.velocity.set(
        playerVelocity.current[0],
        JUMP_FORCE,
        playerVelocity.current[0]
      );
    }
  });

  // subscribe camera position to playerPosition
  useEffect(() => {
    api.position.subscribe((p) => (playerPosition.current = p));
  }, [api.position]);

  // subscribe camera velocity to playerVelocity
  useEffect(() => {
    api.velocity.subscribe((v) => (playerVelocity.current = v));
  }, [api.velocity]);

  return <mesh ref={playerRef}></mesh>;
}
