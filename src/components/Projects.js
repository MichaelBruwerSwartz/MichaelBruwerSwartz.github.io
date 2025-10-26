import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/Projects.css';
import portfolioData from '../data/portfolio.json';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const projects = portfolioData.projects;

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <span className="code-keyword">async function</span> <span className="code-function">loadProjects</span>() {'{'}
          <span className="code-comment">{'/* Compiled Works */'}</span>
          {'}'}
        </motion.h2>

        <div className="projects-grid" ref={ref}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-overlay">
                  <div className="overlay-text">
                    <span className="code-comment">// Click to compile details</span>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className={`project-category ${project.category}`}>
                    {project.category}
                  </span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-stats">
                  <div className="stat">
                    <span className="stat-icon">📝</span>
                    <span className="stat-text">{project.lines} lines</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⏱️</span>
                    <span className="stat-text">{project.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={() => setSelectedProject(null)}>
                ✕
              </button>

              <div className="modal-body">
                <div className="modal-image">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>

                <div className="modal-info">
                  <h2>{selectedProject.title}</h2>
                  <div className="code-block" data-lang="json">
                    <div className="code-line">
                      <span className="line-number">1</span>
                      <span>{'{'}</span>
                    </div>
                    <div className="code-line indent-1">
                      <span className="line-number">2</span>
                      <span><span className="code-string">"description"</span>: <span className="code-string">"{selectedProject.description}"</span>,</span>
                    </div>
                    <div className="code-line indent-1">
                      <span className="line-number">3</span>
                      <span><span className="code-string">"technologies"</span>: [{selectedProject.tech.map((t, i) => (
                        <span key={i}><span className="code-string">"{t}"</span>{i < selectedProject.tech.length - 1 ? ', ' : ''}</span>
                      ))}],</span>
                    </div>
                    <div className="code-line indent-1">
                      <span className="line-number">4</span>
                      <span><span className="code-string">"lines"</span>: <span className="code-number">{selectedProject.lines}</span>,</span>
                    </div>
                    <div className="code-line indent-1">
                      <span className="line-number">5</span>
                      <span><span className="code-string">"time"</span>: <span className="code-string">"{selectedProject.time}"</span></span>
                    </div>
                    <div className="code-line">
                      <span className="line-number">6</span>
                      <span>{'}'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
