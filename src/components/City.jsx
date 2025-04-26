import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";

const City = (props) => {

  const {scene} = useGLTF('/city_buildings-com1.glb');

  return (
    <RigidBody
      type="fixed"
      restitution={0.1}
      friction={0.9}
      colliders="trimesh"
      {...props}
    >
    <group>
      <primitive object={scene} />
    </group>
    </RigidBody>
  )
}

export default City
