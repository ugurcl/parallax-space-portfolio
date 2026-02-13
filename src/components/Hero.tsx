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

  const nameY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-floating-element hero-orb-1" style={{ y: orb1Y }} />
      <motion.div className="hero-floating-element hero-orb-2" style={{ y: orb2Y }} />

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.p
          className="hero-greeting"
          style={{ y: nameY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="hero-name"
          style={{ y: nameY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          className="hero-title"
          style={{ y: titleY }}
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
