import React from 'react';
import '../styles/VisualMode.css';

const VisualMode = ({ currentPath, fileSystem, onClose }) => {
  const getCurrentContent = () => {
    const current = fileSystem[currentPath];
    
    if (!current) {
      return {
        title: 'Home',
        content: ['Welcome to my portfolio', 'Use the terminal to navigate']
      };
    }

    if (current.type === 'dir') {
      return {
        title: 'Directory',
        content: current.contents.map(item => `• ${item}`)
      };
    }

    // Get section name from path
    const section = currentPath.split('/').pop();
    return {
      title: section.charAt(0).toUpperCase() + section.slice(1),
      content: current.content
    };
  };

  const { title, content } = getCurrentContent();

  return (
    <div className="visual-mode">
      <div className="visual-header">
        <div className="terminal-buttons">
          <span className="term-btn close"></span>
          <span 
            className="term-btn minimize" 
            onClick={onClose}
            title="Return to terminal"
          ></span>
          <span className="term-btn maximize"></span>
        </div>
        <div className="visual-title">
          {currentPath} - Visual Mode
        </div>
      </div>

      <div className="visual-body">
        <div className="visual-content">
          <h1 className="visual-heading">{title}</h1>
          <div className="visual-text">
            {content.map((line, index) => (
              <p key={index} className={line === '' ? 'empty-line' : ''}>
                {line || '\u00A0'}
              </p>
            ))}
          </div>
          
          <div className="visual-hint">
            <p>Press orange button or type <code>exit</code> in terminal to return</p>
            <p>Navigate with <code>cd &lt;section&gt;</code> then <code>open</code> again</p>
          </div>
        </div>

        <div className="visual-sidebar">
          <h3>Quick Navigation</h3>
          <div className="nav-tree">
            <div className="nav-item">
              <span className="nav-icon">📁</span> ~
            </div>
            <div className="nav-item indent">
              <span className="nav-icon">📄</span> about
            </div>
            <div className="nav-item indent">
              <span className="nav-icon">📄</span> education
            </div>
            <div className="nav-item indent">
              <span className="nav-icon">📄</span> skills
            </div>
            <div className="nav-item indent">
              <span className="nav-icon">📄</span> projects
            </div>
            <div className="nav-item indent">
              <span className="nav-icon">📄</span> contact
            </div>
          </div>
          
          <div className="terminal-commands">
            <h3>Terminal Commands</h3>
            <code>cd about</code>
            <code>cat skills</code>
            <code>tree</code>
            <code>ls</code>
            <code>help</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualMode;
