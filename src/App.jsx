import { Suspense } from "react";
import Experience from "./Experience";

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </>
  );
}
