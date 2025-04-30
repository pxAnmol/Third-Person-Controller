// License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
// Source: https://sketchfab.com/3d-models/full-gameready-city-buildings-0545317292c44490af5408cb58633121

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

const City = (props) => {
  const { nodes, materials } = useGLTF("/city_buildings-com1.glb");

  useEffect(() => {
    props.onLoad?.();
  }, [props]);

  return (
    <RigidBody
      type="fixed"
      restitution={0.1}
      friction={0.9}
      colliders="trimesh"
      {...props}
    >
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.Props1_u2NWBuild9_1}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.Merged_materials}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.Props1_u2NWBuild9_1_0}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials.Props1_u2NWBuild9_1_1}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials.Props1_u2NWBuild9_1_2}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_11.geometry}
          material={materials.Props1_u2NWBuild9_1_3}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_12.geometry}
          material={materials.Props1_u2NWBuild9_1_4}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_15.geometry}
          material={materials.Props1_u2NWBuild9_1_5}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_16.geometry}
          material={materials.Props1_u2NWBuild9_1_6}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_18.geometry}
          material={materials.Props1_u2NWBuild9_1_7}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_20.geometry}
          material={materials.Props1_u2NWBuild9_1_8}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_33.geometry}
          material={materials.Props1_u2NWBuild9_1_9}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_34.geometry}
          material={materials.Props1_u2NWBuild9_1_10}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_35.geometry}
          material={materials.Props1_u2NWBuild9_1_11}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_36.geometry}
          material={materials.Props1_u2NWBuild9_1_12}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_37.geometry}
          material={materials.Props1_u2NWBuild9_1_13}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_38.geometry}
          material={materials.Props1_u2NWBuild9_1_14}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_39.geometry}
          material={materials.Props1_u2NWBuild9_1_15}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_40.geometry}
          material={materials.Props1_u2NWBuild9_1_16}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_41.geometry}
          material={materials.Props1_u2NWBuild9_1_17}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_42.geometry}
          material={materials.Props1_u2NWBuild9_1_18}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_43.geometry}
          material={materials.Props1_u2NWBuild9_1_19}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_54.geometry}
          material={materials.Props1_u2NWBuild9_1_20}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_70.geometry}
          material={materials.Props1_u2NWBuild9_1_21}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_71.geometry}
          material={materials.Props1_u2NWBuild9_1_22}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_72.geometry}
          material={materials.Props1_u2NWBuild9_1_23}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_73.geometry}
          material={materials.Props1_u2NWBuild9_1_24}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_74.geometry}
          material={materials.StreeLamp1}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_75.geometry}
          material={materials.Props1_u2NWBuild9_1_25}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_76.geometry}
          material={materials.Props1_u2NWBuild9_1_26}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_77.geometry}
          material={materials.Props1_u2NWBuild9_1_27}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_78.geometry}
          material={materials.Props1_u2NWBuild9_1_28}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_79.geometry}
          material={materials.Props1_u2NWBuild9_1_29}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_80.geometry}
          material={materials.Props1_u2NWBuild9_1_30}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_81.geometry}
          material={materials.Props1_u2NWBuild9_1_31}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_82.geometry}
          material={materials.Props1_u2NWBuild9_1_32}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_84.geometry}
          material={materials.Props1_u2NWBuild9_1_33}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_85.geometry}
          material={materials.Props1_u2NWBuild9_1_34}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_90.geometry}
          material={materials.Props1_u2NWBuild9_1_35}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_91.geometry}
          material={materials.Props1_u2NWBuild9_1_36}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_92.geometry}
          material={materials.Props1_u2NWBuild9_1_37}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_96.geometry}
          material={materials.Props1_u2NWBuild9_1_38}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_97.geometry}
          material={materials.Props1_u2NWBuild9_1_39}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_98.geometry}
          material={materials.Props1_u2NWBuild9_1_40}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_99.geometry}
          material={materials.Props1_u2NWBuild9_1_41}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_100.geometry}
          material={materials.Props1_u2NWBuild9_1_42}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_101.geometry}
          material={materials.Props1_u2NWBuild9_1_43}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_102.geometry}
          material={materials.Props1_u2NWBuild9_1_44}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_103.geometry}
          material={materials.Props1_u2NWBuild9_1_45}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_104.geometry}
          material={materials.Props1_u2NWBuild9_1_46}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_105.geometry}
          material={materials.Props1_u2NWBuild9_1_47}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_106.geometry}
          material={materials.Props1_u2NWBuild9_1_48}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_108.geometry}
          material={materials.Props1_u2NWBuild9_1_49}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_111.geometry}
          material={materials.Props1_u2NWBuild9_1_50}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_112.geometry}
          material={materials.Props1_u2NWBuild9_1_51}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_114.geometry}
          material={materials.Props1_u2NWBuild9_1_52}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_115.geometry}
          material={materials.Props1_u2NWBuild9_1_53}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_116.geometry}
          material={materials.Props1_u2NWBuild9_1_54}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_117.geometry}
          material={materials.Props1_u2NWBuild9_1_55}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_118.geometry}
          material={materials.Props1_u2NWBuild9_1_56}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_120.geometry}
          material={materials.Props1_u2NWBuild9_1_57}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_128.geometry}
          material={materials.Props1_u2NWBuild9_1_58}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_130.geometry}
          material={materials.Props1_u2NWBuild9_1_59}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_131.geometry}
          material={materials.Props1_u2NWBuild9_1_60}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_134.geometry}
          material={materials.Props1_u2NWBuild9_1_61}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_135.geometry}
          material={materials.Props1_u2NWBuild9_1_62}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_136.geometry}
          material={materials.Props1_u2NWBuild9_1_63}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_137.geometry}
          material={materials.Props1_u2NWBuild9_1_64}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_138.geometry}
          material={materials.Props1_u2NWBuild9_1_65}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_140.geometry}
          material={materials.Props1_u2NWBuild9_1_66}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_141.geometry}
          material={materials.Props1_u2NWBuild9_1_67}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_143.geometry}
          material={materials.Props1_u2NWBuild9_1_68}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_144.geometry}
          material={materials.Props1_u2NWBuild9_1_69}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_145.geometry}
          material={materials.Props1_u2NWBuild9_1_70}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_151.geometry}
          material={materials.Props1_u2NWBuild9_1_71}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_152.geometry}
          material={materials.Props1_u2NWBuild9_1_72}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_153.geometry}
          material={materials.Props1_u2NWBuild9_1_73}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_154.geometry}
          material={materials.Props1_u2NWBuild9_1_74}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_156.geometry}
          material={materials.Props1_u2NWBuild9_1_75}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_157.geometry}
          material={materials.Props1_u2NWBuild9_1_76}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_158.geometry}
          material={materials.Props1_u2NWBuild9_1_77}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_160.geometry}
          material={materials.Props1_u2NWBuild9_1_78}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_170.geometry}
          material={materials.Props1_u2NWBuild9_1_79}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_171.geometry}
          material={materials.Props1_u2NWBuild9_1_80}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_172.geometry}
          material={materials.Props1_u2NWBuild9_1_81}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_173.geometry}
          material={materials.Props1_u2NWBuild9_1_82}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_174.geometry}
          material={materials.Props1_u2NWBuild9_1_83}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_175.geometry}
          material={materials.Props1_u2NWBuild9_1_84}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_176.geometry}
          material={materials.Props1_u2NWBuild9_1_85}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_177.geometry}
          material={materials.Props1_u2NWBuild9_1_86}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_179.geometry}
          material={materials.Props1_u2NWBuild9_1_87}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_181.geometry}
          material={materials.Props1_u2NWBuild9_1_88}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_182.geometry}
          material={materials.Props1_u2NWBuild9_1_89}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_183.geometry}
          material={materials.Props1_u2NWBuild9_1_90}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_184.geometry}
          material={materials.Props1_u2NWBuild9_1_91}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_187.geometry}
          material={materials.Props1_u2NWBuild9_1_92}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_188.geometry}
          material={materials.Props1_u2NWBuild9_1_93}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_190.geometry}
          material={materials.Props1_u2NWBuild9_1_94}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_191.geometry}
          material={materials.Props1_u2NWBuild9_1_95}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_206.geometry}
          material={materials.Props1_u2NWBuild9_1_96}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </RigidBody>
  );
};

export default City;

useGLTF.preload("/city_buildings-com1.glb");
