import { PokemonGrid } from '@/components/pokemon/PokemonGrid'

export default function Loading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-9 w-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="mt-2 h-6 w-48 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <PokemonGrid pokemon={[]} isLoading={true} />
    </div>
  )
} 