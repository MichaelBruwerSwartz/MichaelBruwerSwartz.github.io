import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/Skills.css';
import portfolioData from '../data/portfolio.json';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skills = portfolioData.skills;

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <span className="code-comment">{'// '}</span>
          <span className="code-keyword">import</span> skills <span className="code-keyword">from</span> <span className="code-string">'./expertise'</span>;
        </motion.h2>

        <div className="skills-grid" ref={ref}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="skill-header">
                <div className="skill-icon">{skill.icon}</div>
                <h3 className="skill-name">{skill.name}</h3>
              </div>

              <div className="skill-code">
                <div className="code-line">
                  <span><span className="code-keyword">const</span> {skill.name.toLowerCase().replace(/[\/\s]/g, '')} = {'{'}</span>
                </div>
                <div className="code-line indent-1">
                  <span>experience: <span className="code-number">{skill.years}</span> years,</span>
                </div>
                <div className="code-line indent-1">
                  <span>projects: <span className="code-number">{skill.projects}</span></span>
                </div>
                <div className="code-line">
                  <span>{'};'}</span>
                </div>
              </div>

              {hoveredSkill === skill.name && (
                <motion.div
                  className="skill-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ borderColor: skill.color }}
                >
                  <p className="code-comment">// Click to view projects</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="skills-summary code-block"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="code-line">
            <span className="line-number">1</span>
            <span><span className="code-comment">// Total Stack Overview</span></span>
          </div>
          <div className="code-line">
            <span className="line-number">2</span>
            <span><span className="code-keyword">const</span> techStack = {'{'}</span>
          </div>
          <div className="code-line indent-1">
            <span className="line-number">3</span>
            <span>frontend: [<span className="code-string">'React'</span>, <span className="code-string">'HTML'</span>, <span className="code-string">'CSS'</span>, <span className="code-string">'JavaScript'</span>],</span>
          </div>
          <div className="code-line indent-1">
            <span className="line-number">4</span>
            <span>backend: [<span className="code-string">'Python'</span>, <span className="code-string">'Java'</span>],</span>
          </div>
          <div className="code-line indent-1">
            <span className="line-number">5</span>
            <span>tools: [<span className="code-string">'Git'</span>, <span className="code-string">'VS Code'</span>, <span className="code-string">'PyGame'</span>],</span>
          </div>
          <div className="code-line indent-1">
            <span className="line-number">6</span>
            <span>learning: [<span className="code-string">'Node.js'</span>, <span className="code-string">'MongoDB'</span>, <span className="code-string">'TypeScript'</span>]</span>
          </div>
          <div className="code-line">
            <span className="line-number">7</span>
            <span>{'};'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
