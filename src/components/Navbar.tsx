import { useState, useEffect } from "react";
import { personalInfo, navLinks } from "../data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link: string) => {
    setActiveLink(link);
    if (link === "Resume") {
      const a = document.createElement("a");
      a.href = "/CV/Pushkar_CV.pdf";
      a.download = "Pushkar_Dangwal_CV.pdf";
      a.click();
      return;
    }
    const sectionMap: Record<string, string> = {
      Home: "hero",
      Work: "works",
    };
    const el = document.getElementById(sectionMap[link] || "hero");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
        style={{ backgroundColor: "hsl(var(--surface))" }}
      >
        {/* Nav Links */}
        {navLinks.map((link) => (
          <button
            key={link}
            onClick={() => handleNavClick(link)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 ${
              activeLink === link
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {link}
          </button>
        ))}

        {/* Divider */}
        <span
          className="hidden sm:block w-px h-5 mx-1"
          style={{ backgroundColor: "hsl(var(--stroke))" }}
        />

        {/* Say hi button */}
        <a
          href={`mailto:${personalInfo.email}`}
          className="group text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 text-muted hover:text-text-primary"
        >
          <span
            className="relative flex items-center gap-1 rounded-full px-3 py-1.5 border transition-all duration-300"
            style={{
              backgroundColor: "hsl(var(--surface))",
              borderColor: "hsl(var(--stroke))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6999BA";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "hsl(var(--stroke))";
            }}
          >
            Say hi <span className="text-sm">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
