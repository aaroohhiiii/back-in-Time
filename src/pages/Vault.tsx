import { useState, useEffect, useRef } from 'react'

// function Vault() {
//   const [showInstruction, setShowInstruction] = useState(false);
//   const [isUnlocked, setIsUnlocked] = useState(false);
//   const [currentPhrase, setCurrentPhrase] = useState(0);
//   const [showError, setShowError] = useState(false);
//   const intervalRef = useRef<number | null>(null);
  
//   const phrases = [
//     'ACCESS DENIED',
//     'UNAUTHORIZED',
//     'SECURITY BREACH',
//     'INTRUDER DETECTED',
//     'LOCKDOWN ACTIVE'
//   ];

//   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

//   useEffect(() => {
//     // Set up rotating phrases (only if motion is allowed)
//     if (!prefersReducedMotion) {
//       intervalRef.current = window.setInterval(() => {
//         setCurrentPhrase(prev => (prev + 1) % phrases.length);
//       }, 2000);
//     }

//     // Add no-glitch class to body when reduced motion is preferred
//     if (prefersReducedMotion) {
//       document.body.classList.add('no-glitch');
//     } else {
//       document.body.classList.remove('no-glitch');
//     }

//     // Show instruction after 5 seconds
//     const instructionTimer = setTimeout(() => {
//       setShowInstruction(true);
//     }, 5000);

//     // Define unlock function on window
//     (window as any).unlock = (code: string) => {
//       try {
//         // Base64 decode the input
//         const decoded = atob(code);
        
//         if (decoded === '') {
//           setIsUnlocked(true);
//           console.log('VAULT UNLOCKED: Access granted to ');
//         } else {
//           // Show error shake
//           setShowError(true);
//           setTimeout(() => setShowError(false), 1000);
//           console.log('VAULT ERROR: Invalid key provided');
//         }
//       } catch (error) {
//         setShowError(true);
//         setTimeout(() => setShowError(false), 1000);
//         console.log('VAULT ERROR: Invalid base64 string');
//       }
//     };

//     // Console hint
//     console.log("AUTH CHALLENGE: run unlock('ZXJpc19uZW9uX2tleQ==')");

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//       clearTimeout(instructionTimer);
//       // Clean up window function
//       delete (window as any).unlock;
//       // Clean up body class
//       document.body.classList.remove('no-glitch');
//     };
//   }, [prefersReducedMotion]);

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText('');
//       console.log('Key copied to clipboard');
//     } catch (err) {
//       console.error('Failed to copy key');
//     }
//   };

//   if (isUnlocked) {
//     return (
//       <main className="mono vault-unlocked" role="main" aria-label="Vault unlocked">
//         <h1 className="glitch crt" data-text="SECRET KEY: ">
//           SECRET KEY: 
//         </h1>
        
//         <div className="secret-key-display">
//           <div className="key-container">
//             <code className="secret-key"></code>
//             <button 
//               onClick={copyToClipboard}
//               className="copy-button"
//               aria-label="Copy secret key to clipboard"
//             >
//               COPY
//             </button>
//           </div>
//         </div>
        
//         <p className="unlock-success">
//           Vault access granted. The key has been revealed.
//         </p>
//       </main>
//     );
//   }

//   return (
//     <main className={`mono vault-locked ${showError ? 'error-shake' : ''}`} role="main" aria-label="Secure vault">
//       <h1 className="glitch crt" data-text="SECURE VAULT" style={{
//         justifyItems: 'center',
//         alignItems: 'center',
//         alignContent: 'center',
//       }}>
//         SECURE VAULT
//       </h1>
      
//       <p>Accessing secure storage...</p>
      
//       <div className="vault-status" role="table" aria-label="Vault status information">
//         <div className="status-line" role="row">
//           <span className="status-label" role="cell">VAULT_STATUS:</span>
//           <span className="status-value locked" role="cell">LOCKED</span>
//         </div>
//         <div className="status-line" role="row">
//           <span className="status-label" role="cell">ACCESS_LEVEL:</span>
//           <span className="status-value" role="cell">RESTRICTED</span>
//         </div>
//         <div className="status-line glitch" role="row">
//           <span className="status-label" role="cell">SECURITY:</span>
//           <span className="status-value" role="cell">MAXIMUM</span>
//         </div>
//         <div className="status-line" role="row">
//           <span className="status-label" role="cell">AUTH_METHOD:</span>
//           <span className="status-value" role="cell">CONSOLE</span>
//         </div>
//       </div>

