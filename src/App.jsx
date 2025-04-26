import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import City from "./components/City.jsx";
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
        position={[0, -1, 0]}
        infiniteGrid
        sectionColor={"#888"}
        cellColor={"#666"}
        fadeStrength={5}
      />
      <Physics debug>
        <Controller position={[0, 2, 0]}>
          <Character scale={0.75} animationState={animationState} />
        </Controller>

        {/* <City scale={1.75} /> */}

        {/* Floor */}

        <RigidBody type="fixed" restitution={0} friction={1}>
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[100, 1, 100]} />
            <meshBasicMaterial transparent color={"#ff0"} opacity={0.5} />
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
