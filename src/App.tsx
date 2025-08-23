import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './router'
import Scanlines from './components/Scanlines'

function App() {
  return (
    <Router>
      <div className="terminal-window">
        <header className="terminal-header">
          <div className="terminal-title">GDG TERMINAL</div>
          <div className="terminal-meta">
            <span>BUILD: 0.0.1</span>
            <span>STATUS: ONLINE</span>
            <span>TIME: [LIVE]</span>
          </div>
        </header>
        
        <main className="terminal-content">
          <AppRoutes />
        </main>
        
        <footer className="terminal-footer">
          <pre className="mono">
{`[SYSTEM] [READY] [AUTH] [SCAN] [VAULT] [LOG]`}
          </pre>
        </footer>
      </div>
      <Scanlines />
    </Router>
  )
}

export default App
