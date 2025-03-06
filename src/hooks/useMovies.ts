import { useQuery } from 'react-query'
import axios from 'axios'
import { useState, useMemo, useCallback } from 'react'
import { Movie } from '../types/movie'

export const useMovies = (itemsPerPage = 10) => {
  const [filterYear, setFilterYear] = useState('')
  const [filterGenre, setFilterGenre] = useState('')
  const [sortBy, setSortBy] = useState<'year' | 'title' | ''>('')
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery<Movie[]>(
    ['movies'],
    async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/movies/')
      return response.data
    },
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  )

  const handleFilterYear = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterYear(e.target.value)
      setCurrentPage(1)
    },
    []
  )

  const handleFilterGenre = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterGenre(e.target.value)
      setCurrentPage(1)
    },
    []
  )

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value as 'year' | 'title' | '')
      setCurrentPage(1)
    },
    []
  )

  const filteredMovies = useMemo(() => {
    if (!movies) return []
    return movies.filter((m) => {
      const matchYear = !filterYear || m.year.includes(filterYear)
      const matchGenre =
        !filterGenre ||
        m.genre.toLowerCase().includes(filterGenre.toLowerCase())
      return matchYear && matchGenre
    })
  }, [movies, filterYear, filterGenre])

  const sortedMovies = useMemo(() => {
    if (!sortBy) return filteredMovies
    return [...filteredMovies].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'year') return Number(a.year) - Number(b.year)
      return 0
    })
  }, [filteredMovies, sortBy])

  const totalPages = Math.ceil(sortedMovies.length / itemsPerPage)

  // Ajustar currentPage se estiver fora do intervalo válido
  useMemo(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const currentMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedMovies.slice(startIndex, endIndex)
  }, [sortedMovies, currentPage, itemsPerPage])

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1))
  }, [])

  const goToNextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages))
  }, [totalPages])

  return {
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
  }
}
