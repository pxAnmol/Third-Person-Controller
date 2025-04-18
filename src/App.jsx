import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Character from "./components/Character.jsx";
import { useControls } from "leva";

const App = () => {
  const { animation } = useControls({
    animation: {
      value: "idle_short",
      options: [
        "idle_short",
        "idle_long",
        "walking",
        "running",
        "crouch",
        "jump",
        "sneak",
        "left",
        "right",
        "back",
        "slide",
        "kick",
      ],
    },
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

      <Character animation={animation} position={[0, -1, 0]} />

      {/* <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, -3]} intensity={1} /> */}

      <Environment preset="city" />

      <OrbitControls />
      <Perf position="top-left" />
    </>
  );
};

export default App;
