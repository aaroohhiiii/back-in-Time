import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Logs from './pages/Logs'
import Vault from './pages/Vault'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="/vault" element={<Vault />} />
    </Routes>
  )
}

export default AppRoutes
