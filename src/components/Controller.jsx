import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider, useRapier } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Controller({ children, ...props }) {
  const characterRef = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const [isSprint, setIsSprint] = useState(false);
  const [isCrouching, setIsCrouching] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const currentRotation = useRef(0);
  const { rapier, world } = useRapier();
  const rapierWorld = world;

  const WALK_SPEED = isCrouching ? 2 : 3;
  const SPRINT_SPEED = 4.5;
  const JUMP_FORCE = 1;
  let TURN_SPEED = isSprint ? 0.07 : 0.03;
  TURN_SPEED = isCrouching ? 0.02 : TURN_SPEED;

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => {
        return state.jump;
      },
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const unsubscribeCrouch = subscribeKeys(
      (state) => state.crouch,
      (value) => {
        if (value) {
          setIsCrouching((prev) => !prev);
        }
      }
    );

    return () => {
      unsubscribeJump();
      unsubscribeCrouch();
    };
  }, []);

  const jump = () => {
    console.log("jump");
  };

  useFrame((state, delta) => {
    const { forward, backward, left, right, sprint } = getKeys();

    if (!characterRef.current) return;

    const impulse = { x: 0, y: 0, z: 0 };

    let speed = sprint ? SPRINT_SPEED : WALK_SPEED;
    speed = isCrouching ? speed * 1.1 : speed;

    let targetRotation = rotation;
    if ((forward || backward) && (left || right) && !(isCrouching && sprint)) {
      if (left) targetRotation += TURN_SPEED;
      if (right) targetRotation -= TURN_SPEED;
      setRotation(targetRotation);
    }
    currentRotation.current = targetRotation;

    if (!(isCrouching && sprint)) {
      if (forward) {
        impulse.x = Math.sin(targetRotation) * speed * delta;
        impulse.z = Math.cos(targetRotation) * speed * delta;
      }
      if (backward) {
        impulse.x = -Math.sin(targetRotation) * speed * delta * 0.5;
        impulse.z = -Math.cos(targetRotation) * speed * delta * 0.5;
      }
      characterRef.current.applyImpulse(impulse);
    }

    if (forward || backward || left || right) {
      characterRef.current.setRotation(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, targetRotation, 0)
        )
      );
    }

    const characterPosition = characterRef.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(characterPosition);

    let cameraDistance = 2.55;
    if (forward || backward || left || right) {
      if (sprint && !isCrouching) {
        cameraDistance = 2.65;
      }
      cameraDistance = isCrouching ? cameraDistance * 0.85 : cameraDistance;
    }
    let cameraHeight = 1.2;
    if (forward || backward || left || right) {
      if (sprint && !isCrouching) {
        cameraHeight = 1.35;
      }
      cameraHeight = isCrouching ? cameraHeight * 0.8 : cameraHeight;
    }
    cameraPosition.x =
      characterPosition.x - Math.sin(targetRotation) * cameraDistance;
    cameraPosition.z =
      characterPosition.z - Math.cos(targetRotation) * cameraDistance;
    cameraPosition.y = characterPosition.y + cameraHeight;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(characterPosition);
    cameraTarget.y += isCrouching ? 1 : 1.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });

  return (
    <RigidBody
      {...props}
      ref={characterRef}
      mass={10}
      type="dynamic"
      colliders={false}
      restitution={0.5}
      friction={0.5}
      canSleep={false}
      lockRotations
      linearDamping={1.5}
      angularDamping={1.25}
    >
      <CapsuleCollider
        position={[
          `${isCrouching ? -0.05 : 0}`,
          `${isCrouching ? 0.64 : 0.7}`,
          0,
        ]}
        args={[0.4, `${isCrouching ? 0.25 : 0.3}`]}
      />
      {React.cloneElement(children, { isCrouching, isJumping })}
    </RigidBody>
  );
}
