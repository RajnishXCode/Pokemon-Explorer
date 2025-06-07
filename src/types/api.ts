// Response from PokeAPI's /pokemon endpoint
export type PokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

// For handling errors from the API
export type ApiError = {
  message: string
  status?: number
  code?: string
} 