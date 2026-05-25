import { motion } from "framer-motion";
import { timeline, type TimelineItem } from "../data/portfolio";

const cubicEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const categoryColors: Record<string, string> = {
  education: "#89AACC",
  work: "#7CC9A0",
  publication: "#E0C060",
  project: "#C98DBF",
};

const categoryLabels: Record<string, string> = {
  education: "Education",
  work: "Work",
  publication: "Publication",
  project: "Project",
};

function dateLabel(item: TimelineItem) {
  return item.endYear ? `${item.year} – ${item.endYear}` : item.year;
}

function CardContent({
  item,
  align = "left",
}: {
  item: TimelineItem;
  align?: "left" | "right";
}) {
  const color = categoryColors[item.category];
  const justifyEnd = align === "right";

  const inner = (
    <>
      <div className={`flex items-center gap-2 mb-2 ${justifyEnd ? "justify-end" : ""}`}>
        <span
          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${color}18`,
            color: color,
            border: `1px solid ${color}30`,
          }}
        >
          {categoryLabels[item.category]}
        </span>
      </div>
      <h3
        className={`text-sm md:text-base font-medium text-text-primary leading-tight mb-1 ${
          justifyEnd ? "text-right" : ""
        }`}
      >
        {item.title}
        {item.link && (
          <span className="inline-block ml-1.5 text-muted group-hover:text-text-primary group-hover:translate-x-0.5 transition-all duration-200">
            ↗
          </span>
        )}
      </h3>
      <p className={`text-xs text-muted mb-1.5 ${justifyEnd ? "text-right" : ""}`}>
        {item.organization}
      </p>
      <p className={`text-xs text-muted/80 leading-relaxed ${justifyEnd ? "text-right" : ""}`}>
        {item.description}
      </p>
      {item.tags && (
        <div className={`flex flex-wrap gap-1.5 mt-3 ${justifyEnd ? "justify-end" : ""}`}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] rounded-full px-2.5 py-0.5 text-muted border transition-colors duration-200 group-hover:text-text-primary/70"
              style={{ borderColor: "hsl(var(--stroke))" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );

  const className =
    "block rounded-2xl border p-5 transition-all duration-300 hover:border-muted/30 group" +
    (item.link ? " cursor-pointer" : "");
  const style = {
    backgroundColor: "hsl(var(--surface) / 0.4)" as const,
    borderColor: "hsl(var(--stroke))" as const,
  };

  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className={className} style={style}>
      {inner}
    </div>
  );
}

function TimelineEntry({
  item,
  index,
  side,
}: {
  item: TimelineItem;
  index: number;
  side: "left" | "right";
}) {
  const color = categoryColors[item.category];

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] md:gap-8 gap-4 items-start">
      {/* Left content or spacer */}
      {side === "left" ? (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: index * 0.08, ease: cubicEase }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-right"
        >
          <CardContent item={item} align="right" />
        </motion.div>
      ) : (
        <div className="hidden md:flex items-center justify-end">
          <span className="text-xs font-mono text-muted/60">{dateLabel(item)}</span>
        </div>
      )}

      {/* Center dot + line */}
      <div className="relative flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full z-10 mt-6"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 0 4px hsl(var(--bg))`,
          }}
        />
      </div>

      {/* Right content or spacer */}
      {side === "right" ? (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: index * 0.08, ease: cubicEase }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <CardContent item={item} />
        </motion.div>
      ) : (
        <div className="hidden md:flex items-center">
          <span className="text-xs font-mono text-muted/60">{dateLabel(item)}</span>
        </div>
      )}
    </div>
  );
}

/* Mobile single-column fallback */
function TimelineEntryMobile({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const color = categoryColors[item.category];

  const inner = (
    <>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span
          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${color}18`,
            color: color,
            border: `1px solid ${color}30`,
          }}
        >
          {categoryLabels[item.category]}
        </span>
        <span className="text-[10px] font-mono text-muted">{dateLabel(item)}</span>
      </div>
      <h3 className="text-sm font-medium text-text-primary leading-tight mb-1">
        {item.title}
        {item.link && (
          <span className="inline-block ml-1.5 text-muted group-hover:text-text-primary transition-all duration-200">
            ↗
          </span>
        )}
      </h3>
      <p className="text-xs text-muted mb-1">{item.organization}</p>
      <p className="text-xs text-muted/80 leading-relaxed">{item.description}</p>
      {item.tags && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] rounded-full px-2.5 py-0.5 text-muted border"
              style={{ borderColor: "hsl(var(--stroke))" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );

  const className =
    "block rounded-2xl border p-4 transition-all duration-300 hover:border-muted/30 group" +
    (item.link ? " cursor-pointer" : "");
  const style = {
    backgroundColor: "hsl(var(--surface) / 0.4)" as const,
    borderColor: "hsl(var(--stroke))" as const,
  };

  return (
    <div className="relative flex gap-4">
      {/* Timeline spine */}
      <div className="relative flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full z-10 mt-6 shrink-0"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 0 4px hsl(var(--bg))`,
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 pb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: cubicEase }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            style={style}
          >
            {inner}
          </a>
        ) : (
          <div className={className} style={style}>
            {inner}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-30 py-16 md:py-24"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cubicEase }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span
              className="w-8 h-px"
              style={{ backgroundColor: "hsl(var(--stroke))" }}
            />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Experience
            </span>
            <span
              className="w-8 h-px"
              style={{ backgroundColor: "hsl(var(--stroke))" }}
            />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-3">
            Career{" "}
            <span className="font-display italic">timeline</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-lg mx-auto">
            Education, professional milestones, publications, and key projects.
          </p>

          {/* Category legend */}
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: categoryColors[key] }}
                />
                <span className="text-[10px] text-muted uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desktop center timeline */}
        <div className="hidden md:block relative">
          {/* Center vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, transparent, hsl(var(--stroke)) 5%, hsl(var(--stroke)) 95%, transparent)`,
            }}
          />

          <div className="flex flex-col gap-8">
            {timeline.map((item, i) => (
              <TimelineEntry
                key={item.title}
                item={item}
                index={i}
                side={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>

        {/* Mobile single-column timeline */}
        <div className="md:hidden relative">
          {/* Left vertical line */}
          <div
            className="absolute left-[5px] top-0 bottom-0 w-px"
            style={{
              background: `linear-gradient(to bottom, transparent, hsl(var(--stroke)) 5%, hsl(var(--stroke)) 95%, transparent)`,
            }}
          />

          <div className="flex flex-col">
            {timeline.map((item, i) => (
              <TimelineEntryMobile key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
