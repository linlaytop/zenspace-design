import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  exploded: boolean;
  particles: Particle[];
  color: string;
}

const COLORS = [
  "#facc15", "#f59e0b", "#06b6d4", "#10b981", "#3b82f6",
  "#fbbf24", "#34d399", "#22d3ee", "#a78bfa"
];

export default function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const frameRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const createFirework = (): Firework => {
      const w = canvas.width;
      const h = canvas.height;
      const x = Math.random() * w * 0.8 + w * 0.1;
      const targetY = Math.random() * h * 0.3 + h * 0.1;
      return {
        x,
        y: h,
        targetY,
        vy: -(2 + Math.random() * 2),
        exploded: false,
        particles: [],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    };

    const explode = (fw: Firework) => {
      fw.exploded = true;
      const count = 30 + Math.floor(Math.random() * 30);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 0.5 + Math.random() * 2;
        const maxLife = 60 + Math.random() * 60;
        fw.particles.push({
          x: fw.x,
          y: fw.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
          size: 1 + Math.random() * 1.5,
          color: fw.color,
          alpha: 1,
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(7, 10, 14, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fws = fireworksRef.current;

      for (let i = fws.length - 1; i >= 0; i--) {
        const fw = fws[i];

        if (!fw.exploded) {
          fw.y += fw.vy;
          fw.vy *= 0.99;

          // Draw rising trail
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = fw.color;
          ctx.globalAlpha = 0.8;
          ctx.fill();
          ctx.globalAlpha = 1;

          if (fw.y <= fw.targetY) {
            explode(fw);
          }
        } else {
          // Update and draw particles
          let alive = false;
          for (const p of fw.particles) {
            if (p.life <= 0) continue;
            alive = true;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.015; // gravity
            p.vx *= 0.99;
            p.life--;
            p.alpha = Math.max(0, p.life / p.maxLife) * 0.7;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
          }
          ctx.globalAlpha = 1;

          if (!alive) {
            fws.splice(i, 1);
          }
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    // Launch fireworks periodically
    const launchLoop = () => {
      if (fireworksRef.current.length < 3) {
        fireworksRef.current.push(createFirework());
      }
      timerRef.current = setTimeout(launchLoop, 1500 + Math.random() * 2500);
    };

    // Initial burst
    for (let i = 0; i < 2; i++) {
      fireworksRef.current.push(createFirework());
    }
    launchLoop();
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
