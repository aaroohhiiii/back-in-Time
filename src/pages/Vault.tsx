function Vault() {
  return (
    <div className="mono">
      <h1 className="crt">SECURE VAULT</h1>
      <p>Accessing secure storage...</p>
      <div className="pixel-border" style={{ padding: '10px', margin: '10px 0' }}>
        <code>VAULT_STATUS: LOCKED</code><br />
        <code>ACCESS_LEVEL: RESTRICTED</code><br />
        <code>SECURITY: MAXIMUM</code>
      </div>
    </div>
  )
}

export default Vault
