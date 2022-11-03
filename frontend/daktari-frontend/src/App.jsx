import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import PrivateRoutes from './utils/PrivateRoutes'

import AuthProvider from './context/AuthContext'

import './App.css'

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element = {<Dashboard />} path = "/" exact />
            </Route>
            <Route element = {<LoginPage />} path="/login" />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
