import Image from 'next/image'
import Link from 'next/link'
import { getPokemonById } from '@/api/pokemon'
import type { Pokemon } from '@/types/pokemon'
import { getTypeColor } from '@/utils/pokemon'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // First await the params to ensure id is available
    const id = params.id;
    const pokemon = await getPokemonById(parseInt(id));
    const formattedName = pokemon.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default;

    return {
      title: formattedName,
      description: `Learn about ${formattedName}'s stats, abilities, and more. View detailed information about this Pokemon's types and characteristics.`,
      openGraph: {
        title: formattedName,
        description: `Learn about ${formattedName}'s stats, abilities, and more.`,
        images: imageUrl ? [
          {
            url: imageUrl,
            width: 600,
            height: 600,
            alt: formattedName,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: formattedName,
        description: `Learn about ${formattedName}'s stats, abilities, and more.`,
        images: imageUrl ? [imageUrl] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Pokemon Not Found',
      description: 'The requested Pokemon could not be found.',
    }
  }
}

export default async function PokemonDetail({ params }: Props) {
  let pokemon: Pokemon | null = null
  let error: Error | null = null

  try {
    // First await the params to ensure id is available
    const id = await params.id
    pokemon = await getPokemonById(parseInt(id))
  } catch (err) {
    error = err instanceof Error ? err : new Error('Failed to fetch Pokemon')
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Pokemon list
        </Link>
      </div>
    )
  }

  if (!pokemon) return null

  const formattedName = pokemon.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
        >
          ← Back to Pokemon list
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="aspect-video relative bg-gray-50 p-8">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={pokemon.name}
              fill
              className="object-contain"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
              </svg>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {formattedName}
            </h1>
            <span className="text-xl font-medium text-gray-600">
              #{pokemon.id.toString().padStart(3, '0')}
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Types */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Types</h2>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span 
                    key={type.type.name}
                    className="px-4 py-1 rounded-full text-white font-medium capitalize text-sm"
                    style={{ backgroundColor: getTypeColor(type.type.name) }}
                  >
                    {type.type.name}
                  </span>
                ))}              </div>
            </div>

            {/* Stats */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Base Stats</h2>
              <div className="space-y-3">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex items-center">
                    <span className="w-24 text-sm text-gray-600 capitalize">{stat.stat.name}:</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(stat.base_stat / 255) * 100}%`,
                          backgroundColor: getStatColor(stat.base_stat)
                        }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-medium text-gray-700 ml-2">
                      {stat.base_stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="md:col-span-2 border-t pt-6 mt-2">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Height</h2>
                  <p className="text-gray-600">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Weight</h2>
                  <p className="text-gray-600">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Abilities</h2>
                  <div className="space-y-1">
                    {pokemon.abilities.map((ability) => (
                      <p key={ability.ability.name} className="text-gray-600 capitalize">
                        {ability.ability.name.replace('-', ' ')}
                        {ability.is_hidden && (
                          <span className="text-gray-400 text-sm ml-2">(Hidden)</span>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStatColor(value: number): string {
  if (value >= 150) return '#22c55e' // green-500
  if (value >= 90) return '#3b82f6'  // blue-500
  if (value >= 60) return '#eab308'  // yellow-500
  return '#ef4444' // red-500
} 