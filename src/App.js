import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CodeRain from './components/CodeRain';
import Terminal from './components/Terminal';
import './styles/App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [compiling, setCompiling] = useState(true);
  const [terminalMode, setTerminalMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompiling(false);
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle Ctrl+Alt+T to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key === 't') {
        e.preventDefault();
        setTerminalMode(prev => !prev);
      }
      // ESC to close terminal
      if (e.key === 'Escape' && terminalMode) {
        setTerminalMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalMode]);

  const handleExitTerminal = (section) => {
    setTerminalMode(false);
    
    // Scroll to the section after a short delay to ensure DOM is ready
    if (section && section !== 'home') {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Scroll to top for home
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  if (loading) {
    return (
      <div className="compiler-loading">
        <div className="loading-content">
          <pre className="ascii-art">
{`
███╗   ███╗███████╗
████╗ ████║██╔════╝
██╔████╔██║███████╗
██║╚██╔╝██║╚════██║
██║ ╚═╝ ██║███████║
╚═╝     ╚═╝╚══════╝
`}
          </pre>
          <div className="compilation-output">
            <p className="compile-line">
              <span className="prompt">$</span> gcc -o portfolio main.c
            </p>
            {compiling && (
              <>
                <p className="compile-line fade-in">Compiling components...</p>
                <p className="compile-line fade-in delay-1">Linking dependencies...</p>
                <p className="compile-line fade-in delay-2">Optimizing bundles...</p>
                <p className="compile-line fade-in delay-3 success">✓ Build successful!</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (terminalMode) {
    return (
      <div className="App terminal-view">
        <Terminal onExit={handleExitTerminal} />
      </div>
    );
  }

  return (
    <div className="App">
      <CodeRain />
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      
      {/* Terminal Icon in bottom-left */}
      <div 
        className="terminal-icon" 
        onClick={() => setTerminalMode(true)}
        title="Open Terminal (Ctrl+Alt+T)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
      </div>
    </div>
  );
}

export default App;
