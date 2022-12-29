import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import PatBooking from './pages/PatBooking'
import DocSchedule from './pages/DocSchedule.jsx'
import Prediction from './pages/Prediction.jsx'
import PrivateRoutes from './utils/PrivateRoutes'

import AuthProvider from './context/AuthContext'
import { ContextProvider } from './context/SocketContext'

import './App.css'

function App() {

  return (
    <div className="App">
        <Router>    
          <AuthProvider>
            <ContextProvider>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route element = {<Dashboard />} path = "/" exact />
                <Route element = {<Chat />} path = "/chat" />
                <Route element = {<PatBooking />} path = "/booking" />
                <Route element = {<DocSchedule />} path = "/schedule" />
                <Route element = {<Prediction />} path = "/prediction" />
              </Route>
              <Route element = {<LoginPage />} path="/login" />
            </Routes>
              </ContextProvider>
          </AuthProvider>
        </Router>
    </div>
  )
}

export default App
