import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className="app min-h-screen bg-gray-50">
      <AppRoutes />
    </div>
  )
}

export default App