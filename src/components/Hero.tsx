import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "../data";
import "../styles/hero.css";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const greetingY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const greetingX = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const nameScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleX = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orb1X = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orb2X = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Geometric shapes parallax
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const ringY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const squareRotate = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const squareY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const triangleY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const crossY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const crossRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-floating-element hero-orb-1" style={{ y: orb1Y, x: orb1X }} />
      <motion.div className="hero-floating-element hero-orb-2" style={{ y: orb2Y, x: orb2X }} />

      {/* Floating geometric shapes */}
      <motion.div
        className="hero-shape hero-shape-ring"
        style={{ y: ringY, rotate: ringRotate }}
      />
      <motion.div
        className="hero-shape hero-shape-square"
        style={{ y: squareY, rotate: squareRotate }}
      />
      <motion.div
        className="hero-shape hero-shape-triangle"
        style={{ y: triangleY }}
      />
      <motion.div
        className="hero-shape hero-shape-dots"
        style={{ y: dotsY }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} />
        ))}
      </motion.div>
      <motion.div
        className="hero-shape hero-shape-cross"
        style={{ y: crossY, rotate: crossRotate }}
      />

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.p
          className="hero-greeting"
          style={{ y: greetingY, x: greetingX }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="hero-name"
          style={{ y: nameY, scale: nameScale }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          className="hero-title"
          style={{ y: titleY, x: titleX }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {personalInfo.title}
        </motion.p>

        <motion.div
          className="hero-cta-group"
          style={{ y: ctaY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#projects" className="hero-cta hero-cta-primary">
            View My Work
          </a>
          <a href="#contact" className="hero-cta hero-cta-secondary">
            Get In Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div className="hero-scroll-indicator" style={{ opacity }}>
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}
