"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PokemonGrid } from "./PokemonGrid";
import { ClientSearchBar } from "../search/ClientSearchBar";
import type { Pokemon } from "../../types/pokemon";

interface PokemonBrowserProps {
  initialPokemon: Pokemon[];
  initialQuery: string;
}

export function PokemonBrowser({
  initialPokemon,
  initialQuery,
}: PokemonBrowserProps) {

  const [allPokemon, setAllPokemon] = useState(initialPokemon);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchQuery) {
      setFilteredPokemon(allPokemon);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allPokemon.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(query) ||
        pokemon.types.some((type) =>
          type.type.name.toLowerCase().includes(query)
        )
    );

    setFilteredPokemon(filtered);
  }, [searchQuery, allPokemon]);

  // Initialize filtered pokemon on mount
  useEffect(() => {
    setFilteredPokemon(
      initialQuery
        ? allPokemon.filter(
            (p) =>
              p.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
              p.types.some((type) =>
                type.type.name
                  .toLowerCase()
                  .includes(initialQuery.toLowerCase())
              )
          )
        : allPokemon
    );
  }, [initialPokemon, initialQuery, allPokemon]);


  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="mb-8">
        <ClientSearchBar
          placeholder="Search Pokémon by name or type..."
          defaultQuery={initialQuery}
          onSearch={handleSearch}
        />
      </div>

      <PokemonGrid pokemon={filteredPokemon} isLoading={isLoading} />
    </>
  );
}
