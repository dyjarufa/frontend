export interface Movie {
  id: number
  title: string
  year: string
  genre: string
  tconst: string
  description: string
  release_date: string
  poster_path?: string
  backdrop_path?: string
  runtime?: number
  vote_average?: number
  vote_count?: number
  genres?: Genre[]
}

export interface Genre {
  id: number
  name: string
}
