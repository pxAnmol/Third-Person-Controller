import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
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
        position-y={-1}
        infiniteGrid
        sectionColor={"#888"}
        cellColor={"#666"}
        fadeStrength={5}
      />
      <Physics debug>
        <Controller>
          <Character animationState={animationState} />
        </Controller>
        {/* Floor */}
        <RigidBody type="fixed" colliders="hull">
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[100, 1, 100]} />
            <meshBasicMaterial transparent opacity={0.0} />
          </mesh>
        </RigidBody>
      </Physics>

      <Environment preset="city" />

      <OrbitControls />
      <Perf position="top-left" />
    </>
  );
};

export default App;
