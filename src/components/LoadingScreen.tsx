import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Design", "Create", "Inspire"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // requestAnimationFrame counter: 0→100 over 2700ms
  useEffect(() => {
    const startTime = performance.now();
    const duration = 2700;
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * 100));

      if (progress < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setIsDone(true);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Cycle words every 900ms
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // 400ms delay after completion, then call onComplete
  const handleComplete = useCallback(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    if (isDone) {
      const cleanup = handleComplete();
      return cleanup;
    }
  }, [isDone, handleComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col justify-between"
      style={{ backgroundColor: "hsl(var(--bg))" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Top-left label */}
      <motion.div
        className="p-8 md:p-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--muted))" }}>
          Portfolio
        </span>
      </motion.div>

      {/* Center rotating words */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic"
            style={{ color: "hsl(var(--text) / 0.8)" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom section: counter + progress bar */}
      <div className="p-8 md:p-12">
        {/* Counter — bottom-right */}
        <div className="flex justify-end mb-6">
          <span
            className="text-6xl md:text-8xl lg:text-9xl font-display tabular-nums leading-none"
            style={{ color: "hsl(var(--text))" }}
          >
            {String(count).padStart(3, "0")}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[3px] rounded-full" style={{ backgroundColor: "hsl(var(--stroke) / 0.5)" }}>
          <div
            className="h-full accent-gradient rounded-full transition-transform duration-75 ease-linear"
            style={{
              transform: `scaleX(${count / 100})`,
              transformOrigin: "left",
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
