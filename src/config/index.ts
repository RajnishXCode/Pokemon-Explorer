const API_BASE_URL = 'https://pokeapi.co/api/v2'

export const PROD_URL = 'https://pokemon-explorer.vercel.app'

export const CONFIG = {
  // Cache duration for data revalidation - might need to reduce this in dev
  CACHE_TIME: 3600, // 1 hour in seconds
  
  // API endpoints we need
  API: {
    BASE_URL: API_BASE_URL,
    POKEMON_LIST: '/pokemon?limit=151', // Just Gen1 for now, will add more later
    POKEMON_BY_ID: (id: number) => `/pokemon/${id}`,
  }
} as const

// Just in case the env vars aren't set up right
if (!API_BASE_URL) {
  throw new Error('Missing required API configuration')
} 