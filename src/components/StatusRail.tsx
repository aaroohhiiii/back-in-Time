// function StatusRail() {
//   return (
//     <div className="status-rail" role="complementary" aria-label="System status indicators">
//       <div className="status-glyphs" aria-hidden="true">
//         <span className="glyph">■</span>
//         <span className="glyph">◆</span>
//         <span className="glyph">▣</span>
//         <span className="glyph">░</span>
//         <span className="glyph">▒</span>
//         <span className="glyph">▓</span>
//       </div>
      
//       <div className="tooltip-container" aria-hidden="true">
//         {/* Tooltips will be added here later */}
//       </div>
//     </div>
//   )
// }

// export default StatusRail
// import penguin from '../assets/penguin.png';

import { useEffect, useRef, useState } from "react";

const HINT_DELAY_MS = 1500;

export default function StatusRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);   // true while hovered or focused
  const [showHint, setShowHint] = useState(false);
  const hintId = "status-rail-hint";

  // Debounced show after 1.5s of continuous hover/focus
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (active) {
      t = setTimeout(() => setShowHint(true), HINT_DELAY_MS);
    } else {
      setShowHint(false);
    }
    // Always return a cleanup function (not undefined) to satisfy TS
    return () => {
      if (t) clearTimeout(t);
    };
  }, [active]);

  // Close tooltip on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowHint(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={railRef}
      className="status-rail"
      role="complementary"
      aria-label="System status indicators"
      tabIndex={0}                         // keyboard-accessible
      aria-describedby={showHint ? hintId : undefined}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div className="status-glyphs" aria-hidden="true">
        {/* <span className="glyph" >■</span>
        i */}
        <img src="/penguin.png" alt=""  className="glyph-img glyph" />
        <video src="/girl.mp4"   autoPlay loop muted playsInline className="glyph-img glyph" />
        <img src="/wifi.png" alt=""  className="glyph-img glyph" />
        <img src="/telephone.png" alt=""  className="glyph-img glyph" />
        <img src="/warning.png" alt=""  className="glyph-img glyph" />


        
      </div>

      {showHint && (
        <div id={hintId} role="tooltip" className="tooltip glitch" aria-live="off">
          TRACE: /logs
        </div>
      )}
    </div>
  );
}
