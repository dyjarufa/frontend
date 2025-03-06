import React from 'react'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => (
  <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">My Movie App</h1>
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/movies" className="hover:underline">
            Filmes
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)
