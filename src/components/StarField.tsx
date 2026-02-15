import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

function createStars(count: number, w: number, h: number, speedRange: [number, number], sizeRange: [number, number]): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h * 3,
    radius: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    opacity: 0.3 + Math.random() * 0.7,
    speed: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
    twinkleSpeed: 0.005 + Math.random() * 0.015,
    twinkleOffset: Math.random() * Math.PI * 2,
  }));
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Use device pixel ratio for crisp rendering but cap at 1 for perf
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Reduced star counts
    const farStars = createStars(120, w, h, [0.15, 0.3], [0.5, 1]);
    const midStars = createStars(60, w, h, [0.4, 0.7], [1, 1.6]);
    const nearStars = createStars(25, w, h, [0.8, 1.2], [1.5, 2.2]);

    // Reduced nebulae count
    const nebulae = Array.from({ length: 3 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h * 2,
      radius: 150 + Math.random() * 200,
      color: Math.random() > 0.5 ? "99, 102, 241" : "139, 92, 246",
      opacity: 0.015 + Math.random() * 0.02,
      speed: 0.1 + Math.random() * 0.15,
    }));

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let resizeTimer: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 200);
    };
    window.addEventListener("resize", debouncedResize);

    let time = 0;
    // Throttle to ~30fps instead of 60fps
    let lastFrame = 0;
    const FRAME_INTERVAL = 1000 / 30;

    const animate = (timestamp: number) => {
      frameRef.current = requestAnimationFrame(animate);

      const delta = timestamp - lastFrame;
      if (delta < FRAME_INTERVAL) return;
      lastFrame = timestamp - (delta % FRAME_INTERVAL);

      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      ctx.clearRect(0, 0, cw, ch);
      time += 1;
      const scroll = scrollRef.current;

      // Draw nebulae
      for (let i = 0; i < nebulae.length; i++) {
        const n = nebulae[i];
        const ny = n.y - scroll * n.speed;
        // Skip if off screen
        if (ny + n.radius < 0 || ny - n.radius > ch) continue;
        const gradient = ctx.createRadialGradient(n.x, ny, 0, n.x, ny, n.radius);
        gradient.addColorStop(0, `rgba(${n.color}, ${n.opacity})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(n.x - n.radius, ny - n.radius, n.radius * 2, n.radius * 2);
      }

      // Batch draw stars by layer
      const drawStars = (stars: Star[], layerSpeed: number) => {
        ctx.beginPath();
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const sy = (star.y - scroll * star.speed * layerSpeed) % (ch * 3);
          const adjustedY = sy < -10 ? sy + ch * 3 : sy;

          // Skip off-screen stars
          if (adjustedY < -5 || adjustedY > ch + 5) continue;

          const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
          const alpha = star.opacity * twinkle;

          // Simple circle — skip expensive glow for perf
          ctx.moveTo(star.x + star.radius, adjustedY);
          ctx.arc(star.x, adjustedY, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
          ctx.beginPath();
        }
      };

      drawStars(farStars, 0.3);
      drawStars(midStars, 0.6);
      drawStars(nearStars, 1);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
