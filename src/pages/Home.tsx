import Terminal from '../components/Terminal'
import StatusRail from '../components/StatusRail'

function Home() {
  return (
    <div className="home-layout" >
      <main className="terminal-intro" >
        <h1 className="crt glitch~" style={{fontSize: '2rem' ,

        }}> Welcome,<span className='glitch' style={{color:'yellow'}}> Champ</span>.</h1>
        <p style={{fontSize: '1.5rem' ,
          padding: '0px'
        }}>The terminal hold <span  style={{color:'red',
          fontStyle:'italic'
        }}>Secrets.</span> Will u make it through  ?</p>
        
        <div className="glitch" data-text="AM ! CRASHING ??!">
          <h2 style={{fontSize: '1.5rem' , padding:'0px'}} className=''>Ready At your <span className='code-block-words' >Command Mate.</span></h2>
        </div>
        
        <p>Navigate using the URL bar:</p>
        {/* <ul>
           <li><code>/logs</code> - Access system logs</li>
          <li><code>/vault</code> - Secure storage</li> 
        </ul> */}
        
        <p className="glitch" data-text=" this is my end <HELP ME />" style={{fontSize: '1.5rem'}}>Gonna be fun wont it be ?</p>
        
        <div className="terminal-placeholder">
          <Terminal />
        </div>
      </main>
      
      <aside className="status-rail-container">
        <StatusRail />
      </aside>
    </div>
  )
}

export default Home
