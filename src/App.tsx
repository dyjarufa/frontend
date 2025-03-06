// src/App.tsx
import React from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { AppRoutes } from './routes/AppRoutes'

const App: React.FC = () => {
  return (
    <div className="p-4 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  )
}

export default App
