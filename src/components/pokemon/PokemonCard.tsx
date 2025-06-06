import Image from 'next/image'
import Link from 'next/link'
import { getTypeColor } from '@/utils/pokemon'
import type { Pokemon } from '@/types/pokemon'

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const formattedName = pokemon.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default

  return (
    <Link 
      href={`/pokemon/${pokemon.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      <div className="aspect-square relative bg-gray-50 p-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={pokemon.name}
            fill
            className="object-contain hover:scale-110 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-gray-900">
            {formattedName}
          </h2>
          <span className="text-sm text-gray-500">
            #{pokemon.id.toString().padStart(3, '0')}
          </span>
        </div>

        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <span 
              key={type.type.name}
              className="px-2 py-1 rounded-full text-white text-xs font-medium capitalize"
              style={{ backgroundColor: getTypeColor(type.type.name) }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
} 