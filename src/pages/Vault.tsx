import { useState, useEffect, useRef } from 'react'

function Vault() {
  const [showInstruction, setShowInstruction] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showError, setShowError] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  const phrases = [
    'ACCESS DENIED',
    'UNAUTHORIZED',
    'SECURITY BREACH',
    'INTRUDER DETECTED',
    'LOCKDOWN ACTIVE'
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Set up rotating phrases (only if motion is allowed)
    if (!prefersReducedMotion) {
      intervalRef.current = window.setInterval(() => {
        setCurrentPhrase(prev => (prev + 1) % phrases.length);
      }, 2000);
    }

    // Add no-glitch class to body when reduced motion is preferred
    if (prefersReducedMotion) {
      document.body.classList.add('no-glitch');
    } else {
      document.body.classList.remove('no-glitch');
    }

    // Show instruction after 5 seconds
    const instructionTimer = setTimeout(() => {
      setShowInstruction(true);
    }, 5000);

    // Define unlock function on window
    (window as any).unlock = (code: string) => {
      try {
        // Base64 decode the input
        const decoded = atob(code);
        
        if (decoded === 'eris_neon_key') {
          setIsUnlocked(true);
          console.log('VAULT UNLOCKED: Access granted to eris_neon_key');
        } else {
          // Show error shake
          setShowError(true);
          setTimeout(() => setShowError(false), 1000);
          console.log('VAULT ERROR: Invalid key provided');
        }
      } catch (error) {
        setShowError(true);
        setTimeout(() => setShowError(false), 1000);
        console.log('VAULT ERROR: Invalid base64 string');
      }
    };

    // Console hint
    console.log("AUTH CHALLENGE: run unlock('ZXJpc19uZW9uX2tleQ==')");

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearTimeout(instructionTimer);
      // Clean up window function
      delete (window as any).unlock;
      // Clean up body class
      document.body.classList.remove('no-glitch');
    };
  }, [prefersReducedMotion]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('eris_neon_key');
      console.log('Key copied to clipboard');
    } catch (err) {
      console.error('Failed to copy key');
    }
  };

  if (isUnlocked) {
    return (
      <main className="mono vault-unlocked" role="main" aria-label="Vault unlocked">
        <h1 className="glitch crt" data-text="SECRET KEY: eris_neon_key">
          SECRET KEY: eris_neon_key
        </h1>
        
        <div className="secret-key-display">
          <div className="key-container">
            <code className="secret-key">eris_neon_key</code>
            <button 
              onClick={copyToClipboard}
              className="copy-button"
              aria-label="Copy secret key to clipboard"
            >
              COPY
            </button>
          </div>
        </div>
        
        <p className="unlock-success">
          Vault access granted. The key has been revealed.
        </p>
      </main>
    );
  }

  return (
    <main className={`mono vault-locked ${showError ? 'error-shake' : ''}`} role="main" aria-label="Secure vault">
      <h1 className="glitch crt" data-text="SECURE VAULT">
        SECURE VAULT
      </h1>
      
      <p>Accessing secure storage...</p>
      
      <div className="vault-status" role="table" aria-label="Vault status information">
        <div className="status-line" role="row">
          <span className="status-label" role="cell">VAULT_STATUS:</span>
          <span className="status-value locked" role="cell">LOCKED</span>
        </div>
        <div className="status-line" role="row">
          <span className="status-label" role="cell">ACCESS_LEVEL:</span>
          <span className="status-value" role="cell">RESTRICTED</span>
        </div>
        <div className="status-line" role="row">
          <span className="status-label" role="cell">SECURITY:</span>
          <span className="status-value" role="cell">MAXIMUM</span>
        </div>
        <div className="status-line" role="row">
          <span className="status-label" role="cell">AUTH_METHOD:</span>
          <span className="status-value" role="cell">CONSOLE</span>
        </div>
      </div>

      {!prefersReducedMotion && (
        <div className="rotating-phrase" aria-live="polite" aria-label="Security status">
          <span className="phrase-text">{phrases[currentPhrase]}</span>
        </div>
      )}

      {showInstruction && (
        <div className="console-instruction" aria-live="polite">
          <p className="instruction-text">
            <span className="instruction-icon" aria-hidden="true">💻</span>
            open developer console
          </p>
        </div>
      )}
    </main>
  )
}

export default Vault
