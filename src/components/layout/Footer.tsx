import React from 'react'

export const Footer: React.FC = React.memo(() => {
  return (
    <footer className="w-full bg-gray-800 text-white p-4 text-center mt-8">
      <p>© {new Date().getFullYear()} - My Movie App</p>
    </footer>
  )
})
