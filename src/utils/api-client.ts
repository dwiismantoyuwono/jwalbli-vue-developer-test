import axios from 'axios'

export const apiClient = axios.create({
  baseURL: String(import.meta.env.VITE_BASE_URL_API),
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
})

export const apiClientAuth = axios.create({
  baseURL: String(import.meta.env.VITE_BASE_URL_API),
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
    'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
  },
})
