import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Movies } from './Movies'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock do hook useMovies
jest.mock('../../hooks/useMovies', () => ({
  useMovies: () => ({
    data: [
      {
        tconst: 'tt001',
        title: 'Fake Movie',
        year: '2020',
        genre: 'Drama',
      },
    ],
    isLoading: false,
    error: null,
  }),
}))

const queryClient = new QueryClient()

describe('Movies Page', () => {
  it('renders movies list', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Movies />
      </QueryClientProvider>
    )

    expect(screen.getByText('Movies')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Fake Movie')).toBeInTheDocument()
    })
  })
})
