import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Park from "./components/Park.jsx";
import Character from "./components/Character.jsx";
import Controller from "./components/Controller.jsx";
import { Physics, RigidBody } from "@react-three/rapier";

const App = () => {
  const animationNames = [
    "idle_short",
    "idle_long",
    "walk",
    "run",
    "crouch",
    "jump",
    "sneak",
    "left",
    "right",
    "back",
    "kick",
  ];

  const animationState = {};
  animationNames.forEach((name) => {
    animationState[name] = name === "idle_short";
  });

  return (
    <>
      <Grid
        infiniteGrid
        sectionColor={"#888"}
        cellColor={"#666"}
        fadeStrength={5}
      />
      <Physics>
        <Controller position={[0, 2, 0]}>
          <Character scale={0.75} animationState={animationState} />
        </Controller>

        <Park scale={0.002} position={[-2, 0, 0]} />

        {/* Floor */}

        {/* <RigidBody type="fixed" restitution={0} friction={1} colliders="hull">
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[100, 1, 100]} />
            <meshBasicMaterial transparent color={"#f00"} opacity={0.5} />
          </mesh>
        </RigidBody> */}
        
      </Physics>

      <Environment preset="city" />

      <OrbitControls />
      <Perf position="top-left" />
    </>
  );
};

export default App;
