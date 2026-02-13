import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { skills } from "../data";
import "../styles/skills.css";

export default function Skills() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">Skills & Tools</h2>
          <p className="section-subtitle">Technologies I work with daily</p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={inView} scrollProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  index,
  inView,
  scrollProgress,
}: {
  skill: (typeof skills)[0];
  index: number;
  inView: boolean;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const direction = index % 2 === 0 ? 1 : -1;
  const y = useTransform(scrollProgress, [0, 1], [direction * 30, direction * -30]);

  return (
    <motion.div
      className="skill-card"
      style={{ y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <div className="skill-name">{skill.name}</div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.06, ease: "easeOut" }}
        />
      </div>
      <div className="skill-level">{skill.level}%</div>
    </motion.div>
  );
}
