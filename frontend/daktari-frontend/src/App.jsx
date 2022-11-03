import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

import './App.css'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element = {<Dashboard />} path="/" exact/>
          <Route element = {<LoginPage />} path="/login" />
        </Routes>
      </Router>
    </div>
  )
}

export default App
