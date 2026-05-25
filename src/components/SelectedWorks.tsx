import { motion } from "framer-motion";
import { projects } from "../data/portfolio";

const sectionAnim = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: "-100px" },
};

export default function SelectedWorks() {
  return (
    <section id="works" className="py-12 md:py-16" style={{ backgroundColor: "hsl(var(--bg))" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div {...sectionAnim} className="mb-10 md:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px" style={{ backgroundColor: "hsl(var(--stroke))" }} />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Selected Work
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-3">
                Featured{" "}
                <span className="font-display italic">projects</span>
              </h2>
              <p className="text-sm md:text-base text-muted max-w-md">
                A selection of projects I've worked on, from concept to launch.
              </p>
            </div>
            {/* View all — desktop */}
            <a
              href="https://github.com/Pushkar-Dangwal"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hidden md:inline-flex items-center gap-2 rounded-full text-sm px-5 py-2.5 text-muted hover:text-text-primary transition-all duration-300"
              style={{ backgroundColor: "hsl(var(--surface))" }}
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              View all work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-3xl border ${project.span}`}
              style={{
                backgroundColor: "hsl(var(--surface))",
                borderColor: "hsl(var(--stroke))",
                aspectRatio: i % 2 === 0 ? "16/10" : "4/3",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Background image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Halftone overlay */}
              <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply" />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-lg flex items-center justify-center"
                style={{ backgroundColor: "hsl(var(--bg) / 0.7)" }}
              >
                {/* Hover label pill */}
                <div className="relative rounded-full">
                  <span className="absolute inset-[-2px] rounded-full accent-gradient animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
                  <span
                    className="relative block rounded-full px-6 py-3 text-sm text-text-primary"
                    style={{ backgroundColor: "hsl(var(--bg))" }}
                  >
                    View —{" "}
                    <span className="font-display italic">{project.title}</span>
                  </span>
                </div>
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-lg font-medium text-white mb-1">{project.title}</h3>
                <p className="text-xs text-white/60">{project.subtitle}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
