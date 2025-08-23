function StatusRail() {
  return (
    <div className="status-rail" role="complementary" aria-label="System status indicators">
      <div className="status-glyphs" aria-hidden="true">
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
