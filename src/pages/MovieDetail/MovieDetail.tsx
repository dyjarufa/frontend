import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Movie } from '../../types/movie'
import { Principal } from '../../types/principals'

export const MovieDetail: React.FC = () => {
  const { tconst } = useParams<{ tconst: string }>()

  const [activeTab, setActiveTab] = useState<'info' | 'principals'>('info')

  const {
    data: movie,
    isLoading: isLoadingMovie,
    error: movieError,
  } = useQuery<Movie>(
    ['movie', tconst],
    async () => {
      const resp = await axios.get(`http://127.0.0.1:8000/api/movies/${tconst}`)
      return resp.data
    },
    {
      enabled: !!tconst,
    }
  )

  const {
    data: principals,
    isLoading: isLoadingPrincipals,
    error: principalsError,
  } = useQuery<Principal[]>(
    ['principalsOfMovie', tconst],
    async () => {
      const resp = await axios.get(
        `http://127.0.0.1:8000/api/principals/?tconst=${tconst}`
      )
      return resp.data
    },
    {
      enabled: !!tconst && activeTab === 'principals',
    }
  )

  if (isLoadingMovie || (activeTab === 'principals' && isLoadingPrincipals)) {
    return <div>loading movie details...</div>
  }
  if (movieError || principalsError) {
    return <div>Error loading details...</div>
  }
  if (!movie) {
    return <div>Movie not found.</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-600 mb-4">Year: {movie.year}</p>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        <button
          onClick={() => setActiveTab('info')}
          className={`pb-2 ${
            activeTab === 'info' ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          Info
        </button>
        <button
          onClick={() => setActiveTab('principals')}
          className={`pb-2 ${
            activeTab === 'principals' ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          Principals
        </button>
      </div>

      {/* Aba "info" */}
      {activeTab === 'info' && (
        <div>
          <p>Runtime: {movie.runtime} min</p>
          <p>Genre: {movie.genre}</p>
        </div>
      )}

      {activeTab === 'principals' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(!principals || principals.length === 0) && (
            <p className="col-span-full text-gray-600">
              No principals found for this movie.
            </p>
          )}

          {principals &&
            principals.map((p) => (
              <div
                key={p.id}
                className="border p-4 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="font-bold mb-2">
                  {p.personName || 'Nome não disponível'}
                </h3>
                <p>Category: {p.category}</p>
                {p.characters && p.characters.length > 0 && (
                  <p>
                    Character: <em>{p.characters.join(', ')}</em>
                  </p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
