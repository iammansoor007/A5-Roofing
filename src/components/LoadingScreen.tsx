import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.65, 0, 0.35, 1] as const;

/* ----------------------------------
   Phase 1 — Cinematic Black Intro
-----------------------------------*/
const CinematicIntro = () => (
  <motion.div
    className="absolute inset-0 bg-black overflow-hidden"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    {/* Subtle moving light texture */}
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)]"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

/* ----------------------------------
   Phase 2 — Roof Draw + Morph
-----------------------------------*/
const RoofMorph = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 200 120" className="w-[320px] md:w-[420px]">
        {/* Roof Outline */}
        <motion.path
          d="M40 70 L100 30 L160 70"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        />

        {/* Base */}
        <motion.line
          x1="55"
          y1="70"
          x2="145"
          y2="70"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
        />
      </svg>
    </motion.div>
  );
};

/* ----------------------------------
   Phase 3 — Luxury Logo Reveal
-----------------------------------*/
const LuxuryReveal = () => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        opacity: 0,
      }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {/* Text Reveal */}
      <motion.h1
        className="relative text-5xl md:text-7xl font-semibold tracking-[0.35em] text-white"
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        A5 ROOFING

        {/* Metallic Light Sweep */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{ mixBlendMode: "overlay" }}
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 1.8, delay: 0.8, ease: "easeInOut" }}
        />
      </motion.h1>

      {/* Thin luxury underline */}
      <motion.div
        className="mt-8 h-px w-32 bg-white/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 1, ease: EASE }}
      />
    </motion.div>
  );
};

/* ----------------------------------
   Main Loader
-----------------------------------*/
interface LoaderProps {
  onComplete: () => void;
}

const PremiumLoader = ({ onComplete }: LoaderProps) => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 1200);
    const t2 = setTimeout(() => setPhase(3), 3000);
    const t3 = setTimeout(() => onComplete(), 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[300]"
      exit={{
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <AnimatePresence mode="wait">
        {phase === 1 && <CinematicIntro key="intro" />}
        {phase === 2 && <RoofMorph key="roof" />}
        {phase === 3 && <LuxuryReveal key="logo" />}
      </AnimatePresence>
    </motion.div>
  );
};

export default PremiumLoader;
