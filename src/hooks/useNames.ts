import { useQuery } from 'react-query'
import axios from 'axios'
import { Name } from '../types/name'

export const useNames = () => {
  return useQuery<Name[]>(['names'], async () => {
    const resp = await axios.get('http://127.0.0.1:8000/api/names/')
    return resp.data
  })
}
