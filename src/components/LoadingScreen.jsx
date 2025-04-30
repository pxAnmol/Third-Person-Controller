import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const loadingTexts = [
  "Gravity? Optional. Loading anyway",
  "Aligning camera with your ego",
  "Bribing the GPU gods",
  "Spawning coolness... please be patient",
  "This time it *might* work on phones too",
  "Running simulations of your patience",
  "Almost there. Probably. Maybe. Don't quote me",
  "Loading assets heavier than your decisions",
  "Downloading pixels smarter than you",
  "Headphones recommended",
  "GPU negotiation in progress",
  "Running on low RAM and high hopes",
  "Asked your browser for performance. It laughed",
  "Running benchmark... you failed",
  "Your browser just whispered 'bro, chill...'",
  "Dialing 404 for performance boost",
];

const getShuffledIndexes = (length) => {
  const indexes = [...Array(length).keys()];
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
};

const LoadingScreen = ({ onStart }) => {
  const [progress, setProgress] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [shuffledIndexes, setShuffledIndexes] = useState(
    getShuffledIndexes(loadingTexts.length)
  );
  const [animateBarOut, setAnimateBarOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => {
        const next = (prev + 1) % loadingTexts.length;
        if (next === 0)
          setShuffledIndexes(getShuffledIndexes(loadingTexts.length));
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadingManager = new THREE.LoadingManager();

    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progressValue = (itemsLoaded / itemsTotal) * 100;
      setProgress(progressValue);
    };

    loadingManager.onLoad = () => {
      setTimeout(() => {
        setAnimateBarOut(true);
      }, 500);
      setTimeout(() => {
        setLoading(false);
        setShowEnter(true);
      }, 1500);
    };

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
    );
    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.setDRACOLoader(dracoLoader);
    const fbxLoader = new FBXLoader(loadingManager);

    const load = (loader, path) =>
      new Promise((resolve) =>
        loader.load(path, resolve, undefined, (e) => {
          console.warn(`Error loading ${path}`, e);
          resolve(null);
        })
      );

    Promise.all([
      load(gltfLoader, "./character/Boy.glb"),
      load(gltfLoader, "/city_buildings-com1.glb"),
      load(fbxLoader, "./Animations/boy1-idle_short1.fbx"),
      load(fbxLoader, "./Animations/boy1-idle_long.fbx"),
      load(fbxLoader, "./Animations/boy1-walk.fbx"),
      load(fbxLoader, "./Animations/boy1-run.fbx"),
      load(fbxLoader, "./Animations/boy1-crouch.fbx"),
      load(fbxLoader, "./Animations/boy1-jump1.fbx"),
      load(fbxLoader, "./Animations/boy1-sneak.fbx"),
    ]);

    return () => {
      dracoLoader.dispose();
    };
  }, []);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => onStart(), 1000);
  };

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-white font-mono"
        >
          <motion.div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: "0%" }}
            animate={
              progress === 100 && animateBarOut
                ? { x: "100vw", opacity: 0 }
                : { width: `${progress}%` }
            }
            transition={{
              duration: progress === 100 && animateBarOut ? 1 : 0.5,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform, width, opacity" }}
          />

          {!showEnter && (
            <div className="mt-24 h-10 text-center w-full max-w-xl px-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={shuffledIndexes[textIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 text-lg sm:text-xl tracking-wide"
                >
                  {loadingTexts[shuffledIndexes[textIndex]]}
                </motion.p>
              </AnimatePresence>
            </div>
          )}

          {showEnter && (
            <button
              onClick={handleEnter}
              className="group relative overflow-hidden px-12 py-4 transition-all duration-500 ease-out text-white hover:text-black cursor-pointer hover:scale-100"
            >
              <span className="relative z-10 text-lg tracking-[0.3em]">
                ENTER
              </span>
              <div className="absolute inset-0 bg-white transform transition-transform duration-500 ease-in-out group-hover:translate-y-0 translate-y-full" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
