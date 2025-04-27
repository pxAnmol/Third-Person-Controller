import { Environment, Sparkles, Float } from "@react-three/drei";
import { Perf } from "r3f-perf";
import City from "./components/City.jsx";
import Character from "./components/Character.jsx";
import Controller from "./components/Controller.jsx";
import { Physics, RigidBody } from "@react-three/rapier";
import { Color, Fog } from "three";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useState } from "react";

const animationNames = [
  "idle_short",
  "walk",
  "run",
  "crouch",
  "jump",
  "crouch",
  "left",
  "right",
];

const animationState = {};
animationNames.forEach((name) => {
  animationState[name] = name === "idle_short";
});

const App = () => {
  const { scene } = useThree();
  const [cityLoaded, setCityLoaded] = useState(false);
  scene.fog = new Fog(new Color("#070707"), 1, 35);
  return (
    <>
      <color attach="background" args={["#070707"]} />

      <EffectComposer>
        <Vignette offset={0.5} darkness={0.4} eskil={false} />
      </EffectComposer>

      <Physics>
        <Suspense fallback={null}>
          <City scale={1.75} onLoad={() => setCityLoaded(true)} />
        </Suspense>

        {cityLoaded && (
          <Controller position={[0, 0.5, 0]}>
            <Character scale={0.75} animationState={animationState} />
          </Controller>
        )}

        {/* Walls */}
        {[
          [-100, 0, 0],
          [100, 0, 0],
          [0, 0, -100],
          [0, 0, 100],
        ].map((pos, i) => (
          <RigidBody type="fixed" key={i}>
            <mesh position={pos} rotation-y={i < 2 ? Math.PI / 2 : 0}>
              <boxGeometry args={[200, 25, 1]} />
              <meshStandardMaterial
                color="#111"
                opacity={0.5}
                transparent
                roughness={0.5}
                metalness={1}
              />
            </mesh>
          </RigidBody>
        ))}

        <Float speed={0.3}>
          <Sparkles
            count={200}
            scale={[200, 20, 200]}
            size={2}
            speed={0.05}
            color="#ffffff"
            opacity={0.1}
            position-y={5}
          />
        </Float>
      </Physics>

      <Environment preset="night" />
      <Perf position="top-left" />
    </>
  );
};

export default App;
