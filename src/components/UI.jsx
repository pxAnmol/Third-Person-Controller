import { useKeyboardControls } from "@react-three/drei";

const ControlButton = ({ isActive, label }) => (
  <div
    className={`flex items-center gap-2 p-1 rounded ${
      isActive ? "bg-slate-700/30" : "bg-transparent"
    } transition-colors duration-300`}
  >
    <span className="w-6 h-6 flex items-center justify-center border border-slate-600/50 rounded text-slate-400/80 text-xs">
      {label}
    </span>
  </div>
);

const UI = () => {
  const { forward, left, right, sprint, crouch, jump } = useKeyboardControls(
    (state) => state
  );

  return (
    <div className="interface fixed bottom-4 left-4 pointer-events-none">
      <div className="controls flex flex-col gap-1 p-2 rounded-md backdrop-blur-[1px]">
        <div className="flex justify-center">
          <ControlButton isActive={forward} label="W" />
        </div>

        <div className="flex gap-1 justify-center">
          <ControlButton isActive={left} label="A" />
          <ControlButton isActive={right} label="D" />
        </div>

        <div className="flex gap-1 justify-between">
          <ControlButton isActive={sprint} label="⇧" />
          <ControlButton isActive={jump} label="␣" />
          <ControlButton isActive={crouch} label="⌃" />
        </div>
      </div>
    </div>
  );
};

export default UI;
