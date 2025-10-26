import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/Contact.css';
import portfolioData from '../data/portfolio.json';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { personal } = portfolioData;

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="code-keyword">function</span> <span className="code-function">getInTouch</span>() {'{'}
            <span className="code-comment">{' /* Let\'s connect! */'}</span>
            {'}'}
          </h2>

          <div className="contact-content">
            <div className="code-block">
              <div className="code-line">
                <span className="line-number">1</span>
                <span><span className="code-keyword">const</span> contact = {'{'}</span>
              </div>
              <div className="code-line indent-1">
                <span className="line-number">2</span>
                <span>email: <span className="code-string">"{personal.email}"</span>,</span>
              </div>
              <div className="code-line indent-1">
                <span className="line-number">3</span>
                <span>github: <span className="code-string">"{personal.github}"</span>,</span>
              </div>
              <div className="code-line indent-1">
                <span className="line-number">4</span>
                <span>location: <span className="code-string">"{personal.location}"</span>,</span>
              </div>
              <div className="code-line indent-1">
                <span className="line-number">5</span>
                <span>available: <span className="code-keyword">true</span></span>
              </div>
              <div className="code-line">
                <span className="line-number">6</span>
                <span>{'};'}</span>
              </div>
            </div>

            <div className="contact-links">
              <a 
                href={`mailto:${personal.email}`} 
                className="contact-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Email Me</span>
              </a>

              <a 
                href={`https://github.com/${personal.github}`} 
                className="contact-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div className="footer">
            <p className="code-comment">
              {'// Built with React by ' + personal.name}
            </p>
            <p className="code-comment">
              {'// © 2025 - Compiling dreams into reality'}
            </p>
            <p className="terminal-hint">
              <span className="hint-icon">💡</span>
              Press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> to open terminal mode
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
