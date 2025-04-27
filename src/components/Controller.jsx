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
  const [isCrouching, setIsCrouching] = useState(false);
  const [jumpPressed, setJumpPressed] = useState(false);
  const [sprint, setSprint] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [canJump, setCanJump] = useState(true);
  const [rotation, setRotation] = useState(0);
  const currentRotation = useRef(0);
  const { rapier, world } = useRapier();
  const rapierWorld = world;

  const WALK_SPEED = isCrouching ? 2.5 : 4;
  const SPRINT_SPEED = 6;
  const JUMP_FORCE = sprint ? 2.5 : 2;
  let TURN_SPEED = isCrouching ? 0.04 : 0.05;

  const JUMP_COOLDOWN = 1000;
  const [jumpCooldownTimer, setJumpCooldownTimer] = useState(null);

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          setJumpPressed(true);
        } else if (!value && jumpPressed) {
          jump();
          setJumpPressed(false);
        }
      }
    );

    const unsubscribeCrouch = subscribeKeys(
      (state) => state.crouch,
      (value) => {
        if (value && !isJumping) {
          setIsCrouching((prev) => !prev);
        } else if (value && isJumping) {
          const crouchTimeout = setTimeout(() => {
            setIsCrouching((prev) => !prev);
          }, 100);

          return () => clearTimeout(crouchTimeout);
        }
      }
    );

    return () => {
      unsubscribeJump();
      unsubscribeCrouch();
    };
  }, [jumpPressed]);

  const jump = () => {
    if (!characterRef.current || !canJump || jumpCooldownTimer || isCrouching)
      return;

    if (canJump) {
      setIsJumping(true);
      const rotation = currentRotation.current;
      const jumpImpulse = {
        x: Math.sin(rotation) * JUMP_FORCE * 0.5,
        y: JUMP_FORCE * 0.85,
        z: Math.cos(rotation) * JUMP_FORCE * 0.5,
      };

      characterRef.current.applyImpulse(jumpImpulse);
      setCanJump(false);

      setJumpCooldownTimer(
        setTimeout(() => {
          setJumpCooldownTimer(null);
          setCanJump(true);
          setIsJumping(false);
        }, JUMP_COOLDOWN)
      );
    }
  };

  useFrame((state, delta) => {
    const { forward, left, right, sprint } = getKeys();

    if (!characterRef.current) return;

    const impulse = { x: 0, y: 0, z: 0 };

    setSprint(sprint);
    let speed = sprint ? SPRINT_SPEED : WALK_SPEED;
    speed = isCrouching ? speed * 1.1 : speed;

    const origin = characterRef.current.translation();
    origin.y -= 0.71;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);

    if (hit && hit.timeOfImpact < 0.05) {
      setCanJump(true);
    }

    let targetRotation = rotation;
    if ((forward) && (left || right) && !(isCrouching && sprint)) {
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
      characterRef.current.applyImpulse(impulse);
    }

    if (forward || left || right) {
      characterRef.current.setRotation(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, targetRotation, 0)
        )
      );
    }

    const characterPosition = characterRef.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(characterPosition);

    let cameraDistance = 1.7;
    if (forward || left || right) {
      if (sprint && !isCrouching) {
        cameraDistance = 1.85;
      }
      // cameraDistance = isCrouching ? cameraDistance * 0.9 : cameraDistance;
    }
    let cameraHeight = 1.2;
    if (forward || left || right) {
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
      mass={1}
      type="dynamic"
      colliders={false}
      restitution={0.2}
      friction={0.7}
      canSleep={false}
      lockRotations
      linearDamping={2.5}
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
