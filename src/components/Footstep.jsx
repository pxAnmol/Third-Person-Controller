import { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function FootstepAudio({ isJumping, isCrouching }) {
  const footAudioRef = useRef(null);
  const [, getKeys] = useKeyboardControls();
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const footAudio = new Audio("./footstep5.ogg");
    footAudio.loop = true;
    footAudio.volume = 1;
    footAudioRef.current = footAudio;
    const horrorAudio = new Audio("./Horror.ogg");
    horrorAudio.loop = true;
    horrorAudio.volume = 0.4;
    horrorAudio.play();

    return () => {
      footAudio.pause();
      footAudioRef.current = null;
    };
  }, []);

  useFrame(() => {
    const { forward, sprint } = getKeys();
    const moving = forward;
    const shouldPlay = moving && !isJumping && !(sprint && isCrouching);

    const footAudio = footAudioRef.current;
    if (!footAudio) return;

    const targetVolume = sprint ? 0.9 : isCrouching ? 0.5 : 1;
    const targetRate = sprint ? 2 : isCrouching ? 1.65 : 1.4;
    footAudio.volume = targetVolume;
    footAudio.playbackRate = targetRate;

    if (shouldPlay && !isPlayingRef.current) {
      footAudio.play().catch(() => {});
      isPlayingRef.current = true;
    } else if (!shouldPlay && isPlayingRef.current) {
      footAudio.pause();
      isPlayingRef.current = false;
    }
  });

  return null;
}
