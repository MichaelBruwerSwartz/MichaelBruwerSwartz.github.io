import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/Education.css';
import portfolioData from '../data/portfolio.json';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const education = portfolioData.education;

  return (
    <section id="education" className="education section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="code-keyword">class</span> <span className="code-function">Education</span> {'{'}
          <span className="code-comment">{'/* Academic Journey */'}</span>
          {'}'}
        </motion.h2>

        <div className="education-timeline" ref={ref}>
          {education.map((item, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="timeline-content card">
                <div className="timeline-header" style={{ borderLeftColor: item.color }}>
                  <div className="institution-logo">
                    <img src={item.image} alt={item.institution} />
                  </div>
                  <div className="institution-info">
                    <h3>{item.institution}</h3>
                    <p className="degree">{item.degree}</p>
                    <span className="year" style={{ color: item.color }}>{item.year}</span>
                  </div>
                </div>
                <div className="timeline-body">
                  <div className="code-block" data-lang="py">
                    <div className="code-line">
                      <span className="line-number">{index * 3 + 1}</span>
                      <span><span className="code-keyword">def</span> <span className="code-function">achievement</span>():</span>
                    </div>
                    <div className="code-line indent-1">
                      <span className="line-number">{index * 3 + 2}</span>
                      <span><span className="code-keyword">return</span> <span className="code-string">"{item.description}"</span></span>
                    </div>
                  </div>
                </div>
              </div>
              
              {index < education.length - 1 && (
                <div className="timeline-connector">
                  <div className="connector-line"></div>
                  <div className="connector-dot" style={{ backgroundColor: item.color }}></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
