import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import UI from "./components/UI.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

const Root = () => {
  const [started, setStarted] = useState(false);

  return (
    <StrictMode>
      {!started && (
        <LoadingScreen onStart={() => setStarted(true)} />
      )}

        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "w", "W", "touch-forward"] },
            { name: "left", keys: ["ArrowLeft", "a", "A", "touch-left"] },
            { name: "right", keys: ["ArrowRight", "d", "D", "touch-right"] },
            { name: "jump", keys: ["Space"] },
            { name: "crouch", keys: ["ControlLeft", "ControlRight"] },
            { name: "sprint", keys: ["ShiftLeft", "ShiftRight", "touch-sprint"] },
          ]}
        >
          <Canvas
            shadows
            camera={{ fov: 50, position: [0, 10, -20] }}
            gl={{
              powerPreference: "high-performance",
              antialias: true,
              precision: "mediump",
              alpha: false,
            }}
          >
            <color attach="background" args={["#070707"]} />
            {started && (
            <App />
            )}
          </Canvas>
          <UI />
        </KeyboardControls>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<Root />);
