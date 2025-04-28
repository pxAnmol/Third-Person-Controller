import { Environment, Sparkles, Float } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense, useState } from "react";
import City from "./components/City.jsx";
import Character from "./components/Character.jsx";
import Controller from "./components/Controller.jsx";
import { Physics, RigidBody } from "@react-three/rapier";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import ColorShift from "./components/ColorShift.jsx";

const animationNames = [
  "idle_short",
  "idle_long",
  "walk",
  "run",
  "left",
  "right",
  "crouch",
  "sneak",
  "jump",
];

const animationState = {};
animationNames.forEach((name) => {
  animationState[name] = name === "idle_short";
});

const App = () => {
  const [cityLoaded, setCityLoaded] = useState(false);
  return (
    <>
      <color attach="background" args={["#070707"]} />
      <fog attach="fog" args={["#070707", 1, 35]} />

      <EffectComposer>
        <Vignette offset={0.5} darkness={0.5} eskil={false} />
        <Noise opacity={0.005} />
      </EffectComposer>

      <ColorShift />

      <Physics>
        <Suspense fallback={null}>
          <City
            scale={1.75}
            rotation={[0, Math.PI * 0.9, 0]}
            onLoad={() => setCityLoaded(true)}
          />
        </Suspense>

        {cityLoaded && (
          <Controller position={[-7, 0.5, -3]}>
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
          <RigidBody type="fixed" key={i}  rotation={[0, Math.PI * 0.9, 0]}>
            <mesh position={pos} rotation-y={i < 2 ? Math.PI / 2 : 0}>
              <boxGeometry args={[200, 35, 1]} />
              <meshStandardMaterial
                color="#111"
                opacity={0.8}
                transparent
                roughness={0.5}
                metalness={1}
              />
            </mesh>
          </RigidBody>
        ))}

        <Float speed={[1, 1]} floatIntensity={0.2} rotationIntensity={0.2}>
          <Sparkles
            count={200}
            scale={[200, 20, 200]}
            size={3}
            speed={0.05}
            color="#ffffff"
            opacity={0.1}
            position-y={5}
          />
        </Float>
      </Physics>

      <Environment preset="night" environmentIntensity={0.25} />
      <Perf position="top-left" />
    </>
  );
};

export default App;
