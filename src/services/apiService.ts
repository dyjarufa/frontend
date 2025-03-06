import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: BASE_URL,
})

export const fetchMovies = async () => {
  const { data } = await api.get('/movies/')
  return data
}

export const fetchPrincipals = async () => {
  const { data } = await api.get('/principals/')
  return data
}

export const fetchNames = async () => {
  const { data } = await api.get('/names/')
  return data
}
