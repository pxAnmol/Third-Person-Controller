import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Canvas } from "@react-three/fiber";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Canvas
      camera={{ fov: 55, position: [0, 0.7, -2.7] }}
      gl={{ powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#222"]} />
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </Canvas>
  </StrictMode>
);
