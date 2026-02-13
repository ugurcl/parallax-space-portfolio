import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { aboutText } from "../data";
import "../styles/about.css";

export default function About() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  const leftX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [-200, 0, 0, -200]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  const rightX = useTransform(scrollYProgress, [0.05, 0.3, 0.7, 0.95], [200, 0, 0, 200]);
  const rightOpacity = useTransform(scrollYProgress, [0.05, 0.3, 0.7, 0.95], [0, 1, 1, 0]);

  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const statsY = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [40, 0, 0, 40]);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <motion.div style={{ opacity: titleOpacity, y: titleY }}>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">A glimpse into who I am and what drives me</p>
        </motion.div>

        <div className="about-grid">
          <motion.div style={{ x: leftX, opacity: leftOpacity }}>
            <div className="about-visual">
              <motion.div className="about-orbit" style={{ rotate: orbitRotate }}>
                <div className="about-orbit-dot" />
                <div className="about-orbit-dot" />
                <div className="about-orbit-dot" />
                <div className="about-orbit-inner">
                  <div className="about-orbit-core" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div style={{ x: rightX, opacity: rightOpacity }}>
            <div className="about-text-block">
              {aboutText.map((text, i) => (
                <p key={i}>{text}</p>
              ))}

              <motion.div className="about-stats" style={{ y: statsY }}>
                <div className="about-stat">
                  <div className="about-stat-number">6+</div>
                  <div className="about-stat-label">Projects</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-number">2+</div>
                  <div className="about-stat-label">Years Exp</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-number">12+</div>
                  <div className="about-stat-label">Technologies</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
