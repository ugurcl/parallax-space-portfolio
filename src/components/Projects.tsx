import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "../data";
import "../styles/projects.css";

export default function Projects() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [60, 0, 0, -60]);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="container">
        <motion.div style={{ opacity: titleOpacity, y: titleY }}>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Some things I've built recently</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} scrollProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  scrollProgress,
}: {
  project: (typeof projects)[0];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const fromLeft = index % 2 === 0;
  const stagger = index * 0.03;

  const x = useTransform(
    scrollProgress,
    [0.05 + stagger, 0.25 + stagger, 0.65 - stagger, 0.9 - stagger],
    fromLeft ? [-400, 0, 0, -400] : [400, 0, 0, 400]
  );
  const opacity = useTransform(
    scrollProgress,
    [0.05 + stagger, 0.25 + stagger, 0.65 - stagger, 0.9 - stagger],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollProgress, [0, 1], [index % 2 === 0 ? 50 : -50, index % 2 === 0 ? -50 : 50]);
  const rotate = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [fromLeft ? -3 : 3, 0, 0, fromLeft ? -3 : 3]);

  const icons = [
    <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
    <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
    <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 20V10M18 20V4M6 20v-4" /></svg>,
  ];

  return (
    <motion.div className="project-card" style={{ x, y, opacity, rotate }}>
      <div className="project-header">
        <div className="project-icon">{icons[index % 4]}</div>
        <div className="project-links">
          <a href={project.github} className="project-link" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          </a>
          <a href={project.live} className="project-link" aria-label="Live Demo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
          </a>
        </div>
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>

      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t} className="project-tech-tag">{t}</span>
        ))}
      </div>
    </motion.div>
  );
}
