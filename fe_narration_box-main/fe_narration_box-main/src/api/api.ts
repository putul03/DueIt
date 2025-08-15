import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await api.get(url)
  return response.data
}
