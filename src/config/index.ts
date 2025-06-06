const API_BASE_URL = 'https://pokeapi.co/api/v2'

export const PROD_URL = 'https://pokemon-explorer.vercel.app'

export const CONFIG = {
  // Cache duration for data revalidation
  CACHE_TIME: 3600, // 1 hour in seconds
  
  // API endpoints
  API: {
    BASE_URL: API_BASE_URL,
    POKEMON_LIST: '/pokemon?limit=151', // First generation Pokemon
    POKEMON_BY_ID: (id: number) => `/pokemon/${id}`,
  }
} as const

// Type for accessing CONFIG values with TypeScript support
export type Config = typeof CONFIG

// Validate config at runtime
if (!API_BASE_URL) {
  throw new Error('Missing required API configuration')
} 