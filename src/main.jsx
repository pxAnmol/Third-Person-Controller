import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import UI from "./components/UI.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
        { name: "crouch", keys: ["ControlLeft"] },
        { name: "sprint", keys: ["ShiftLeft"] },
        { name: "attack", keys: ["Mouse0"] },
      ]}
    >
      <Canvas
        camera={{ fov: 55, position: [0, 0.7, 2.7] }}
        gl={{ powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#222"]} />
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </Canvas>
      <UI />
    </KeyboardControls>
  </StrictMode>
);
