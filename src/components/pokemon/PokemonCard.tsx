import Link from 'next/link'
import Image from 'next/image'
import { getTypeColor } from '@/utils/pokemon'
import type { Pokemon } from '@/types/pokemon'

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  // Make the name look nice - this should probably be a util function
  // but I'm just putting it here for now
  const formattedName = pokemon.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // Grab the official artwork if available, fallback to sprites
  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || 
                  `/fallback-pokemon.png` // should add this fallback image

  return (
    <Link 
      href={`/pokemon/${pokemon.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden pokemon-card"
    >
      <div className="relative aspect-square">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${formattedName}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
            className="object-contain p-4 hover:scale-105 transition-transform duration-200"
            priority={pokemon.id <= 10} // Only prioritize the first few
          />
        )}
      </div>
      
      <div className="p-4">
        <div className="text-gray-500 text-sm mb-1">#{pokemon.id.toString().padStart(3, '0')}</div>
        <h2 className="font-bold text-lg text-gray-900 truncate">{formattedName}</h2>
        
        <div className="flex gap-2 mt-2">
          {pokemon.types.map(({ type }) => (
            <span 
              key={type.name}
              className="text-xs px-2 py-1 rounded-full text-white font-medium"
              style={{ backgroundColor: getTypeColor(type.name) }}
            >
              {type.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}