"use client";

import { PokemonCard } from "./PokemonCard";
import type { Pokemon } from "@/types/pokemon";

interface PokemonGridProps {
  pokemon: Pokemon[];
  isLoading?: boolean;
}

export function PokemonGrid({
  pokemon = [],
  isLoading = false,
}: PokemonGridProps) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 animate-pulse h-48"
            >
              <div className="bg-gray-200 h-24 w-full rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          ))}
      </div>
    );
  }

  if (!pokemon || pokemon.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No Pokémon found. Try another search.</p>
      </div>
    )
  }
  else {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    );
  }
}
