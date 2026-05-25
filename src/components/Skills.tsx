import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  skillNodes,
  skillConnections,
  skillCategories,
} from "../data/portfolio";

const cubicEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ── Node physics state ── */
interface NodeState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  pulseSpeed: number;
}

/* ── Particle flowing along a connection ── */
interface Particle {
  fromId: string;
  toId: string;
  t: number;
  speed: number;
}

/* ── Compute initial positions (categories in a ring, skills around each) ── */
function computePositions(w: number, h: number): Map<string, NodeState> {
  const positions = new Map<string, NodeState>();
  const catGroups = new Map<string, typeof skillNodes>();

  for (const node of skillNodes) {
    if (!catGroups.has(node.category)) catGroups.set(node.category, []);
    catGroups.get(node.category)!.push(node);
  }

  const catIds = [...catGroups.keys()];
  const cx = w / 2;
  const cy = h / 2;
  const rx = w * 0.32;
  const ry = h * 0.32;

  catIds.forEach((catId, ci) => {
    const angle = (ci / catIds.length) * Math.PI * 2 - Math.PI / 2;
    const clusterCx = cx + Math.cos(angle) * rx;
    const clusterCy = cy + Math.sin(angle) * ry;
    const nodes = catGroups.get(catId)!;

    nodes.forEach((node, ni) => {
      const subAngle = (ni / nodes.length) * Math.PI * 2 - Math.PI / 2;
      const subR = 40 + Math.random() * 35;
      const x = clusterCx + Math.cos(subAngle) * subR;
      const y = clusterCy + Math.sin(subAngle) * subR;

      // Steady drift in a random direction
      const moveAngle = Math.random() * Math.PI * 2;
      const moveSpeed = 0.15 + Math.random() * 0.2;

      positions.set(node.id, {
        x,
        y,
        vx: Math.cos(moveAngle) * moveSpeed,
        vy: Math.sin(moveAngle) * moveSpeed,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.012,
      });
    });
  });

  return positions;
}

