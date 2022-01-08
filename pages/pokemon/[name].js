import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const getStaticPaths = async () => {
  const client = new ApolloClient({
    uri: `https://beta.pokeapi.co/graphql/v1beta`,
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query {
        pokemon_v2_pokemon(order_by: { id: asc }, limit: 151) {
          name
        }
      }
    `,
  });
  const paths = data.data.pokemon_v2_pokemon.map((pokemon) => {
    return {
      params: { name: pokemon.name },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const name = context.params.name;
  const client = new ApolloClient({
    uri: `https://beta.pokeapi.co/graphql/v1beta`,
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query pokemonByName($name: String!) {
        pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
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
    variables: { name },
  });
  return {
    props: { pokemon: data.data.pokemon_v2_pokemon[0] },
  };
};
const PokemonPage = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <>
      <div
        className={`m-5 p-8 rounded-2xl text-center drop-shadow-md hover:drop-shadow-xl ${
          pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == "electric"
            ? "bg-yellow-400"
            : ""
        } ${
          pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == "fire"
            ? "bg-orange-400"
            : ""
        } ${
          pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == "grass"
            ? "bg-lime-500"
            : ""
        }
              ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "normal"
                  ? "bg-stone-300"
                  : ""
              } ${
          pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == "water  "
            ? "bg-blue-400"
            : ""
        } ${
          pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == "psychic"
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
        <div className="flex justify-center">
          <img
            className=""
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
          />
        </div>
        <h1>{pokemon.name}</h1>
        <p>{pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name}</p>
        <p>{pokemon.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name}</p>
      </div>
    </>
  );
};

export default PokemonPage;
