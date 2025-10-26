import React, { useState, useEffect, useRef } from 'react';
import '../styles/Terminal.css';
import portfolioData from '../data/portfolio.json';

const Terminal = ({ onExit }) => {
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Michael Swartz - Portfolio Terminal v2.0' },
    { type: 'output', text: 'Type "help" to see available commands or "tree" to view structure' },
    { type: 'output', text: '' },
  ]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const lastTabTime = useRef(0);
  const lastTabInput = useRef('');

  // Build file system from JSON data
  const buildFileSystem = () => {
    const fs = {
      '~': {
        type: 'dir',
        contents: ['about', 'education', 'skills', 'projects', 'contact'],
      },
      '~/about': {
        type: 'file',
        content: [
          `Name: ${portfolioData.personal.name}`,
          `Age: ${portfolioData.personal.age}`,
          `Location: ${portfolioData.personal.location}`,
          `Education: BSc Computer Science, University of Stellenbosch`,
          `Expected Graduation: ${portfolioData.personal.graduationYear}`,
          `Coding Since: ${portfolioData.personal.codingSince}`,
          '',
          portfolioData.personal.description,
        ],
      },
      '~/education': {
        type: 'dir',
        contents: portfolioData.education.map(e => e.id),
      },
      '~/skills': {
        type: 'file',
        content: [
          'Programming Languages:',
          ...portfolioData.skills.map(skill => 
            `  • ${skill.name.padEnd(12)} [${'█'.repeat(Math.floor(skill.level/10))}${'░'.repeat(10-Math.floor(skill.level/10))}] ${skill.level}% - ${skill.years} years, ${skill.projects}+ projects`
          ),
          '',
          'Technologies:',
          '  Frontend: React, HTML5, CSS3, JavaScript ES6+',
          '  Backend: Python, Java',
          '  Tools: Git, VS Code, PyGame, Canvas API',
          '  Currently Learning: Node.js, MongoDB, TypeScript',
        ],
      },
      '~/projects': {
        type: 'dir',
        contents: portfolioData.projects.map(p => p.id),
      },
      '~/contact': {
        type: 'file',
        content: [
          `Email: ${portfolioData.personal.email}`,
          `GitHub: github.com/${portfolioData.personal.github}`,
          `Location: ${portfolioData.personal.location}`,
          '',
          'Available for internships and collaboration opportunities.',
        ],
      },
    };

    // Add education entries
    portfolioData.education.forEach(edu => {
      fs[`~/education/${edu.id}`] = {
        type: 'file',
        content: [
          `${edu.institution} (${edu.year})`,
          '',
          `Degree: ${edu.degree}`,
          `Description: ${edu.description}`,
          '',
          edu.details,
        ],
      };
    });

    // Add project entries
    portfolioData.projects.forEach(proj => {
      fs[`~/projects/${proj.id}`] = {
        type: 'file',
        content: [
          proj.title,
          '',
          `Language: ${proj.tech.join(', ')}`,
          `Lines of Code: ~${proj.lines}`,
          `Time: ${proj.time}`,
          '',
          `Description: ${proj.description}`,
          '',
          proj.details,
        ],
      };
    });

    return fs;
  };

  // File system structure
  const fileSystem = buildFileSystem();

  const commands = {
    help: () => [
      'Available commands:',
      '  ls             - List files in current directory',
      '  cd <dir>       - Change directory (use ".." for parent)',
      '  cat <file>     - Display file contents',
      '  open [section] - Exit terminal and view visual GUI',
      '                   Optional: specify section (about, education, skills, projects, contact)',
      '  tree           - Show directory structure',
      '  pwd            - Print working directory',
      '  clear          - Clear terminal',
      '  exit           - Exit terminal mode',
      '  whoami         - Display current user',
      '  date           - Show current date',
      '  joke           - Tell a random programming joke',
      '  help           - Show this help message',
      '',
      'Tab completion: Press Tab to autocomplete or see suggestions',
    ],
    
    ls: () => {
      const current = fileSystem[currentPath];
      if (current && current.type === 'dir') {
        return ['', ...current.contents, ''];
      }
      return ['Not a directory'];
    },
    
    pwd: () => [currentPath],
    
    open: (args) => {
      if (onExit) {
        let section = '';
        
        if (args && args[0]) {
          // User specified a section: "open about"
          section = args[0];
        } else {
          // No argument, use current path
          section = currentPath.replace('~/', '').replace('~', '');
          // If in a subdirectory, use parent (e.g., ~/projects/solitaire -> projects)
          if (section.includes('/')) {
            section = section.split('/')[0];
          }
        }
        
        onExit(section || 'home');
        return [`Opening visual GUI at section: ${section || 'home'}...`];
      }
      return ['Visual mode not available'];
    },
    
    exit: () => {
      if (onExit) {
        onExit('home');
        return ['Exiting terminal mode...'];
      }
      return ['Exit not available'];
    },
    
    tree: () => {
      const tree = [
        '~',
        '├── about                (About me)',
        '├── education/           (Academic background)',
      ];
      
      // Add education entries
      portfolioData.education.forEach((edu, idx) => {
        const isLast = idx === portfolioData.education.length - 1;
        const prefix = isLast ? '│   └──' : '│   ├──';
        tree.push(`${prefix} ${edu.id.padEnd(16)} (${edu.institution})`);
      });
      
      tree.push('├── skills               (Technical skills)');
      tree.push('├── projects/            (Portfolio projects)');
      
      // Add project entries
      portfolioData.projects.forEach((proj, idx) => {
        const isLast = idx === portfolioData.projects.length - 1;
        const prefix = isLast ? '│   └──' : '│   ├──';
        tree.push(`${prefix} ${proj.id.padEnd(20)} (${proj.title})`);
      });
      
      tree.push('└── contact              (Contact information)');
      tree.push('');
      tree.push('Use "cd <directory>" to navigate');
      tree.push('Use "cat <file>" to read contents');
      tree.push('Use "open [section]" to view in GUI');
      
      return tree;
    },
    
    cd: (args) => {
      if (!args[0]) {
        setCurrentPath('~');
        return [`Changed directory to ~`];
      }
      
      // Remove trailing slash from target
      let target = args[0].replace(/\/+$/, '');
      
      if (target === '..') {
        if (currentPath === '~') {
          return ['Already at root directory'];
        }
        // Go up one level
        const pathParts = currentPath.split('/');
        if (pathParts.length <= 2) {
          // We're at ~/something, go to ~
          setCurrentPath('~');
          return ['Changed directory to ~'];
        } else {
          // We're deeper, go up one level
          pathParts.pop();
          const newPath = pathParts.join('/');
          setCurrentPath(newPath);
          return [`Changed directory to ${newPath}`];
        }
      }
      
      if (target === '~' || target === '/' || target === '') {
        setCurrentPath('~');
        return ['Changed directory to ~'];
      }
      
      // Check if target exists
      const newPath = currentPath === '~' ? `~/${target}` : `${currentPath}/${target}`;
      
      if (fileSystem[newPath]) {
        if (fileSystem[newPath].type === 'file') {
          setCurrentPath(newPath);
          return [
            `Viewing: ${target}`,
            '',
            ...fileSystem[newPath].content,
            '',
            'Type "cd .." to go back',
          ];
        }
        setCurrentPath(newPath);
        return [`Changed directory to ${newPath}`];
      }
      
      return [`cd: ${target}: No such file or directory`, 'Use "ls" to see available directories'];
    },
    
    cat: (args) => {
      if (!args[0]) {
        return ['cat: missing file operand', 'Usage: cat <file>'];
      }
      
      const target = args[0];
      const filePath = currentPath === '~' ? `~/${target}` : `${currentPath}/${target}`;
      
      if (fileSystem[filePath] && fileSystem[filePath].type === 'file') {
        return ['', ...fileSystem[filePath].content, ''];
      }
      
      return [`cat: ${target}: No such file or directory`];
    },
    
    whoami: () => ['michael@developer'],
    
    date: () => [new Date().toLocaleString()],
    
    joke: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why did the developer go broke? Because he used up all his cache.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "Why do Java developers wear glasses? Because they don't C#.",
        "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
        "There are 10 types of people in the world: those who understand binary and those who don't.",
        "Why did the programmer quit his job? Because he didn't get arrays.",
        "What's a programmer's favorite place to hang out? The Foo Bar!",
        "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25.",
        "I would tell you a UDP joke, but you might not get it.",
        "A programmer's wife tells him: 'Run to the store and pick up a loaf of bread. If they have eggs, get a dozen.' The programmer comes home with 12 loaves of bread.",
        "Debugging: Being the detective in a crime movie where you are also the murderer.",
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return ['', randomJoke, ''];
    },
    
    clear: () => {
      setHistory([]);
      return [];
    },
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const [command, ...args] = trimmedCmd.split(' ');
    
    setHistory(prev => [...prev, { type: 'input', text: `${currentPath} $ ${cmd}` }]);

    if (trimmedCmd === '') return;

    if (commands[command]) {
      const output = commands[command](args);
      if (output.length > 0) {
        setHistory(prev => [...prev, ...output.map(text => ({ type: 'output', text }))]);
      }
    } else {
      setHistory(prev => [...prev, { 
        type: 'error', 
        text: `Command not found: ${command}`,
      }, {
        type: 'output',
        text: 'Type "help" for available commands'
      }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    }
  };

  const handleTabCompletion = () => {
    const now = Date.now();
    const isDoubleTap = (now - lastTabTime.current < 500) && (input === lastTabInput.current);
    lastTabTime.current = now;
    lastTabInput.current = input;

    const trimmedInput = input.trim();
    
    // If no input, show all commands on double tap
    if (!trimmedInput) {
      if (isDoubleTap) {
        const commandList = Object.keys(commands).join('  ');
        setHistory(prev => [...prev, 
          { type: 'input', text: `${currentPath} $ ${input}` },
          { type: 'output', text: commandList },
        ]);
      }
      return;
    }

    const parts = trimmedInput.split(' ');
    const command = parts[0];
    const hasSpace = trimmedInput.includes(' ');

    // Command completion (only command, no space yet)
    if (!hasSpace) {
      const matchingCommands = Object.keys(commands).filter(cmd => 
        cmd.startsWith(command)
      );

      if (matchingCommands.length === 1) {
        // Single match - complete it
        setInput(matchingCommands[0] + ' ');
      } else if (matchingCommands.length > 1) {
        const commonPrefix = findCommonPrefix(matchingCommands);
        if (commonPrefix.length > command.length) {
          // Complete to common prefix
          setInput(commonPrefix);
        } else if (isDoubleTap) {
          // Double tap - show all options, then redisplay prompt
          setHistory(prev => [...prev,
            { type: 'input', text: `${currentPath} $ ${input}` },
            { type: 'output', text: matchingCommands.join('  ') },
          ]);
        }
      }
      return;
    }

    // Directory/file completion for cd, cat, and open commands
    if (command === 'cd' || command === 'cat' || command === 'open') {
      // Get the part after the command
      const argsPart = trimmedInput.substring(command.length).trim();
      
      // Check if we're navigating into a subdirectory
      let targetPath = currentPath;
      let partial = argsPart;
      
      if (argsPart.includes('/')) {
        // User is typing something like "projects/s"
        const parts = argsPart.split('/');
        partial = parts[parts.length - 1]; // Get the last part (e.g., "s")
        
        // Build the path to the directory we're completing in
        const pathParts = parts.slice(0, -1); // Get all but last part (e.g., ["projects"])
        for (const part of pathParts) {
          const cleanPart = part.replace(/\/+$/, ''); // Remove trailing slashes
          if (cleanPart) {
            targetPath = targetPath === '~' ? `~/${cleanPart}` : `${targetPath}/${cleanPart}`;
          }
        }
      }
      
      const current = fileSystem[targetPath];
      if (current && current.type === 'dir') {
        const matching = current.contents.filter(item => 
          item.startsWith(partial)
        );

        if (matching.length === 1) {
          // Single match - complete it
          const item = matching[0];
          const itemPath = targetPath === '~' ? `~/${item}` : `${targetPath}/${item}`;
          const isDir = fileSystem[itemPath] && fileSystem[itemPath].type === 'dir';
          
          // Build the full completion path
          let completion;
          if (argsPart.includes('/')) {
            const pathPrefix = argsPart.substring(0, argsPart.lastIndexOf('/') + 1);
            completion = pathPrefix + item + (isDir ? '/' : '');
          } else {
            completion = item + (isDir ? '/' : '');
          }
          
          setInput(`${command} ${completion}`);
        } else if (matching.length > 1) {
          // Multiple matches
          const commonPrefix = findCommonPrefix(matching);
          
          if (commonPrefix.length > partial.length) {
            // Complete to common prefix
            let completion;
            if (argsPart.includes('/')) {
              const pathPrefix = argsPart.substring(0, argsPart.lastIndexOf('/') + 1);
              completion = pathPrefix + commonPrefix;
            } else {
              completion = commonPrefix;
            }
            setInput(`${command} ${completion}`);
          } else if (isDoubleTap) {
            // Double tap - show all matches with / for directories, then redisplay prompt
            const displayItems = matching.map(item => {
              const itemPath = targetPath === '~' ? `~/${item}` : `${targetPath}/${item}`;
              const isDir = fileSystem[itemPath] && fileSystem[itemPath].type === 'dir';
              return isDir ? `${item}/` : item;
            });
            setHistory(prev => [...prev,
              { type: 'input', text: `${currentPath} $ ${input}` },
              { type: 'output', text: displayItems.join('  ') },
            ]);
          }
        } else if (isDoubleTap && partial === '') {
          // Double tap with no partial - show all items, then redisplay prompt
          const displayItems = current.contents.map(item => {
            const itemPath = targetPath === '~' ? `~/${item}` : `${targetPath}/${item}`;
            const isDir = fileSystem[itemPath] && fileSystem[itemPath].type === 'dir';
            return isDir ? `${item}/` : item;
          });
          setHistory(prev => [...prev,
            { type: 'input', text: `${currentPath} $ ${input}` },
            { type: 'output', text: displayItems.join('  ') },
          ]);
        }
      }
    }
  };

  // Helper function to find common prefix (like Linux tab completion)
  const findCommonPrefix = (strings) => {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];
    
    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (strings[i].indexOf(prefix) !== 0) {
        prefix = prefix.slice(0, -1);
        if (prefix === '') return '';
      }
    }
    return prefix;
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when clicking anywhere in terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleMinimize = () => {
    if (onExit) {
      // Extract section from current path
      const section = currentPath.replace('~/', '').replace('~', '');
      onExit(section || 'home');
    }
  };

  return (
    <div className="terminal-container" onClick={handleTerminalClick}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="term-btn close"></span>
          <span 
            className="term-btn minimize" 
            onClick={(e) => {
              e.stopPropagation();
              handleMinimize();
            }}
            title="Toggle visual mode"
          ></span>
          <span className="term-btn maximize"></span>
        </div>
        <div className="terminal-title">michael@portfolio: {currentPath}</div>
      </div>

      <div className="terminal-body" ref={terminalRef}>
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.text}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="prompt">{currentPath} $ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
