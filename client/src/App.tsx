import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
