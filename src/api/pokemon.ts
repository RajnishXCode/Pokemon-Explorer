import type { Pokemon } from '@/types/pokemon'
import { CONFIG } from '@/config'

// Define the PokemonListResponse interface here since it's missing from types/pokemon
interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

// API call to Fetches all Pokemon with optimized caching
export async function getAllPokemon(): Promise<Pokemon[]> {
  try {
    console.log('Fetching Pokemon list...');
    const startTime = Date.now();
    
    // Use the configured URL and cache time
    const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.POKEMON_LIST}`, {
      next: { revalidate: CONFIG.CACHE_TIME },
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
    }
    
    const data = await response.json() as PokemonListResponse;
        
    // Fetch all Pokemon details in parallel with proper caching
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url, {
          next: { revalidate: CONFIG.CACHE_TIME },
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch details for ${pokemon.name}: ${response.status}`);
        }
        
        return response.json();
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to fetch Pokemon');
  }
}


// API call to Fetches a specific Pokemon by ID
export async function getPokemonById(id: number): Promise<Pokemon> {
  try {
    console.log(`Fetching Pokemon #${id}`);
    const startTime = Date.now();
    
    const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.POKEMON_BY_ID(id)}`, {
      next: { revalidate: CONFIG.CACHE_TIME },
    });

    if (!response.ok) {
      throw new Error(`Pokemon #${id} not found (${response.status})`)
    }
    
    const data = await response.json()
    const endTime = Date.now()
    console.log(`Fetch completed in ${(endTime - startTime) / 1000} seconds`)
    
    return data
  } catch (error) {
    console.error(`Error fetching Pokemon #${id}:`, error)
    throw error
  }
}

// Searches Pokemon by name or type (uses cached getAllPokemon function)
export async function searchPokemons(query: string): Promise<Pokemon[]> {
  if (!query || query.trim() === '') {
    return getAllPokemon();
  }
  
  try {
    console.log(`Searching Pokemon with query: "${query}"`)
    const allPokemons = await getAllPokemon();
    
    const normalizedQuery = query.toLowerCase().trim()
    const filteredPokemons = allPokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(normalizedQuery) ||
      pokemon.types.some(type => type.type.name.toLowerCase().includes(normalizedQuery))
    )
    
    console.log(`Found ${filteredPokemons.length} Pokemon matching "${query}"`)
    return filteredPokemons
  } catch (error) {
    console.error('Error in searchPokemons:', error)
    throw error instanceof Error
      ? new Error(`Search failed: ${error.message}`)
      : new Error('Search failed due to an unknown error')
  }
}