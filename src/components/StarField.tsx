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

function createStars(count: number, canvas: HTMLCanvasElement, speedRange: [number, number], sizeRange: [number, number]): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 3,
    radius: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    opacity: 0.3 + Math.random() * 0.7,
    speed: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
    twinkleSpeed: 0.005 + Math.random() * 0.02,
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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const farStars = createStars(200, canvas, [0.15, 0.3], [0.5, 1]);
    const midStars = createStars(100, canvas, [0.4, 0.7], [1, 1.8]);
    const nearStars = createStars(40, canvas, [0.8, 1.2], [1.5, 2.5]);

    const nebulae = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 2,
      radius: 150 + Math.random() * 250,
      color: Math.random() > 0.5 ? "99, 102, 241" : "139, 92, 246",
      opacity: 0.015 + Math.random() * 0.025,
      speed: 0.1 + Math.random() * 0.15,
    }));

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resize);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;
      const scroll = scrollRef.current;

      nebulae.forEach((n) => {
        const y = n.y - scroll * n.speed;
        const gradient = ctx.createRadialGradient(n.x, y, 0, n.x, y, n.radius);
        gradient.addColorStop(0, `rgba(${n.color}, ${n.opacity})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(n.x - n.radius, y - n.radius, n.radius * 2, n.radius * 2);
      });

      const drawStars = (stars: Star[], layerSpeed: number) => {
        stars.forEach((star) => {
          const y = (star.y - scroll * star.speed * layerSpeed) % (canvas.height * 3);
          const adjustedY = y < -10 ? y + canvas.height * 3 : y;
          const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
          const alpha = star.opacity * twinkle;

          ctx.beginPath();
          ctx.arc(star.x, adjustedY, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          if (star.radius > 1.5) {
            const glow = ctx.createRadialGradient(star.x, adjustedY, 0, star.x, adjustedY, star.radius * 3);
            glow.addColorStop(0, `rgba(200, 210, 255, ${alpha * 0.3})`);
            glow.addColorStop(1, "rgba(200, 210, 255, 0)");
            ctx.fillStyle = glow;
            ctx.fillRect(star.x - star.radius * 3, adjustedY - star.radius * 3, star.radius * 6, star.radius * 6);
          }
        });
      };

      drawStars(farStars, 0.3);
      drawStars(midStars, 0.6);
      drawStars(nearStars, 1);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
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
      }}
    />
  );
}
