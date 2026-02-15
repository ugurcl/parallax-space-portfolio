import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "../data";
import "../styles/skills.css";

const categoryIcons: Record<string, string> = {
  language: "\u{1F4DD}",
  frontend: "\u{1F3A8}",
  backend: "\u{2699}\u{FE0F}",
  database: "\u{1F4BE}",
  devops: "\u{1F680}",
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
      <span className="skill-icon">{categoryIcons[skill.category] || "\u{1F4A1}"}</span>
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
