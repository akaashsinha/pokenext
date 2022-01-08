import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: `https://beta.pokeapi.co/graphql/v1beta`,
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query {
        pokemon_v2_pokemon(order_by: { id: asc }, limit: 151) {
          name
          id
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    `,
  });
  return {
    props: { data },
  };
};
const Index = ({ data }) => {
  const pokemons = data.data.pokemon_v2_pokemon;
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Pokémon</h1>
      <div className="flex flex-wrap justify-center">
        {pokemons.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              id={pokemon.id}
              className={`m-5 p-8 rounded-2xl text-center drop-shadow-md hover:drop-shadow-xl ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "electric"
                  ? "bg-yellow-400"
                  : ""
              } ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "fire"
                  ? "bg-orange-400"
                  : ""
              } ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "grass"
                  ? "bg-lime-500"
                  : ""
              }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "normal"
                  ? "bg-stone-300"
                  : ""
              } ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "water  "
                  ? "bg-blue-400"
                  : ""
              } ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "psychic"
                  ? "bg-red-400"
                  : ""
              } ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == "ice"
                  ? "bg-sky-100"
                  : ""
              }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "poison"
                  ? "bg-purple-400"
                  : ""
              }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "water"
                  ? "bg-blue-400"
                  : ""
              }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == "bug"
                  ? "bg-green-500"
                  : ""
              }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "fairy"
                  ? "bg-pink-500"
                  : ""
              }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "ground"
                  ? "bg-lime-200"
                  : ""
              }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "fighting"
                  ? "bg-red-800"
                  : ""
              }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "rock"
                  ? "bg-amber-700"
                  : ""
              }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "ghost"
                  ? "bg-purple-700"
                  : ""
              }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "dragon"
                  ? "bg-indigo-700"
                  : ""
              }
             `}
            >
              {/* Use brightness-0 for name that pokemon */}
              <p
                className={`text-left font-bold text-lg ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "fighting"
                    ? "text-white"
                    : ""
                } ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "ghost"
                    ? "text-white"
                    : ""
                } ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "rock"
                    ? "text-white"
                    : ""
                } ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "dragon"
                    ? "text-white"
                    : ""
                }`}
              >
                {pokemon.id}
              </p>
              <img
                className=""
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <p className="capitalize">
                <a
                  className={`hover:text-blue-500 ${
                    pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                    "fighting"
                      ? "text-white"
                      : ""
                  } ${
                    pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                    "ghost"
                      ? "text-white"
                      : ""
                  } ${
                    pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                    "rock"
                      ? "text-white"
                      : ""
                  } ${
                    pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                    "dragon"
                      ? "text-white"
                      : ""
                  }`}
                  href={`/pokemon/${pokemon.name}`}
                >
                  {pokemon.name}
                </a>
              </p>
              <p
                className={`capitalize text-sm ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "fighting"
                    ? "text-white"
                    : ""
                } ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "ghost"
                    ? "text-white"
                    : ""
                } ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "rock"
                    ? "text-white"
                    : ""
                } ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "dragon"
                    ? "text-white"
                    : ""
                }`}
              >
                {pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name}
              </p>
              <p
                className={`capitalize text-sm ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "ghost"
                    ? "text-white"
                    : ""
                } ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "rock"
                    ? "text-white"
                    : ""
                } ${
                  pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                  "dragon"
                    ? "text-white"
                    : ""
                }`}
              >
                {pokemon.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Index;
