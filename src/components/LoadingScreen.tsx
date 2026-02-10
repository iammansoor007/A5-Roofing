import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-primary flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute bg-foreground/5"
            style={{ height: "1px", width: "100%", top: `${12 + i * 11}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <motion.h1
          className="font-heading text-foreground text-4xl md:text-6xl font-semibold tracking-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Apex Roofing
        </motion.h1>

        <div className="w-48 h-px bg-foreground/20 mx-auto relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-foreground"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={onComplete}
          />
        </div>

        <motion.p
          className="font-body text-foreground/50 text-xs mt-4 uppercase tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Engineering Excellence
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
