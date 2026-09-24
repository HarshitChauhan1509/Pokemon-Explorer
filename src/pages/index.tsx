import { useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonListResult {
  name: string;
  url: string;
}

interface PokemonBasicInfo {
  id: string;
  name: string;
  image: string;
}

interface HomeProps {
  pokemons: PokemonBasicInfo[];
}

export default function Home({ pokemons }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Head>
        <title>Pokemon Explorer</title>
        <meta name="description" content="Explore Pokemons using Next.js and PokeAPI" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-blue-600 dark:text-blue-400 drop-shadow-sm">
          Pokemon Explorer
        </h1>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search Pokemon by name..."
            className="w-full max-w-md px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredPokemons.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-12 text-xl">
            No Pokemons found matching "{searchTerm}"
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredPokemons.map((pokemon) => (
              <Link
                key={pokemon.id}
                href={`/pokemon/${pokemon.id}`}
                className="group flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
              >
                <div className="w-full aspect-square relative bg-gray-100 dark:bg-gray-700/50 p-4">
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    priority={parseInt(pokemon.id) <= 20}
                  />
                </div>
                <div className="p-4 w-full text-center bg-white dark:bg-gray-800">
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block mb-1">
                    #{pokemon.id.padStart(3, '0')}
                  </span>
                  <h2 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-200 group-hover:text-blue-500 transition-colors">
                    {pokemon.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await res.json();

    const pokemons: PokemonBasicInfo[] = data.results.map((p: PokemonListResult) => {
      const id = p.url.split('/').filter(Boolean).pop() || '';
      return {
        id,
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    });

    return {
      props: {
        pokemons,
      },
    };
  } catch (error) {
    console.error('Failed to fetch pokemons:', error);
    return {
      props: {
        pokemons: [],
      },
    };
  }
}
