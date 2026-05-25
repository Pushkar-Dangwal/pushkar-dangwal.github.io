import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { explorations, personalInfo } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the center content
      if (contentRef.current) {
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: "top center",
          endTrigger: sectionRef.current,
          end: "bottom center",
          pin: true,
          pinSpacing: false,
        });
      }

      // Parallax columns
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          y: 200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const col1Items = explorations.slice(0, 3);
  const col2Items = explorations.slice(3, 6);

  return (
    <>
      <section
        ref={sectionRef}
        id="explorations"
        className="relative min-h-[300vh]"
        style={{ backgroundColor: "hsl(var(--bg))" }}
      >
        {/* Layer 1: Pinned center content */}
        <div className="relative z-10 flex items-center justify-center h-screen">
          <div ref={contentRef} className="text-center px-6 max-w-xl">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-8 h-px" style={{ backgroundColor: "hsl(var(--stroke))" }} />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                Explorations
              </span>
              <span className="w-8 h-px" style={{ backgroundColor: "hsl(var(--stroke))" }} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
              Code{" "}
              <span className="font-display italic">experiments</span>
            </h2>
            <p className="text-sm md:text-base text-muted mb-8 max-w-sm mx-auto">
              A curated collection of side projects, technical explorations, and engineering deep-dives.
            </p>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full text-sm px-5 py-2.5 text-muted hover:text-text-primary transition-all duration-300"
              style={{ backgroundColor: "hsl(var(--surface))" }}
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              GitHub
              <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </div>

        {/* Layer 2: Parallax columns */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="max-w-[1400px] mx-auto h-full px-6">
            <div className="grid grid-cols-2 gap-12 md:gap-40 h-full pt-[30vh]">
              {/* Column 1 */}
              <div ref={col1Ref} className="flex flex-col gap-8 items-end">
                {col1Items.map((item, i) => (
                  <button
                    key={item.title}
                    className="pointer-events-auto group relative aspect-square max-w-[320px] w-full rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
                    style={{
                      borderColor: "hsl(var(--stroke))",
                      transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                    }}
                    onClick={() => setLightbox(item.image)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                      <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                        {item.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Column 2 */}
              <div ref={col2Ref} className="flex flex-col gap-8 items-start pt-[20vh]">
                {col2Items.map((item, i) => (
                  <button
                    key={item.title}
                    className="pointer-events-auto group relative aspect-square max-w-[320px] w-full rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
                    style={{
                      borderColor: "hsl(var(--stroke))",
                      transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`,
                    }}
                    onClick={() => setLightbox(item.image)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                      <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                        {item.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Exploration"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
          />
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
