import Terminal from '../components/Terminal'
import StatusRail from '../components/StatusRail'

function Home() {
  return (
    <div className="home-layout">
      <div className="terminal-intro">
        <h1 className="crt">HOME TERMINAL</h1>
        <p>Welcome to the GDG system.</p>
        
        <div className="glitch" data-text="GLITCH EFFECT">
          <h2>GLITCH EFFECT</h2>
        </div>
        
        <p>Navigate using the URL bar:</p>
        <ul>
          <li><code>/logs</code> - Access system logs</li>
          <li><code>/vault</code> - Secure storage</li>
        </ul>
        
        <p className="glitch" data-text="CYBER RETRO">CYBER RETRO</p>
        
        <div className="terminal-placeholder">
          <Terminal />
        </div>
      </div>
      
      <div className="status-rail-container">
        <StatusRail />
      </div>
    </div>
  )
}

export default Home
