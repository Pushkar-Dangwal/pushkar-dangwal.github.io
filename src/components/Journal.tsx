import { motion } from "framer-motion";
import { publications } from "../data/portfolio";

const sectionAnim = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: "-100px" },
};

export default function Journal() {
  return (
    <section id="journal" className="py-16 md:py-24" style={{ backgroundColor: "hsl(var(--bg))" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div {...sectionAnim} className="mb-10 md:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px" style={{ backgroundColor: "hsl(var(--stroke))" }} />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Publications
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-3">
                Research{" "}
                <span className="font-display italic">papers</span>
              </h2>
              <p className="text-sm md:text-base text-muted max-w-md">
                IEEE published research in security frameworks and decentralised identity systems.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Publication Entries */}
        <div className="flex flex-col gap-4">
          {publications.map((pub, i) => {
            const isLink = pub.status === "published" && pub.link;
            const Wrapper = isLink ? "a" : "div";
            const wrapperProps = isLink
              ? { href: pub.link, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                viewport={{ once: true }}
              >
                <Wrapper
                  {...wrapperProps}
                  className={`group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                    isLink ? "hover:bg-surface cursor-pointer" : ""
                  }`}
                  style={{
                    backgroundColor: "hsl(var(--surface) / 0.3)",
                    borderColor: "hsl(var(--stroke))",
                  }}
                >
                  {/* Number badge */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-medium"
                    style={{
                      backgroundColor: "hsl(var(--surface))",
                      color: "hsl(var(--text))",
                      border: "1px solid hsl(var(--stroke))",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base text-text-primary font-medium leading-snug mb-1 group-hover:text-text-primary transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-xs text-muted">
                      {pub.venue}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Status badge */}
                    <span
                      className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: pub.status === "published"
                          ? "rgba(78, 133, 191, 0.15)"
                          : "rgba(255, 200, 50, 0.12)",
                        color: pub.status === "published"
                          ? "#89AACC"
                          : "#e0c060",
                        border: `1px solid ${pub.status === "published" ? "rgba(78, 133, 191, 0.25)" : "rgba(255, 200, 50, 0.2)"}`,
                      }}
                    >
                      {pub.status === "published" ? "Published" : "Presented"}
                    </span>
                    <span className="text-xs text-muted">{pub.date}</span>
                    {/* Arrow for linked publications */}
                    {isLink && (
                      <span className="text-muted group-hover:text-text-primary transition-all duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
