export type PokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export type ApiError = {
  message: string
  status?: number
  code?: string
} 