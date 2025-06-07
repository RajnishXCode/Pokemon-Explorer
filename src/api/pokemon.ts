import { Pokemon } from '@/types/pokemon'
import { CONFIG } from '@/config'

// Reuse the type from types/api.ts
import { PokemonListResponse } from '@/types/api'

// Cache for pokemon data - poor man's solution but works for now
let pokemonCache: Pokemon[] | null = null
let cacheTime = 0

// Gets all Pokemon - returns cached data if available and fresh
export async function getAllPokemon(): Promise<Pokemon[]> {
  // Check if we have cached data that's still fresh
  const now = Date.now() 
  if (pokemonCache && (now - cacheTime) / 1000 < CONFIG.CACHE_TIME) {
    console.log('Using cached Pokemon data')
    return pokemonCache
  }

  try {
    // Fetch the first 151 Pokemon (all we need for now)
    const res = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.POKEMON_LIST}`)
    
    if (!res.ok) {
      throw new Error(`Failed to fetch Pokemon: ${res.status}`)
    }

    const data: PokemonListResponse = await res.json()
    
    // Now fetch the details for each Pokemon
    // Could use Promise.all but that might hit rate limits
    // So doing it sequentially for now
    const pokemonDetails: Pokemon[] = []
    
    for (const item of data.results) {
      // Extract ID from the URL since we need it anyway
      const id = Number(item.url.split('/').filter(Boolean).pop())
      const details = await getPokemonById(id)
      pokemonDetails.push(details)
    }
    
    // Update cache
    pokemonCache = pokemonDetails
    cacheTime = now
    
    return pokemonDetails
  } catch (error) {
    // This keeps breaking in development for some reason
    console.error('Failed to fetch Pokemon list:', error)
    throw error
  }
}

// Fetches a specific Pokemon by ID
export async function getPokemonById(id: number): Promise<Pokemon> {
  try {
    const res = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.POKEMON_BY_ID(id)}`)
    
    if (!res.ok) {
      throw new Error(`Failed to fetch Pokemon #${id}: ${res.status}`)
    }

    const pokemon = await res.json()
    return pokemon
  } catch (error) {
    // Better error message for specific Pokemon
    console.error(`Error fetching Pokemon #${id}:`, error)
    throw error instanceof Error
      ? error
      : new Error(`Failed to fetch Pokemon #${id}`)
  }
}

// Basic search function - we'll improve this later maybe
export async function searchPokemons(query: string): Promise<Pokemon[]> {
  if (!query) return []
  
  try {
    // First get all Pokemon
    const allPokemon = await getAllPokemon()
    
    // Then filter locally - PokeAPI doesn't have a search endpoint
    const lowerQuery = query.toLowerCase()
    return allPokemon.filter(pokemon => {
      return (
        // Check name
        pokemon.name.toLowerCase().includes(lowerQuery) ||
        // Check ID (as string)
        pokemon.id.toString() === lowerQuery ||
        // Check types
        pokemon.types.some(({ type }) => 
          type.name.toLowerCase().includes(lowerQuery)
        )
      )
    })
  } catch (error) {
    console.error('Error searching Pokemon:', error)
    return [] // Return empty array instead of throwing - better UX
  }
}