function StatusRail() {
  return (
    <div className="status-rail">
      <div className="status-glyphs">
        <span className="glyph">■</span>
        <span className="glyph">◆</span>
        <span className="glyph">▣</span>
        <span className="glyph">░</span>
        <span className="glyph">▒</span>
        <span className="glyph">▓</span>
      </div>
      
      <div className="tooltip-container" aria-hidden="true">
        {/* Tooltips will be added here later */}
      </div>
    </div>
  )
}

export default StatusRail
