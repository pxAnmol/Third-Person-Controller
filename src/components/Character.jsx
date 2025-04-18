import { useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

export default function Character(props) {
  const characterRef = useRef();
  const mixerRef = useRef(null);
  const [isRefReady, setIsRefReady] = useState(false);

  const { nodes, materials } = useGLTF("./character/Boy.glb");
  const { animation } = props;

  const { animations: idleShortAnim } = useFBX(
    "./Animations/boy1-idle_short.fbx"
  );
  const { animations: idleLongAnim } = useFBX(
    "./Animations/boy1-idle_long.fbx"
  );
  const { animations: walkAnim } = useFBX("./Animations/boy1-walk.fbx");
  const { animations: runAnim } = useFBX("./Animations/boy1-run.fbx");
  const { animations: crouchAnim } = useFBX("./Animations/boy1-crouch.fbx");
  const { animations: jumpAnim } = useFBX("./Animations/boy1-jump.fbx");
  const { animations: sneakAnim } = useFBX("./Animations/boy1-sneak.fbx");
  const { animations: leftAnim } = useFBX("./Animations/boy1-left.fbx");
  const { animations: rightAnim } = useFBX("./Animations/boy1-right.fbx");
  const { animations: backAnim } = useFBX("./Animations/boy1-back.fbx");
  const { animations: slideAnim } = useFBX("./Animations/boy1-slide.fbx");
  const { animations: kickAnim } = useFBX("./Animations/boy1-kick.fbx");

  walkAnim[0].name = "walking";
  runAnim[0].name = "running";
  idleShortAnim[0].name = "idle_short";
  idleLongAnim[0].name = "idle_long";
  crouchAnim[0].name = "crouch";
  jumpAnim[0].name = "jump";
  sneakAnim[0].name = "sneak";
  leftAnim[0].name = "left";
  rightAnim[0].name = "right";
  backAnim[0].name = "back";
  slideAnim[0].name = "slide";
  kickAnim[0].name = "kick";  

  const [actions, setActions] = useState(null);
  const currentActionRef = useRef(null);
  const targetAnimationRef = useRef(animation);

  useEffect(() => {
    if (characterRef.current) {
      setIsRefReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isRefReady || !characterRef.current) return;

    mixerRef.current = new THREE.AnimationMixer(nodes.Hips);

    const actionMap = {};
    const clips = [
      walkAnim[0],
      runAnim[0],
      idleShortAnim[0],
      idleLongAnim[0],
      crouchAnim[0],
      jumpAnim[0],
      sneakAnim[0],
      leftAnim[0],
      rightAnim[0],
      backAnim[0],
      slideAnim[0],
      kickAnim[0],
    ];
    clips.forEach((clip) => {
      const action = mixerRef.current.clipAction(clip);
      actionMap[clip.name] = action;
      action.setEffectiveWeight(0).play();
    });
    setActions(actionMap);

    if (actionMap.idle_short) {
      actionMap.idle_short.reset().setEffectiveWeight(1).play();
      currentActionRef.current = actionMap.idle_short;
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current.uncacheRoot(characterRef.current);
        mixerRef.current = null;
      }
    };
  }, [isRefReady]);

  useEffect(() => {
    targetAnimationRef.current = animation;
  }, [animation]);

  useFrame((state, delta) => {
    if (mixerRef.current && actions) {
      mixerRef.current.update(delta);

      const targetAnimation = targetAnimationRef.current;
      const currentAction = currentActionRef.current;
      const newAction = actions[targetAnimation];

      if (newAction && newAction !== currentAction) {
        console.log(
          `Transitioning from ${currentAction?.getClip().name || "none"} to ${
            newAction.getClip().name
          }`
        );

        if (currentAction) {
          currentAction.fadeOut(0.5);
        }

        newAction.reset().setEffectiveWeight(1).fadeIn(0.5).play();

        currentActionRef.current = newAction;
      }
    }
  });

  const groupProps = useMemo(() => ({ ...props, dispose: null }), [props]);

  const requiredNodes = [
    "Hips",
    "EyeLeft",
    "EyeRight",
    "Wolf3D_Head",
    "Wolf3D_Teeth",
    "Wolf3D_Hair",
    "Wolf3D_Glasses",
    "Wolf3D_Facewear",
    "Wolf3D_Body",
    "Wolf3D_Outfit_Bottom",
    "Wolf3D_Outfit_Footwear",
    "Wolf3D_Outfit_Top",
  ];
  const requiredMaterials = [
    "Wolf3D_Eye",
    "Wolf3D_Skin",
    "Wolf3D_Teeth",
    "Wolf3D_Hair",
    "Wolf3D_Glasses",
    "Wolf3D_Facewear",
    "Wolf3D_Body",
    "Wolf3D_Outfit_Bottom",
    "Wolf3D_Outfit_Footwear",
    "Wolf3D_Outfit_Top",
  ];

  for (const node of requiredNodes) {
    if (!nodes[node]) {
      console.error(`Missing node: ${node}`);
      return null;
    }
  }
  for (const material of requiredMaterials) {
    if (!materials[material]) {
      console.error(`Missing material: ${material}`);
      return null;
    }
  }

  const skinnedMeshes = [
    "EyeLeft",
    "EyeRight",
    "Wolf3D_Head",
    "Wolf3D_Teeth",
    "Wolf3D_Hair",
    "Wolf3D_Glasses",
    "Wolf3D_Facewear",
    "Wolf3D_Body",
    "Wolf3D_Outfit_Bottom",
    "Wolf3D_Outfit_Footwear",
    "Wolf3D_Outfit_Top",
  ];
  for (const mesh of skinnedMeshes) {
    if (!nodes[mesh].skeleton) {
      console.error(`Missing skeleton for mesh: ${mesh}`);
      return null;
    }
  }

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
        geometry={nodes.Wolf3D_Facewear.geometry}
        material={materials.Wolf3D_Facewear}
        frustumCulled={false}
        skeleton={nodes.Wolf3D_Facewear.skeleton}
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
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  );
}

useGLTF.preload("./character/Boy.glb");
useFBX.preload("./Animations/boy1-sneak.fbx");
useFBX.preload("./Animations/boy1-fast_run.fbx");
