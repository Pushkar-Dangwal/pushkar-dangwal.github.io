import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "../data/portfolio";

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const numValue = parseInt(value);

  useEffect(() => {
    if (!isInView || !ref.current) return;

    let start = 0;
    const end = numValue;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);

      if (ref.current) {
        ref.current.textContent = `${start}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numValue, suffix]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-display text-text-primary tabular-nums">
      0{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative z-30 py-16 md:py-24" style={{ backgroundColor: "hsl(var(--bg))" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted mt-3 uppercase tracking-[0.2em]">
                {stat.label}
              </p>
              <div
                className="w-12 h-px mx-auto mt-4"
                style={{ backgroundColor: "hsl(var(--stroke))" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