/* ── Spawn particles along connections ── */
function spawnParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const conn = skillConnections[Math.floor(Math.random() * skillConnections.length)];
    particles.push({
      fromId: conn.from,
      toId: conn.to,
      t: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
    });
  }
  return particles;
}

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dimensions, setDimensions] = useState({ w: 1100, h: 650 });

  const positionsRef = useRef<Map<string, NodeState>>(computePositions(1100, 650));
  const particlesRef = useRef<Particle[]>(spawnParticles(40));
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const hoveredRef = useRef<string | null>(null);

  const getColor = useCallback((catId: string) => {
    return skillCategories.find((c) => c.id === catId)?.color || "#666";
  }, []);

  /* ── Search matches ── */
  const matchingIds = searchQuery.trim()
    ? skillNodes
        .filter((n) =>
          n.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((n) => n.id)
    : [];
  const isSearching = searchQuery.trim().length > 0;

  /* ── Simulation tick ── */
  const simulate = useCallback(() => {
    const positions = positionsRef.current;
    if (positions.size === 0) return;
    const { w, h } = dimensions;

    // Move all nodes in their constant direction, bounce off walls
    for (const node of skillNodes) {
      const p = positions.get(node.id);
      if (!p) continue;

      // Constant drift movement
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off walls (with padding)
      const pad = 50;
      if (p.x <= pad || p.x >= w - pad) {
        p.vx *= -1;
        p.x = Math.max(pad, Math.min(w - pad, p.x));
      }
      if (p.y <= pad || p.y >= h - pad) {
        p.vy *= -1;
        p.y = Math.max(pad, Math.min(h - pad, p.y));
      }

      // Pulse phase
      p.phase += p.pulseSpeed;
    }

    // Advance particles
    for (const pt of particlesRef.current) {
      pt.t += pt.speed;
      if (pt.t > 1) {
        const conn = skillConnections[Math.floor(Math.random() * skillConnections.length)];
        pt.fromId = conn.from;
        pt.toId = conn.to;
        pt.t = 0;
        pt.speed = 0.002 + Math.random() * 0.003;
      }
    }
  }, [dimensions]);

  /* ── Draw frame ── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const { w, h } = dimensions;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const positions = positionsRef.current;
    const hovered = hoveredRef.current;

    /* ── Draw connections ── */
    for (const conn of skillConnections) {
      const a = positions.get(conn.from);
      const b = positions.get(conn.to);
      if (!a || !b) continue;

      const fromNode = skillNodes.find((n) => n.id === conn.from);
      const toNode = skillNodes.find((n) => n.id === conn.to);
      if (!fromNode || !toNode) continue;

      const isHoverHL =
        hovered === conn.from || hovered === conn.to;
      const isSearchHL =
        isSearching &&
        (matchingIds.includes(conn.from) || matchingIds.includes(conn.to));
      const isSearchDim =
        isSearching &&
        !matchingIds.includes(conn.from) &&
        !matchingIds.includes(conn.to);

      let alpha = 0.08;
      let lw = 0.7;
      if (isHoverHL) { alpha = 0.5; lw = 1.8; }
      else if (isSearchHL) { alpha = 0.5; lw = 1.5; }
      else if (isSearchDim) { alpha = 0.015; }

      const lineColor = (isHoverHL || isSearchHL)
        ? getColor(fromNode.category)
        : "#fff";

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = lw;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    /* ── Draw particles ── */
    for (const pt of particlesRef.current) {
      const a = positions.get(pt.fromId);
      const b = positions.get(pt.toId);
      if (!a || !b) continue;

      const fromNode = skillNodes.find((n) => n.id === pt.fromId);
      if (!fromNode) continue;
      const color = getColor(fromNode.category);

      const px = a.x + (b.x - a.x) * pt.t;
      const py = a.y + (b.y - a.y) * pt.t;
      const fade = Math.sin(pt.t * Math.PI);

      const isSearchDim =
        isSearching &&
        !matchingIds.includes(pt.fromId) &&
        !matchingIds.includes(pt.toId);

      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = isSearchDim ? 0.02 : fade * 0.5;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    /* ── Draw nodes ── */
    for (const node of skillNodes) {
      const p = positions.get(node.id);
      if (!p) continue;
      const color = getColor(node.category);

      const isHovered = hovered === node.id;
      const isConnected =
        hovered != null &&
        skillConnections.some(
          (c) =>
            (c.from === hovered && c.to === node.id) ||
            (c.to === hovered && c.from === node.id)
        );
      const isSearchMatch = matchingIds.includes(node.id);
      const isSearchDim = isSearching && !isSearchMatch;

      // Pulse
      const pulse = 1 + Math.sin(p.phase) * 0.12;
      let r = 6 * pulse;          // bigger base radius
      if (isHovered) r = 12;
      else if (isConnected) r = 9;
      else if (isSearchMatch) r = 10;

      const nodeAlpha = isSearchDim ? 0.08 : 1;

      // Glow for highlighted nodes
      if ((isHovered || isSearchMatch || isConnected) && !isSearchDim) {
        const glowR = r + 14;
        const grad = ctx.createRadialGradient(p.x, p.y, r, p.x, p.y, glowR);
        grad.addColorStop(0, color + "55");
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Search pointer line
      if (isSearchMatch && isSearching) {
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(p.x, 0);
        ctx.lineTo(p.x, p.y - r - 10);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        // Arrow head
        const ay = p.y - r - 10;
        ctx.beginPath();
        ctx.moveTo(p.x, ay + 5);
        ctx.lineTo(p.x - 4, ay - 2);
        ctx.lineTo(p.x + 4, ay - 2);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.globalAlpha = nodeAlpha;
      ctx.fillStyle = color;
      ctx.fill();

      // Ring
      if (!isSearchDim) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = (isHovered || isSearchMatch) ? 0.6 : 0.12;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Label
      const showLabel = isHovered || isConnected || isSearchMatch || !isSearching;
      if (showLabel) {
        const fs = (isHovered || isSearchMatch) ? 13 : 11;
        ctx.font = `${(isHovered || isSearchMatch) ? "600" : "400"} ${fs}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.globalAlpha = isSearchDim ? 0.06 : (isHovered || isSearchMatch ? 1 : 0.6);
        ctx.fillStyle = (isHovered || isSearchMatch) ? "#fff" : "hsl(0,0%,72%)";
        ctx.fillText(node.label, p.x, p.y + r + 6);
        ctx.globalAlpha = 1;
      }
    }

    /* ── No results message ── */
    if (isSearching && matchingIds.length === 0) {
      ctx.font = "500 14px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "hsl(0,0%,50%)";
      ctx.fillText(`No skill found for "${searchQuery}"`, w / 2, h / 2);
    }
  }, [hoveredNode, isSearching, matchingIds, searchQuery, dimensions, getColor]);

  /* ── Animation loop ── */
  useEffect(() => {
    let running = true;
    const loop = () => {
      if (!running) return;
      simulate();
      draw();
      animRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [simulate, draw]);

  /* ── Resize observer ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = Math.max(500, Math.min(700, w * 0.55));
        setDimensions({ w, h });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Reinit on resize ── */
  useEffect(() => {
    positionsRef.current = computePositions(dimensions.w, dimensions.h);
    particlesRef.current = spawnParticles(40);
  }, [dimensions]);

  /* ── Mouse move → hit-test (no repulsion, just detection) ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };

      let found: string | null = null;
      for (const node of skillNodes) {
        const p = positionsRef.current.get(node.id);
        if (!p) continue;
        const dx = x - p.x;
        const dy = y - p.y;
        if (dx * dx + dy * dy < 24 * 24) {
          found = node.id;
          break;
        }
      }
      hoveredRef.current = found;
      setHoveredNode(found);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
    hoveredRef.current = null;
    setHoveredNode(null);
  }, []);

  /* ── Tooltip data ── */
  const hoveredData = hoveredNode
    ? skillNodes.find((n) => n.id === hoveredNode)
    : null;
  const hoveredCat = hoveredData
    ? skillCategories.find((c) => c.id === hoveredData.category)
    : null;
  const connectedCount = hoveredNode
    ? skillConnections.filter(
        (c) => c.from === hoveredNode || c.to === hoveredNode
      ).length
    : 0;

  return (
    <section
      id="skills"
      className="relative z-30 py-16 md:py-24"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      <div className="w-full px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cubicEase }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 md:mb-12 max-w-[1200px] mx-auto"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px" style={{ backgroundColor: "hsl(var(--stroke))" }} />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Skills</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-3">
            Tech <span className="font-display italic">mesh</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-lg">
            A living network of interconnected technologies. Search, hover, and
            explore the connections between skills.
          </p>
        </motion.div>

        {/* Search + legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: cubicEase }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 max-w-[1400px] mx-auto"
        >
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm rounded-full px-4 py-2 pl-9 border outline-none transition-all duration-200 focus:border-muted/40"
              style={{
                backgroundColor: "hsl(var(--surface))",
                borderColor: "hsl(var(--stroke))",
                color: "hsl(var(--text))",
              }}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-[10px] text-muted uppercase tracking-wider">{cat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Canvas */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: cubicEase }}
          viewport={{ once: true }}
          className="relative w-full rounded-2xl border overflow-hidden max-w-[1400px] mx-auto"
          style={{
            backgroundColor: "hsl(var(--surface) / 0.2)",
            borderColor: "hsl(var(--stroke))",
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="block"
            style={{
              width: dimensions.w,
              height: dimensions.h,
              cursor: hoveredNode ? "pointer" : "default",
            }}
          />

          {/* Tooltip */}
          {hoveredData && hoveredCat && (
            <div
              className="absolute bottom-4 left-4 rounded-xl px-4 py-3 border backdrop-blur-md pointer-events-none"
              style={{
                backgroundColor: "hsl(var(--surface) / 0.92)",
                borderColor: hoveredCat.color + "40",
              }}
            >
              <p className="text-sm font-semibold" style={{ color: hoveredCat.color }}>
                {hoveredData.label}
              </p>
              <p className="text-[10px] text-muted uppercase tracking-wider mt-0.5">
                {hoveredCat.label}
              </p>
              <p className="text-[10px] text-muted mt-1">
                {connectedCount} connection{connectedCount !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* Search count */}
          {isSearching && matchingIds.length > 0 && (
            <div
              className="absolute top-4 right-4 rounded-full px-3 py-1.5 text-[11px] border backdrop-blur-md pointer-events-none"
              style={{
                backgroundColor: "hsl(var(--surface) / 0.9)",
                borderColor: "hsl(var(--stroke))",
                color: "hsl(var(--muted))",
              }}
            >
              {matchingIds.length} match{matchingIds.length !== 1 ? "es" : ""} found
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
