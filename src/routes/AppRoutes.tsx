import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { MovieDetail } from '../pages/MovieDetail/MovieDetail'
import { MoviesPage } from '../pages/Movies/Movies'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:tconst" element={<MovieDetail />} />
    </Routes>
  )
}
