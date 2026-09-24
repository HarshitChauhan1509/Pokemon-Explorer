import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

interface Ability {
  ability: {
    name: string;
  };
}

interface Type {
  type: {
    name: string;
  };
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Move {
  move: {
    name: string;
  };
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  abilities: Ability[];
  types: Type[];
  stats: Stat[];
  moves: Move[];
}

interface PokemonPageProps {
  pokemon: PokemonDetails | null;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-600',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400',
};

export default function PokemonPage({ pokemon }: PokemonPageProps) {
  if (!pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pokemon not found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 px-4">
      <Head>
        <title>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} | Pokemon Explorer</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6 font-medium transition-colors">
          &larr; Back to Explorer
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700/30 relative">
              <div className="absolute top-4 left-4 text-4xl font-black text-gray-200 dark:text-gray-700 select-none">
                #{String(pokemon.id).padStart(3, '0')}
              </div>
              
              <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl z-10 my-4 hover:scale-105 transition-transform duration-300">
                <Image
                  src={imageUrl}
                  alt={pokemon.name}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-contain"
                  priority
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold capitalize mt-4 mb-4 text-center z-10 text-gray-800 dark:text-gray-100">
                {pokemon.name}
              </h1>

              <div className="flex gap-2 mb-4 z-10">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`px-4 py-1.5 rounded-full text-white font-semibold text-sm uppercase tracking-wider shadow-sm ${typeColors[t.type.name] || 'bg-gray-500'}`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 mt-2 text-center text-sm font-medium text-gray-600 dark:text-gray-300 z-10">
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm">
                  <span className="block text-gray-400 text-xs uppercase mb-1">Height</span>
                  {pokemon.height / 10} m
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm">
                  <span className="block text-gray-400 text-xs uppercase mb-1">Weight</span>
                  {pokemon.weight / 10} kg
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-8 md:p-10">
              <section className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Base Stats
                </h3>
                <div className="space-y-3">
                  {pokemon.stats.map((s) => (
                    <div key={s.stat.name} className="flex items-center">
                      <div className="w-1/3 text-sm font-semibold capitalize text-gray-600 dark:text-gray-400">
                        {s.stat.name.replace('-', ' ')}
                      </div>
                      <div className="w-12 text-right text-sm font-bold mr-3">
                        {s.base_stat}
                      </div>
                      <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.base_stat > 75 ? 'bg-green-500' : s.base_stat > 45 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Abilities
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 capitalize">
                  {pokemon.abilities.map((a) => (
                    <li key={a.ability.name}>{a.ability.name.replace('-', ' ')}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Moves (Top 15)
                </h3>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {pokemon.moves.slice(0, 15).map((m) => (
                    <span
                      key={m.move.name}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-3 py-1.5 rounded-lg capitalize"
                    >
                      {m.move.name.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PokemonPageProps> = async (context) => {
  const { id } = context.params!;
  
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    if (!res.ok) {
      return { props: { pokemon: null } };
    }
    
    const pokemon: PokemonDetails = await res.json();
    
    return {
      props: {
        pokemon,
      },
    };
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
    return {
      props: {
        pokemon: null,
      },
    };
  }
};
