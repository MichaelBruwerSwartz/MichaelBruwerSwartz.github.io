import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/About.css';
import portfolioData from '../data/portfolio.json';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const { personal, stats } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            <span className="code-comment">{'/* '}</span>
            <span className="code-keyword">function</span> <span className="code-function">getAbout</span>()
            <span className="code-comment">{' */'}</span>
          </motion.h2>

          <div className="about-content">
            <motion.div className="about-image-container" variants={itemVariants}>
              <div className="code-frame">
                <div className="frame-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="image-wrapper">
                  <img 
                    src={personal.profileImage}
                    alt={personal.name}
                    className="profile-image"
                  />
                  <div className="image-overlay">
                    <span className="code-comment">// profile.jpg</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="about-text" variants={itemVariants}>
              <div className="code-block" data-lang="js">
                <div className="code-line">
                  <span className="line-number">1</span>
                  <span><span className="code-keyword">const</span> aboutMe = {'{'}</span>
                </div>
                <div className="code-line indent-1">
                  <span className="line-number">2</span>
                  <span>name: <span className="code-string">"{personal.name}"</span>,</span>
                </div>
                <div className="code-line indent-1">
                  <span className="line-number">3</span>
                  <span>age: <span className="code-number">{personal.age}</span>,</span>
                </div>
                <div className="code-line indent-1">
                  <span className="line-number">4</span>
                  <span>education: <span className="code-string">"BSc Computer Science"</span>,</span>
                </div>
                <div className="code-line indent-1">
                  <span className="line-number">5</span>
                  <span>university: <span className="code-string">"University of Stellenbosch"</span>,</span>
                </div>
                <div className="code-line indent-1">
                  <span className="line-number">6</span>
                  <span>graduation: <span className="code-number">{personal.graduationYear}</span>,</span>
                </div>
                <div className="code-line indent-1">
                  <span className="line-number">7</span>
                  <span>codingSince: <span className="code-number">{personal.codingSince}</span>,</span>
                </div>
                <div className="code-line indent-1">
                  <span className="line-number">8</span>
                  <span>passion: [</span>
                </div>
                <div className="code-line indent-2">
                  <span className="line-number">9</span>
                  <span><span className="code-string">"Programming"</span>,</span>
                </div>
                <div className="code-line indent-2">
                  <span className="line-number">10</span>
                  <span><span className="code-string">"Mathematics"</span>,</span>
                </div>
                <div className="code-line indent-2">
                  <span className="line-number">11</span>
                  <span><span className="code-string">"Problem Solving"</span></span>
                </div>
                <div className="code-line indent-1">
                  <span className="line-number">12</span>
                  <span>],</span>
                </div>
                <div className="code-line indent-1">
                  <span className="line-number">13</span>
                  <span>description: <span className="code-string">"Motivated and hard-working"</span></span>
                </div>
                <div className="code-line">
                  <span className="line-number">14</span>
                  <span>{'};'}</span>
                </div>
                <div className="code-line">
                  <span className="line-number">15</span>
                  <span></span>
                </div>
                <div className="code-line">
                  <span className="line-number">16</span>
                  <span><span className="code-comment">// Always learning, always improving</span></span>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{stats.yearsCoding}</div>
                  <div className="stat-label">Years Coding</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.projectsBuilt}</div>
                  <div className="stat-label">Projects Built</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.languages}</div>
                  <div className="stat-label">Languages</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
