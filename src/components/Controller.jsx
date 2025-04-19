import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Controller({ children }) {
  const characterRef = useRef();
  const [, getKeys] = useKeyboardControls();
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const [rotation, setRotation] = useState(0);
  const [isGrounded, setIsGrounded] = useState(true);

  const WALK_SPEED = 5;
  const SPRINT_SPEED = 7;
  const JUMP_FORCE = 2.5;
  const TURN_SPEED = 0.01;

  useFrame((state, delta) => {
    const { forward, backward, left, right, jump, sprint } = getKeys();

    if (!characterRef.current) return;

    const impulse = { x: 0, y: 0, z: 0 };
    const currentVelocity = characterRef.current.linvel();

    setIsGrounded(Math.abs(currentVelocity.y) < 0.1);

    const speed = sprint ? SPRINT_SPEED : WALK_SPEED;

    let targetRotation = rotation;
    if (left) targetRotation += TURN_SPEED;
    if (right) targetRotation -= TURN_SPEED;
    setRotation(targetRotation);

    if (forward) {
      impulse.x = Math.sin(targetRotation) * speed * delta;
      impulse.z = Math.cos(targetRotation) * speed * delta;
    }
    if (backward) {
      impulse.x = -Math.sin(targetRotation) * speed * delta * 0.5;
      impulse.z = -Math.cos(targetRotation) * speed * delta * 0.5;
    }

    if (jump && isGrounded) {
      impulse.y = JUMP_FORCE;
    }

    characterRef.current.applyImpulse(impulse);
    characterRef.current.setRotation(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetRotation, 0))
    );

    const characterPosition = characterRef.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(characterPosition);

    const cameraDistance = sprint ? 3.5 : 3;
    cameraPosition.x -= Math.sin(targetRotation) * cameraDistance;
    cameraPosition.z -= Math.cos(targetRotation) * cameraDistance;
    cameraPosition.y += 2;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(characterPosition);
    cameraTarget.y += 1;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });

  return (
    <RigidBody
      ref={characterRef}
      mass={10}
      type="dynamic"
      position={[0, 1, 0]}
      canSleep={false}
      enabledRotations={[false, true, false]}
      linearDamping={1.5}
      angularDamping={1.25}
    >
      {children}
    </RigidBody>
  );
}
