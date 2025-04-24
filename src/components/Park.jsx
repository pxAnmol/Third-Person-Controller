import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Park(props) {
  const { nodes, materials } = useGLTF("/game-map-com.glb");
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
          geometry={
            nodes["PVP_M_PGD19TowerBlue_01_High_0_2_������9_0"].geometry
          }
          material={materials.material_12}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["PVP_M_PGD19TowerRed_01_High_0_2_������13_0"].geometry
          }
          material={materials.material_13}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["PGD_M_20TerrainPart_10_PGD_M_20TerrainPart_10_1_������21_0"]
              .geometry
          }
          material={materials.material}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["PGD_M_20TerrainPart_10_PGD_M_20TerrainPart_10_0_������19_0"]
              .geometry
          }
          material={materials.material_2}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes[
              "PGD_M_20TerrainPart_10__0460967_PGD_M_20TerrainPart_10_2_������20_0"
            ].geometry
          }
          material={materials.material_3}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes[
              "PGD_M_20TerrainPart_04__0460076_PGD_M_20TerrainPart_04_2_������18_0"
            ].geometry
          }
          material={materials.material_4}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["PGD_M_20TerrainPart_05_PGD_M_20TerrainPart_05_1_������29_0"]
              .geometry
          }
          material={materials.material_5}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes[
              "PGD_M_20TerrainRiver_02__0460513_PGD_M_20TerrainRiver_02_0_3_������23_0"
            ].geometry
          }
          material={materials.material_7}
          position={[6807.429, 19.192, 4703.644]}
          rotation={[Math.PI, -0.891, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes[
              "PGD_M_20TerrainRiver_01__0460731_PGD_M_20TerrainRiver_01_1_������22_0"
            ].geometry
          }
          material={materials.material_8}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes[
              "PGD_M_20TerrainCenter_CE01_PGD_M_20TerrainCenter_CE01_1_������26_0"
            ].geometry
          }
          material={materials.material_9}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes[
              "PGD_M_20BaseBluePart_05_PGD_M_20BaseBluePart_05_0_������14_0"
            ].geometry
          }
          material={materials.material_10}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes[
              "PGD_M_20BaseBluePart_03_L_PGD_M_20BaseBluePart_03_L_0_������������������_0"
            ].geometry
          }
          material={materials.material_11}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["PVP_M_PGD19TowerRed_01_High_0_3_������13_0"].geometry
          }
          material={materials.material_13}
          position={[-777.826, -8.9, 13002.736]}
          rotation={[-Math.PI / 2, 0, 0.002]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["PVPMonster_bear_Mid_0_���--_0"].geometry}
          material={materials.material_0}
          position={[330.407, -15.431, 5041.023]}
          rotation={[-Math.PI / 2, 0, 0.871]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["PVPMonster_RedBaba_Mid_0_������-���buff_0"].geometry}
          material={materials["-buff"]}
          position={[1581.463, -21.682, 8407.358]}
          rotation={[-Math.PI / 2, 0, -1.008]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Mst_Deer1_Mid_0_������-���_0"].geometry}
          material={materials.material_16}
          position={[12619.301, -8.9, 12302.322]}
          rotation={[-Math.PI / 2, 0, -1.103]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["PVPMonster__Lizard_Mid_0_������-������_0"].geometry}
          material={materials.material_17}
          position={[7136.233, -15.084, 9114.045]}
          rotation={[-Math.PI / 2, 0, 0.742]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["PVPMonster_BlueBird_Mid_0_������-���_0"].geometry}
          material={materials.material_18}
          position={[4919.936, 1246.566, 10184.924]}
          rotation={[-1.536, 0, -1.747]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Mst_Truck1_Mid_0_4_������������_0"].geometry}
          material={materials.material_19}
          position={[-6287.153, -22.014, 12548.096]}
          rotation={[-1.573, -0.004, 1.608]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Mst_Truck2_Mid_0_3_������������_0"].geometry}
          material={materials.material_20}
          position={[14086.3, 153.486, -8973.168]}
          rotation={[Math.PI, 1.427, Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["������������__PVP_M_PGD19_StationBlue_01_High_0_������11_0"]
              .geometry
          }
          material={materials.material_21}
          position={[12902.382, -8.9, -12157.529]}
          rotation={[0, -0.809, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["������������__PVP_M_PGD19_StationRed_01_High_0_������10_0"]
              .geometry
          }
          material={materials.material_22}
          position={[-10330.561, -8.9, 11197.374]}
          rotation={[0, 0.806, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PGD_M_13DecalTowerBase_02_0_1__0.geometry}
          material={materials.PGD_M_13DecalTowerBase_02_0_1__0}
          position={[-2081.724, 17.857, 2040.953]}
          rotation={[0, 0.736, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["PGD_M_20JungleGrassGroup_04_Low_0_������8_0"].geometry
          }
          material={materials.material_23}
          position={[1256.395, -8.9, -497.492]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["PGD_M_YeQuTreeB_01_0_������6_0"].geometry}
          material={materials.material_25}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["PGD_M_WildBlock_10_0_������7_0"].geometry}
          material={materials.material_26}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["PGD_M_20PropsRed_02_PGD_M_20PropsRed_02_0_������4_0"]
              .geometry
          }
          material={materials.material_27}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["PGD_M_20RockWall_01_0_������3_0"].geometry}
          material={materials.material_28}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["PGD_M_20RockGroupRed_02_PGD_M_20RockGroupRed_02_0_������2_0"]
              .geometry
          }
          material={materials.material_29}
          position={[1256.395, -8.9, -497.492]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["PGD_M_19SculptureRedProps_01_0_������_0"].geometry}
          material={materials.material_30}
          position={[-15707.884, -2419.178, 16434.973]}
          rotation={[0, 0.884, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["PGD_M_20BaseRedPart_07_PGD_M_20BaseRedPart_07_0_������1_0"]
              .geometry
          }
          material={materials.material_31}
          position={[1256.395, -8.9, -497.492]}
        />
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/game-map-com.glb");