//       {!prefersReducedMotion && (
//         <div className="rotating-phrase" aria-live="polite" aria-label="Security status">
//           <span className="phrase-text">{phrases[currentPhrase]}</span>
//         </div>
//       )}

//       {showInstruction && (
//         <div className="console-instruction" aria-live="polite">
//           <p className="instruction-text code-block-words">
//             <span className="instruction-icon" aria-hidden="true"></span>
//             <span>Open</span> 
//             <span>Dev</span> 
//             <span>Console</span>
//           </p>
//         </div>
//       )}
//     </main>
//   )
// }




function Vault() {
  const [showInstruction, setShowInstruction] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showError, setShowError] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const firedConfettiRef = useRef(false); // prevent duplicate pops

  const phrases = [
    "ACCESS DENIED",
    "UNAUTHORIZED",
    "SECURITY BREACH",
    "INTRUDER DETECTED",
    "LOCKDOWN ACTIVE",
  ];

  const prefersReducedMotion = window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .matches;

  // --- retro confetti helper (lazy load + reduced-motion aware) ---
  async function fireRetroConfetti() {
    if (prefersReducedMotion || firedConfettiRef.current) return;
    firedConfettiRef.current = true;

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

    // center pop
    confetti({ ...base, particleCount: 90 });
    // side bursts for funky feel
    confetti({ ...base, particleCount: 45, angle: 60, origin: { x: 0, y: 0.6 } });
    confetti({ ...base, particleCount: 45, angle: 120, origin: { x: 1, y: 0.6 } });
    // spicy tail
    setTimeout(() => confetti({ ...base, particleCount: 35, spread: 88, startVelocity: 55 }), 180);
  }
  // ----------------------------------------------------------------

  useEffect(() => {
    // rotating phrases (only if motion is allowed)
    if (!prefersReducedMotion) {
      intervalRef.current = window.setInterval(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }, 2000);
    }

    // reduced motion toggle class
    if (prefersReducedMotion) document.body.classList.add("no-glitch");
    else document.body.classList.remove("no-glitch");

    // show instruction after 5s
    const instructionTimer = setTimeout(() => setShowInstruction(true), 5000);

    // expose unlock(code) globally
    (window as any).unlock = (code: string) => {
      try {
        if (code === "02_@pandasplit_1234") {
          setIsUnlocked(true);
          fireRetroConfetti(); // 🎉 trigger confetti on success
          console.log("VAULT UNLOCKED: Access granted to 02_@pandasplit_1234");
        } else {
          setShowError(true);
          setTimeout(() => setShowError(false), 1000);
          console.log("VAULT ERROR: Invalid key provided");
        }
      } catch {
        setShowError(true);
        setTimeout(() => setShowError(false), 1000);
        console.log("VAULT ERROR: Unexpected error");
      }
    };

    // console hint
    console.log("AUTH CHALLENGE: run unlock('02_@pandasplit_1234')");

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(instructionTimer);
      delete (window as any).unlock;
      document.body.classList.remove("no-glitch");
    };
  }, [prefersReducedMotion]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("02_@pandasplit_1234");
      console.log("Key copied to clipboard");
    } catch {
      console.error("Failed to copy key");
    }
  };

  if (isUnlocked) {
    return (
      <main className="mono vault-unlocked" role="main" aria-label="Vault unlocked">
        <h1 className="glitch crt" data-text="SECRET KEY: 02_@pandasplit_1234">
          SECRET KEY: 02_@pandasplit_1234
        </h1>

        <div className="secret-key-display">
          <div className="key-container">
            <code className="secret-key">02_@pandasplit_1234</code>
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

  // locked state UI
  return (
    <main
      className={`mono vault-locked ${showError ? "shake" : ""}`}
      role="main"
      aria-label="Vault locked"
    >
      <h1 className="glitch crt" data-text={phrases[currentPhrase]}>
        {phrases[currentPhrase]}
      </h1>

      {showInstruction && (
        <p className="instruction">AUTH CHALLENGE: run unlock('02_@pandasplit_1234')</p>
      )}
    </main>
  );
}

export default Vault;



