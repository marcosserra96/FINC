import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from './context/ConfigContext'
import Home from './pages/Home/Home'
import QuizGame from './pages/activities/QuizGame/QuizGame'
import EfficientHouse from './pages/activities/EfficientHouse/EfficientHouse'
import ApplianceRace from './pages/activities/ApplianceRace/ApplianceRace'
import Ranking from './pages/Ranking/Ranking'
import AdminGate from './pages/admin/AdminGate'

function App() {
  return (
    <ConfigProvider>
      <HashRouter>
        <div onContextMenu={(e) => e.preventDefault()}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<QuizGame />} />
            <Route path="/casa-eficiente" element={<EfficientHouse />} />
            <Route path="/consumo" element={<ApplianceRace />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/admin" element={<AdminGate />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </ConfigProvider>
  )
}

export default App
