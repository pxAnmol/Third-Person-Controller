import { useEffect } from "react";

export default function TouchControls() {
  const triggerKey = (key, pressed) => {
    window.dispatchEvent(
      new KeyboardEvent(pressed ? "keydown" : "keyup", { key: `touch-${key}` })
    );
  };

  const handleTouch = (e) => {
    const touch = e.touches[0];
    const height = window.innerHeight;
    const width = window.innerWidth;

    triggerKey("forward", false);
    triggerKey("left", false);
    triggerKey("right", false);
    triggerKey("sprint", false);

    if (touch) {
      if (touch.clientY > height * 0.4) {
        triggerKey("forward", true);
        if (touch.clientY < height * 0.6) {
          triggerKey("sprint", true);
        }
      }

      if (touch.clientX < width * 0.4) {
        triggerKey("left", true);
      }

      if (touch.clientX > width * 0.6) {
        triggerKey("right", true);
      }
    }
  };

  const handleTouchEnd = () => {
    triggerKey("forward", false);
    triggerKey("left", false);
    triggerKey("right", false);
    triggerKey("sprint", false);
  };

  useEffect(() => {
    const touchArea = document.createElement("div");
    touchArea.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      touch-action: none;
    `;

    touchArea.addEventListener("touchstart", handleTouch);
    touchArea.addEventListener("touchmove", handleTouch);
    touchArea.addEventListener("touchend", handleTouchEnd);
    document.body.appendChild(touchArea);

    return () => {
      touchArea.removeEventListener("touchstart", handleTouch);
      touchArea.removeEventListener("touchmove", handleTouch);
      touchArea.removeEventListener("touchend", handleTouchEnd);
      document.body.removeChild(touchArea);
    };
  }, []);

  return null;
}
