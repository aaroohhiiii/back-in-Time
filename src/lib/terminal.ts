

// import { useRef } from "react";
let firedConfetti = false ; // prevent duplicate pops
const prefersReducedMotion = window
.matchMedia("(prefers-reduced-motion: reduce)")
.matches;

async function fireRetroConfetti() {
    if (prefersReducedMotion || firedConfetti) return;
    firedConfetti = true;

    const { default: confetti } = await import("canvas-confetti");

    const colors = ["#39FF14", "#00C2FF", "#FF00A0", "#7A00FF", "#FFFFFF"];
    const base = {
      colors,
      scalar: 0.9,
      ticks: 200,
      spread: 60,
      startVelocity: 45,
      gravity: 0.9,
      origin: { y: 0.4 },
    };

    
    confetti({ ...base, particleCount: 90 });
   
    confetti({ ...base, particleCount: 45, angle: 60, origin: { x: 0, y: 0.6 } });
    confetti({ ...base, particleCount: 45, angle: 120, origin: { x: 1, y: 0.6 } });
    // spicy tail
    setTimeout(() => confetti({ ...base, particleCount: 35, spread: 88, startVelocity: 55 }), 180);
  }
  // 



const THEME_COLORS = [
  'var(--electric-blue)', 
  'var(--magenta)',
  'var(--cyber-purple)',
  'var(--neon-green)',
];

let currentThemeIndex = 0;


function cycleTheme(): string {
  currentThemeIndex = (currentThemeIndex + 1) % THEME_COLORS.length;
  const newColor = THEME_COLORS[currentThemeIndex];
  
  document.documentElement.style.setProperty('--accent', newColor);
  
  const colorNames = ['electric-blue',  'magenta','cyber-purple','neon-green', ];
  return `Theme changed to: ${colorNames[currentThemeIndex]}`;
}


export function runCommand(cmd: string): string[] {
  const command = cmd.trim().toUpperCase();
  
  switch (command) {
    case 'HELP':
      return [
        'Available commands:',
        '  HELP     - Show this help message',
        '  ABOUT    - System information',
        '  CONTACT  - Contact information',
        '  STATUS   - System status',
        '  THEME    - Cycle accent colors',
        '  CLEAR    - Clear terminal',
        '  CREEP - Activate just the right     background music ',
        
      ];
      
    case 'ABOUT':
      return [
        'sudo/dev/crash v0.0.1',
        'React + Vite + TypeScript',
        'Retro-cyber interface',
        'Built for exploration and discovery'
      ];
      
    case 'CONTACT':
      return [
        'System Administrator: [CLASSIFIED]',
        'Sector: Cyberspace Division',
        'Access Level: Restricted',
        'Encryption: Quantum-secured'
      ];
      
    case 'STATUS':
      return [
        'System Status: ONLINE',
        'Security Level: MAXIMUM',
        'Uptime: 99.9%',
        'Anomalies: None detected',
        'Network: Secure tunnel active'
      ];
      
    case 'THEME':
      return [cycleTheme()];
      
    case '02_@PANDASPLIT_1234':
      fireRetroConfetti() ;
    return [
        'Way to go Champ! i hope winning tastes great!'
        ]
     case 'CREEP':
     const audio = new Audio('/creepy.mp3');
     audio.loop = true ;
     audio.play().catch(()=>{})
      return [
        'Music does sound nice !'
        ]
        
    default:
      return [`Unknown command: ${cmd}`, 'Type HELP for available commands'];
  }
}
