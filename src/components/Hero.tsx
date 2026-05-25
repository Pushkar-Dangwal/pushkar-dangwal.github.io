import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Hls from "hls.js";
import { personalInfo, HLS_VIDEO_SRC } from "../data/portfolio";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // HLS Video setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(HLS_VIDEO_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_VIDEO_SRC;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  // Role cycling every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.9"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-[0%] left-1/2 w-[120%] h-[130%] object-cover -translate-x-1/2"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: `linear-gradient(to top, hsl(var(--bg)), transparent)`,
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pb-28 pt-16">
        {/* Eyebrow */}
        <p className="blur-in text-xs uppercase tracking-[0.3em] mb-8 text-muted">
          {personalInfo.tagline}
        </p>

        {/* Name */}
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          {personalInfo.name}
        </h1>

        {/* Role line */}
        <p className="blur-in text-sm md:text-base text-muted mb-4">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {personalInfo.roles[roleIndex]}
          </span>{" "}
          lives in {personalInfo.location}.
        </p>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12">
          {personalInfo.description}
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex gap-4 flex-wrap justify-center">
          {/* See Works — solid */}
          <a
            href="#works"
            className="group relative rounded-full text-sm px-7 py-3.5 transition-all duration-300 hover:scale-105 bg-text-primary text-bg hover:bg-bg hover:text-text-primary"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            See Works
          </a>
          {/* Reach out — outlined */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="group relative rounded-full text-sm px-7 py-3.5 transition-all duration-300 hover:scale-105 border-2 border-stroke text-text-primary hover:border-transparent"
            style={{ backgroundColor: "hsl(var(--bg))" }}
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            Reach out...
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="blur-in text-xs uppercase tracking-[0.2em] text-muted">
          Scroll
        </span>
        <div className="relative w-px h-10 overflow-hidden" style={{ backgroundColor: "hsl(var(--stroke))" }}>
          <div className="absolute inset-x-0 w-full h-3 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
