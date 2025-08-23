import { BrowserRouter as Router } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AppRoutes from './router'
import Scanlines from './components/Scanlines'
import Modal from './components/Modal'
import { registerKonamiCode } from './lib/konami'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Register Konami code listener
    const cleanup = registerKonamiCode(() => {
      setIsModalOpen(true)
    })

    // Update timestamp every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      cleanup()
      clearInterval(timeInterval)
    }
  }, [])

  return (
    <Router>
      <div className=" terminal-window" style={{gap: '10px'}}>
        <header className="terminal-header">
          <div className="terminal-title">sudo/dev/crash</div>
          <div className="terminal-meta">
            <span>BUILD: 0.0.1</span>
            <span>STATUS: ONLINE</span>
            <span>TIME: {currentTime.toLocaleTimeString()}</span>
          </div>
        </header>
        
        <main className="terminal-content">
          <AppRoutes />
        </main>
        
        <footer className="terminal-footer">
          <pre className="mono  playfair-footer outfit-footer corinthia-regular corinthia-bold quintessential-regular sarpanch-regular">
{/* {` From my keyboard to your screen — Aarohi`}
 */}
 <p className="code-block-words"  >
 
  <span>©</span>
  <span>2025</span>
  <span>Aarohi</span>
  <span>|</span>
  <span>All</span>
  <span>Rights</span>
  <span>Reserved</span>


</p>


          </pre>
          <div className="footer-ascii" aria-hidden="true">
            <pre className="ascii-art">
{}
            </pre>
          </div>
        </footer>
      </div>
      <Scanlines />
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="KONAMI CODE ACTIVATED"
      >
        <div className="konami-trail">
          <p className="trail-text">TRACE /logs → ?filter=cypher → /vault</p>
          <p className="trail-hint">Follow the breadcrumbs to unlock the vault</p>
        </div>
      </Modal>
    </Router>
  )
}

export default App
