import { Suspense } from 'react'
import { getAllPokemon } from '../api/pokemon'
import type { Pokemon } from '../types/pokemon'
import { PokemonBrowser } from '../components/pokemon/PokemonBrowser'

export default async function Home({ searchParams }: any) {
  const pokemon = await getAllPokemon()

  const initialQuery = Array.isArray(searchParams.q)
    ? searchParams.q[0]
    : searchParams.q || ''

  return (
    <Suspense fallback={<div className="animate-pulse p-8">Loading Pokémon...</div>}>
      <PokemonBrowser initialPokemon={pokemon} initialQuery={initialQuery} />
    </Suspense>
  )
}
