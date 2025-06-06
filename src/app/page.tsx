import { Suspense } from 'react'
import { getAllPokemon } from '../api/pokemon'
import type { Pokemon } from '../types/pokemon'
import { PokemonBrowser } from '../components/pokemon/PokemonBrowser'

// Use SearchParams for initial state
interface HomeProps {
  searchParams: { q?: string | string[] }
}

export default async function Home({ searchParams }: HomeProps) {
  // Fetch data with automatic caching by Next.js
  // This happens on the server and leverages Next.js cache
  const pokemon = await getAllPokemon()
  
  // Get initial search query from URL
  const params = new URLSearchParams(searchParams?.toString?.() || '')
  const initialQuery = params.get('q') || ''

  return (
    <Suspense fallback={<div className="animate-pulse p-8">Loading Pokémon...</div>}>
      <PokemonBrowser initialPokemon={pokemon} initialQuery={initialQuery} />
    </Suspense>
  )
}
