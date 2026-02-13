import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function MouseGlow() {
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [x, y, visible]);

  return (
    <motion.div
      style={{
        x,
        y,
        position: "fixed",
        top: -200,
        left: -200,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
