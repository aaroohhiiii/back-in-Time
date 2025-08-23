

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
        <video src="/scientist.mp4" autoPlay loop muted playsInline className="glyph-img glyph glitch" />
        <video src="/ghost.mp4" autoPlay loop muted playsInline className="glyph-img glyph glitch" />
        <video src="/girl2.mp4" autoPlay loop muted playsInline className="glyph-img glyph glitch" />
      </div>

      {showHint && (
        <div id={hintId} role="tooltip" className="tooltip glitch" aria-live="off">
          TRACE: /logs
        </div>
      )}
    </div>
  );
}
