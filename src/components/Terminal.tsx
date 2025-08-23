import { useState, useEffect, useRef } from 'react'
import { runCommand } from '../lib/terminal'

const INTRO_TEXT = [
  'System initialized',
  'Terminal ready',
  'Type HELP for commands'
];

// Cat taunts that cycle every 5 seconds
const CAT_TAUNTS = [
  
  "404 courage not found",
  "Lmao AI is defo taking over you dumbass",
  "what did u expect ? 2+2 ",
  "give up now, pet me instead",
  " you can't make it through ",
  "nice try, human" ,


];

function Terminal() {
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [introComplete, setIntroComplete] = useState(false);
  const [currentIntroLine, setCurrentIntroLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentTaunt, setCurrentTaunt] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cycle through cat taunts every 5 seconds
  useEffect(() => {
    const tauntInterval = setInterval(() => {
      setCurrentTaunt(prev => (prev + 1) % CAT_TAUNTS.length);
    }, 5000);
    
    return () => clearInterval(tauntInterval);
  }, []);

  // Typewriter effect for intro
  useEffect(() => {
    if (prefersReducedMotion) {
      // Instant render for reduced motion
      setOutput(INTRO_TEXT);
      setIntroComplete(true);
      return;
    }

    if (currentIntroLine < INTRO_TEXT.length) {
      const currentLine = INTRO_TEXT[currentIntroLine];
      
      if (currentChar < currentLine.length) {
        const timer = setTimeout(() => {
          setCurrentChar(currentChar + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        // Move to next line
        const timer = setTimeout(() => {
          setOutput(prev => [...prev, currentLine]);
          setCurrentIntroLine(currentIntroLine + 1);
          setCurrentChar(0);
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
      setIntroComplete(true);
    }
  }, [currentIntroLine, currentChar, prefersReducedMotion]);

  // Add no-glitch class to body when reduced motion is preferred
  useEffect(() => {
    if (prefersReducedMotion) {
      document.body.classList.add('no-glitch');
    } else {
      document.body.classList.remove('no-glitch');
    }

    return () => {
      document.body.classList.remove('no-glitch');
    };
  }, [prefersReducedMotion]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input when intro is complete
  useEffect(() => {
    if (introComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [introComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    
    if (!cmd) return;

    // Add to history
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add command to output
    setOutput(prev => [...prev, `$ ${cmd}`]);

    // Handle CLEAR command locally
    if (cmd.toUpperCase() === 'CLEAR') {
      setOutput([]);
      setInput('');
      return;
    }

    // Run command and add output
    const result = runCommand(cmd);
    setOutput(prev => [...prev, ...result, '']);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  const getCurrentTypingLine = () => {
    if (introComplete || prefersReducedMotion) return '';
    if (currentIntroLine < INTRO_TEXT.length) {
      return INTRO_TEXT[currentIntroLine].substring(0, currentChar);
    }
    return '';
  };

  return (
    <div className="terminal-component">
      <div className="terminal-output" ref={outputRef}>
        {output.map((line, index) => (
          <div key={index} className="output-line">
            {line}
          </div>
        ))}
        {!prefersReducedMotion && !introComplete && (
          <div className="output-line typing-line">
            {getCurrentTypingLine()}
            <span className="cursor">█</span>
          </div>
        )}
      </div>
      
      {introComplete && (
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <div className="terminal-prompt">
            <span className="prompt-symbol">$</span>
                               <input
                     ref={inputRef}
                     type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     onKeyDown={handleKeyDown}
                     className="terminal-input"
                     placeholder="Enter command..."
                     autoComplete="off"
                     spellCheck="false"
                     aria-label="Terminal command input"
                     role="textbox"
                   />
          </div>
        </form>
      )}
      
      {/* Pixel Art Cat Companion */}
      <div className="pixel-cat">
        <div className="cat-ascii">
          {`   .--.  
  |o_o | 
  |:_/ | 
 //   \ \ 
(|     | )
/'\_   _/'\
\___)=(___/`}
  
        </div>
        <div className="cat-speech">
          {CAT_TAUNTS[currentTaunt]}
        </div>
      </div>
    </div>
  )
}

export default Terminal
