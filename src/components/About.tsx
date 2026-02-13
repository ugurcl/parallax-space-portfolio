import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ParallaxWrapper from "./ParallaxWrapper";
import { aboutText } from "../data";
import "../styles/about.css";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">A glimpse into who I am and what drives me</p>
        </motion.div>

        <div className="about-grid">
          <ParallaxWrapper speed={0.3} direction="down">
            <div className="about-visual">
              <div className="about-orbit">
                <div className="about-orbit-dot" />
                <div className="about-orbit-dot" />
                <div className="about-orbit-dot" />
                <div className="about-orbit-inner">
                  <div className="about-orbit-core" />
                </div>
              </div>
            </div>
          </ParallaxWrapper>

          <ParallaxWrapper speed={0.15}>
            <div className="about-text-block">
              {aboutText.map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                >
                  {text}
                </motion.p>
              ))}

              <motion.div
                className="about-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
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
          </ParallaxWrapper>
        </div>
      </div>
    </section>
  );
}
