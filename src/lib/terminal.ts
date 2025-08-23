// Available theme colors
const THEME_COLORS = [
  'var(--neon-green)',
  'var(--electric-blue)', 
  'var(--magenta)',
  'var(--cyber-purple)'
];

let currentThemeIndex = 0;

// Cycle through theme colors and update CSS variable
function cycleTheme(): string {
  currentThemeIndex = (currentThemeIndex + 1) % THEME_COLORS.length;
  const newColor = THEME_COLORS[currentThemeIndex];
  
  // Update CSS custom property
  document.documentElement.style.setProperty('--accent', newColor);
  
  const colorNames = ['neon-green', 'electric-blue', 'magenta', 'cyber-purple'];
  return `Theme changed to: ${colorNames[currentThemeIndex]}`;
}

// Main command parser
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
        '',
        'Further diagnostics: view-source & /logs'
      ];
      
    case 'ABOUT':
      return [
        'GDG Terminal System v0.0.1',
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
      
    default:
      return [`Unknown command: ${cmd}`, 'Type HELP for available commands'];
  }
}
