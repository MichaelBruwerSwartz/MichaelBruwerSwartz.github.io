import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';
import portfolioData from '../data/portfolio.json';

const Hero = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const { personal } = portfolioData;
  const fullText = personal.role;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <section className="hero section">
      <div className="hero-content">
        <motion.div
          className="code-block hero-code"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="code-line">
            <span className="line-number">1</span>
            <span><span className="code-comment">// Initialize developer</span></span>
          </div>
          <div className="code-line">
            <span className="line-number">2</span>
            <span><span className="code-keyword">class</span> <span className="code-function">Developer</span> {'{'}</span>
          </div>
          <div className="code-line indent-1">
            <span className="line-number">3</span>
            <span><span className="code-keyword">constructor</span>() {'{'}</span>
          </div>
          <div className="code-line indent-2">
            <span className="line-number">4</span>
            <span><span className="code-keyword">this</span>.name = <span className="code-string">"{personal.name}"</span>;</span>
          </div>
          <div className="code-line indent-2">
            <span className="line-number">5</span>
            <span>
              <span className="code-keyword">this</span>.role = <span className="code-string">"{text}"</span>
              {showCursor && <span className="cursor">|</span>}
            </span>
          </div>
          <div className="code-line indent-2">
            <span className="line-number">6</span>
            <span><span className="code-keyword">this</span>.location = <span className="code-string">"{personal.location}"</span>;</span>
          </div>
          <div className="code-line indent-2">
            <span className="line-number">7</span>
            <span><span className="code-keyword">this</span>.passionate = <span className="code-keyword">true</span>;</span>
          </div>
          <div className="code-line indent-1">
            <span className="line-number">8</span>
            <span>{'}'}</span>
          </div>
          <div className="code-line">
            <span className="line-number">9</span>
            <span>{'}'}</span>
          </div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <p>scroll down</p>
        </motion.div>
      </div>

      <div className="hero-bg-text">
        <span className="bg-text-line">{'{'}</span>
        <span className="bg-text-line">  "developer": "{personal.name}",</span>
        <span className="bg-text-line">  "status": "compiling dreams into reality"</span>
        <span className="bg-text-line">{'}'}</span>
      </div>
    </section>
  );
};

export default Hero;
