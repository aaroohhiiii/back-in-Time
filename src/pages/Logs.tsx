import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function Logs() {
  const [searchParams] = useSearchParams();
  const [logs, setLogs] = useState<string[]>([]);
  
  const filter = searchParams.get('filter');

  useEffect(() => {
    // Generate faux system logs with timestamps
    const fauxLogs = [
      '[2024-01-15 09:42:17] SYSTEM: Initializing GDG terminal interface',
      '[2024-01-15 09:42:18] AUTH: User session established',
      '[2024-01-15 09:42:19] NETWORK: Secure connection established',
      '[2024-01-15 09:42:20] SCAN: System integrity check passed',
      '[2024-01-15 09:42:21] VAULT: Access protocols loaded',
      '[2024-01-15 09:42:22] LOG: Diagnostic trace enabled',
      '[2024-01-15 09:42:23] CYPHER: Encryption modules active',
      '[2024-01-15 09:42:24] STATUS: All systems operational',
      '[2024-01-15 09:42:25] MONITOR: Real-time surveillance active',
      '[2024-01-15 09:42:26] ALERT: No anomalies detected Maybe "U" could "CTRL" this situation !`'
    ];

    // If filter=cypher, add the special guidance line
    if (filter === 'cypher') {
      fauxLogs.push('[2024-01-15 09:42:27] DIAG: not found → try /vault');
    }

    setLogs(fauxLogs);
  }, [filter]);

  return (
    <main className="mono" role="main" aria-label="System logs">
      <h1 className="crt">SYSTEM LOGS</h1>
      <p>Accessing system logs...</p>
      
      <div className="logs-container " role="table" aria-label="System log entries">
        <div className="logs-header" role="row">
          <span className="log-timestamp glitch" role="columnheader">TIMESTAMP</span>
          <span className="log-module" role="columnheader">MODULE</span>
          <span className="log-message" role="columnheader">MESSAGE</span>
        </div>
        
        <div className="logs-content">
          {logs.map((log, index) => {
            // Parse log entry for structured display
            const match = log.match(/\[(.*?)\] (\w+): (.+)/);
            if (match) {
              const [, timestamp, module, message] = match;
              return (
                <div key={index} className="log-entry" role="row">
                  <span className="log-timestamp" role="cell">{timestamp}</span>
                  <span className="log-module" role="cell">{module}</span>
                  <span className="log-message" role="cell">{message}</span>
                </div>
              );
            }
            return (
              <div key={index} className="log-entry raw" role="row">
                <span className="log-message" role="cell">{log}</span>
              </div>
            );
          })}
        </div>
      </div>

      {filter && (
        <div className="filter-info">
          <p>Active filter: <code>{filter}</code></p>
        </div>
      )}
    </main>
  )
}

export default Logs
