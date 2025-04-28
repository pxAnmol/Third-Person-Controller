import { useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useKeyboardControls } from "@react-three/drei";

export default function Character({ isCrouching, isJumping, ...props }) {
  const characterRef = useRef();
  const mixerRef = useRef(null);
  const [isRefReady, setIsRefReady] = useState(false);
  const [idleTimer, setIdleTimer] = useState(0);
  const [, getKeys] = useKeyboardControls();

  const { nodes, materials } = useGLTF("./character/Boy.glb");
  const { animationState } = props;

  const { animations: idleShortAnim } = useFBX(
    "./Animations/boy1-idle_short1.fbx"
  );
  const { animations: idleLongAnim } = useFBX(
    "./Animations/boy1-idle_long.fbx"
  );
  const { animations: walkAnim } = useFBX("./Animations/boy1-walk.fbx");
  const { animations: runAnim } = useFBX("./Animations/boy1-run.fbx");
  const { animations: crouchAnim } = useFBX("./Animations/boy1-crouch.fbx");
  const { animations: jumpAnim } = useFBX("./Animations/boy1-jump1.fbx");
  const { animations: sneakAnim } = useFBX("./Animations/boy1-sneak.fbx");
  const { animations: kickAnim } = useFBX("./Animations/boy1-kick.fbx");

  idleShortAnim[0].name = "idle_short";
  idleLongAnim[0].name = "idle_long";
  walkAnim[0].name = "walk";
  runAnim[0].name = "run";
  crouchAnim[0].name = "crouch";
  jumpAnim[0].name = "jump";
  sneakAnim[0].name = "sneak";
  kickAnim[0].name = "kick";

  const [actions, setActions] = useState(null);

  useEffect(() => {
    if (characterRef.current) {
      setIsRefReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isRefReady || !characterRef.current || !nodes.Hips) return;

    mixerRef.current = new THREE.AnimationMixer(nodes.Hips);

    const actionMap = {};
    const clips = [
      idleShortAnim[0],
      idleLongAnim[0],
      walkAnim[0],
      runAnim[0],
      crouchAnim[0],
      jumpAnim[0],
      sneakAnim[0],
      kickAnim[0],
    ];

    clips.forEach((clip) => {
      if (clip) {
        if (clip.name === "jump") {
          clip.tracks.forEach((track) => {
            track.times = track.times.map((time) => Math.max(0, time - 0.25));

            if (track.name.includes("position.y")) {
              track.values = track.values.map(() => 0);
            }
          });
        }
        const action = mixerRef.current.clipAction(clip);
        action.setEffectiveWeight(0).play();
        actionMap[clip.name] = action;
      } else {
        console.warn("A clip failed to load and was skipped.");
      }
    });
    setActions(actionMap);

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        if (nodes.Hips) {
          mixerRef.current.uncacheRoot(nodes.Hips);
        }
        mixerRef.current = null;
      }
      setActions(null);
    };
  }, [isRefReady, nodes.Hips]);

  useFrame((state, delta) => {
    if (!mixerRef.current || !actions || !animationState) return;

    const { forward, sprint } = getKeys();

    Object.keys(animationState).forEach((key) => {
      animationState[key] = false;
    });

    if (isJumping) {
      animationState.jump = true;
      setIdleTimer(0);
    } else if (isCrouching && sprint) {
      animationState.crouch = true;
      setIdleTimer(0);
    } else if (forward) {
      if (sprint && !isCrouching) {
        animationState.run = true;
      } else if (isCrouching) {
        animationState.sneak = true;
      } else {
        animationState.walk = true;
      }
      setIdleTimer(0);
    } else if (isCrouching) {
      animationState.crouch = true;
      setIdleTimer(0);
    } else {
      if (idleTimer >= 15) {
        animationState.idle_long = true;
      } else {
        animationState.idle_short = true;
        setIdleTimer(idleTimer + delta);
      }
    }

    if (isJumping && nodes.Hips) {
      const initialY = nodes.Hips.position.y;
      mixerRef.current.update(delta);
      nodes.Hips.position.set(
        nodes.Hips.position.x,
        initialY,
        nodes.Hips.position.z
      );
    } else {
      mixerRef.current.update(delta);
    }

    const FADE_DURATION = 0.4;
    const FADE_DURATION_FAST = 0.1;

    for (const actionName in actions) {
      const action = actions[actionName];
      const shouldBeActive = animationState[actionName] === true;

      let fadeDuration = FADE_DURATION;

      if (
        (actionName === "walk" && animationState.idle_short) ||
        (actionName === "idle_short" && actions.run?.isRunning())
      ) {
        fadeDuration = FADE_DURATION_FAST;
      }

      if (shouldBeActive && action.getEffectiveWeight() < 1.0) {
        action.reset();
        action.setEffectiveWeight(
          Math.min(1.0, action.getEffectiveWeight() + delta / fadeDuration)
        );
      } else if (!shouldBeActive && action.getEffectiveWeight() > 0.0) {
        action.setEffectiveWeight(
          Math.max(0.0, action.getEffectiveWeight() - delta / fadeDuration)
        );
      }
    }
  });

  const groupProps = useMemo(() => ({ ...props, dispose: null }), [props]);

  return (
    <group ref={characterRef} {...groupProps}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        frustumCulled={false}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        frustumCulled={false}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        frustumCulled={false}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        frustumCulled={false}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        frustumCulled={false}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        frustumCulled={false}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        frustumCulled={false}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        frustumCulled={false}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        frustumCulled={false}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        frustumCulled={false}
        metalness={0.5}
        roughness={0.5}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  );
}

useGLTF.preload("./character/Boy.glb");
