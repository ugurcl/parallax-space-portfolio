import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const width = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: flip ? "flex-end" : "flex-start",
        padding: "1rem 2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <motion.div
        style={{
          width,
          opacity,
          height: 1,
          background: flip
            ? "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.2))"
            : "linear-gradient(90deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.4), transparent)",
          maxWidth: 600,
        }}
      />
    </div>
  );
}
