import { Route, Routes } from 'react-router-dom'

const ProtectedPage = () => {
  return (
    <Routes>
      <Route path="/dashboard" Component={() => <h1>Protected Route</h1>} />
    </Routes>
  )
}

export default ProtectedPage
