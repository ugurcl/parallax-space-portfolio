import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "../data";
import "../styles/skills.css";

const categoryIcons: Record<string, ReactNode> = {
  language: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  frontend: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
    </svg>
  ),
  backend: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="6" cy="6" r="1" fill="currentColor" /><circle cx="6" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  database: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  devops: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

export default function Skills() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [60, 0, 0, -60]);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="container">
        <motion.div style={{ opacity: titleOpacity, y: titleY }}>
          <h2 className="section-title">Skills & Tools</h2>
          <p className="section-subtitle">Technologies I work with daily</p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} scrollProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  index,
  scrollProgress,
}: {
  skill: (typeof skills)[0];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const row = Math.floor(index / 4);
  const fromRight = row % 2 === 0;
  const stagger = (index % 4) * 0.02;

  const x = useTransform(
    scrollProgress,
    [0 + stagger, 0.25 + stagger, 0.7 - stagger, 0.95 - stagger],
    fromRight ? [300, 0, 0, 300] : [-300, 0, 0, -300]
  );
  const opacity = useTransform(
    scrollProgress,
    [0 + stagger, 0.25 + stagger, 0.7 - stagger, 0.95 - stagger],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollProgress, [0, 1], [index % 2 === 0 ? 30 : -30, index % 2 === 0 ? -30 : 30]);
  const barWidth = useTransform(scrollProgress, [0.15, 0.4], [0, skill.level]);

  return (
    <motion.div className="skill-card" style={{ x, y, opacity }}>
      <span className="skill-icon">{categoryIcons[skill.category]}</span>
      <div className="skill-name">{skill.name}</div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{ width: useTransform(barWidth, (v) => `${v}%`) }}
        />
      </div>
      <div className="skill-level">{skill.level}%</div>
    </motion.div>
  );
}
