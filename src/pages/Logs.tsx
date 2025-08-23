function Logs() {
  return (
    <div className="mono">
      <h1 className="crt">SYSTEM LOGS</h1>
      <p>Accessing system logs...</p>
      <div className="pixel-border" style={{ padding: '10px', margin: '10px 0' }}>
        <code>LOG_ENTRY_001: System initialized</code><br />
        <code>LOG_ENTRY_002: Terminal ready</code><br />
        <code>LOG_ENTRY_003: User authenticated</code>
      </div>
    </div>
  )
}

export default Logs
