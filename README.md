# Back-In-Time

A retro-cyberpunk terminal interface built with React, Vite, and TypeScript. Features a console-based unlock system,  and a fully accessible design system. THE cute little videos enhance the visual effects of the interface.

## 🎨 Design System

### Color Tokens
```css
:root {
  --bg: #0a0a0a;           /* Deep black background */
  --fg: #d9ffe1;           /* Soft mint foreground */
  --neon-green: #39FF14;   /* Primary neon accent */
  --electric-blue: #00C2FF; /* Secondary accent */
  --magenta: #FF00A0;      /* Tertiary accent */
  --cyber-purple: #7A00FF; /* Quaternary accent */
  --accent: var(--neon-green); /* Dynamic accent color */
  --scanline-opacity: 0.08;   /* CRT scanline intensity */
}
```

### Typography
- **Primary**: `'Share Tech Mono'` - Clean, readable monospace
- **Fallback**: `'VT323'` - Retro terminal aesthetic
- **System**: `ui-monospace, monospace` - Native fallbacks

### Visual Effects
- **Glitch**: RGB split with animated clipping masks
- **Scanlines**: Horizontal CRT-style overlay
- **Flicker**: Random opacity variations
- **Glyph Pulse**: Animated status indicators
- **Error Shake**: Horizontal shake for validation failures

## 🔐 Secret Key Methodology

### The Three-Step Process
1. **intial Anomaly** : Hover your the vudeos to discover first hint.
1. **Discovery**: Navigate to `/logs?filter=cypher` to find the breadcrumb
2. **Console Access**: Open browser developer console (F12)
3. **Unlock**: Execute `unlock('ZXJpc19uZW9uX2tleQ==')` in the console

### Difficulty Knobs
- **Easy**: Direct console hint in `/vault` page
- **Medium**: HTML source comment in `index.html`
- **Hard**: decoding 'Ctrl + O' hint 


### Testing with Peers Checklist
- [ ] Can navigate to `/logs?filter=cypher` independently
- [ ] Understands the breadcrumb trail concept
- [ ] Can open developer console (F12)
- [ ] Executes the unlock command correctly
- [ ] Sees the vault unlock sequence
- [ ] Can copy the revealed key to clipboard

## ♿ Accessibility Features

### WCAG AA Compliance
- **Contrast**: High contrast neon colors on black background
- **Focus States**: Visible neon outlines for all interactive elements
- **Screen Readers**: Proper ARIA labels, roles, and live regions
- **Keyboard Navigation**: Full keyboard support with focus trapping

### Reduced Motion Support
- **`.no-glitch` Class**: Automatically applied when `prefers-reduced-motion` is set
- **Instant Rendering**: Typewriter effects become instant

- **Performance**: Smooth experience for motion-sensitive users

### Semantic Structure
- **Landmarks**: Proper `<main>`, `<aside>`, `<header>`, `<footer>` usage
- **Table Roles**: Log entries use proper table semantics
- **Live Regions**: Dynamic content updates are announced
- **Hidden Elements**: Decorative content marked with `aria-hidden="true"`

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd gdg

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment
- **Port**: Default Vite port (usually 5173)
- **Browser**: Modern browsers with ES6+ support
- **Console**: Developer tools required for unlock functionality

## 🌐 Deployment

### Static Hosting
```bash
# Build the project
npm run build

# Deploy dist/ folder to your hosting service
# Examples: Netlify, Vercel, GitHub Pages, AWS S3
```

### Server Configuration
- **SPA Routing**: Configure server to serve `index.html` for all routes
- **404 Handling**: Custom 404 page included in `public/404.html`
- **Caching**: Static assets can be aggressively cached

### Build Output
- **Bundle Size**: < 300KB total (no heavy fonts or external libraries)
- **Assets**: Optimized CSS and JavaScript
- **Performance**: Lighthouse score 90+ on all metrics

## 🔍 Easter Eggs & Secrets

### Video Code

- **Trigger**: Works from anywhere in the app
- **Reward**: Modal revealing the breadcrumb trail

### Source Code Secrets
- **HTML Comment**: Hidden trace in `index.html`
- **Robots.txt**: Breadcrumb reference for crawlers
- **Console Hints**: Multiple layers of discovery

### Breadcrumb Trail
```
/logs → ?filter=cypher → /vault → console unlock
```


### Console Integration
The unlock system is designed to work seamlessly with browser developer tools, encouraging users to explore and understand web technologies while solving the puzzle.

### Performance Considerations
- No external font loading
- CSS-only animations with hardware acceleration
- Efficient state management with React hooks
- Minimal bundle size for fast loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test accessibility and performance
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Remember**: The real unlock is in `/vault`, not in the 404 page! The 404 is just a decoy to keep you exploring. 🕵️‍♂️

