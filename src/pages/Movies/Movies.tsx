import React from 'react'
import { useMovies } from '../../hooks/useMovies'

export const MoviesPage: React.FC = () => {
  const {
    movies: currentMovies,
    isLoading,
    error,
    filterYear,
    filterGenre,
    sortBy,
    currentPage,
    totalPages,
    handleFilterYear,
    handleFilterGenre,
    handleSortChange,
    goToPreviousPage,
    goToNextPage,
  } = useMovies()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching movies.</div>

  return (
    <div>
      <h1 className="text-2xl mb-4">Movies List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ano"
          value={filterYear}
          onChange={handleFilterYear}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Gênero"
          value={filterGenre}
          onChange={handleFilterGenre}
          className="border p-2"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border p-2"
        >
          <option value="">Sort</option>
          <option value="title">Title</option>
          <option value="year">year</option>
        </select>
      </div>

      {!currentMovies.length ? (
        <p>movie not found</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4">
          {currentMovies.map((movie) => (
            <li key={movie.tconst} className="border p-4 rounded shadow">
              <h2 className="font-bold">{movie.title}</h2>
              <p>Year: {movie.year}</p>
              <p>Genre: {movie.genre}</p>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="border px-2 py-1"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="border px-2 py-1"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
