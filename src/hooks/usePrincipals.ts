import { useQuery } from 'react-query'
import { fetchPrincipals } from '../services/apiService'

export function usePrincipals() {
  return useQuery(['principals'], fetchPrincipals)
}
