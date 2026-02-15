import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseGlow() {
  const visibleRef = useRef(false);
  const springConfig = { damping: 30, stiffness: 150, restDelta: 0.5 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);
  const opacity = useMotionValue(0);

  useEffect(() => {
    let rafId = 0;
    let mx = 0;
    let my = 0;
    let needsUpdate = false;

    const update = () => {
      if (needsUpdate) {
        x.set(mx);
        y.set(my);
        needsUpdate = false;
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    const handleMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      needsUpdate = true;
      if (!visibleRef.current) {
        visibleRef.current = true;
        opacity.set(1);
      }
    };

    const handleLeave = () => {
      visibleRef.current = false;
      opacity.set(0);
    };
    const handleEnter = () => {
      visibleRef.current = true;
      opacity.set(1);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [x, y, opacity]);

  return (
    <motion.div
      style={{
        x,
        y,
        opacity,
        position: "fixed",
        top: -200,
        left: -200,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
        willChange: "transform",
      }}
    />
  );
}
