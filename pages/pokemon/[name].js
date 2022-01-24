import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextSeo } from "next-seo";
import Image from "next/image";

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
          height
          base_experience
          weight
        }
        pokemon_v2_pokemonspeciesflavortext(
          where: {
            pokemon_v2_language: { name: { _eq: "en" } }
            pokemon_v2_version: { id: { _eq: 1 } }
          }
        ) {
          flavor_text
        }
      }
    `,
    variables: { name },
  });

  return {
    props: {
      pokemon: data.data.pokemon_v2_pokemon[0],
      // nextPokemon: nextPokemon.data.pokemon_v2_pokemon[0],
      descriptions: data.data.pokemon_v2_pokemonspeciesflavortext,
    },
  };
};
const PokemonPage = ({ pokemon, descriptions }) => {
  const { id, name, height, weight } = pokemon;
  const SEO = {
    title: `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
    description: `${name} - ${descriptions[id - 1].flavor_text.replace(
      /[^a-z0-9 ,.?!É']/gi,
      " "
    )}`,
  };
  return (
    <>
      <NextSeo {...SEO} />
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
        <p className="text-left text-xl font-bold">#{id}</p>
        {/* <p className="text-right text-xl font-bold">#{nextPokemon?.id}</p> */}
        <h1 className="capitalize text-2xl text-center font-extrabold">
          {name}
        </h1>
        <div className="flex justify-center">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={`${name} front`}
            layout="intrinsic"
            width={95}
            height={95}
          />
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`}
            alt={`${name} back`}
            layout="intrinsic"
            width={95}
            height={95}
          />
        </div>
        <p className={`capitalize`}>
          {pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name}
        </p>
        <p className="capitalize">
          {pokemon.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name}
        </p>
        {/* <button className="bg-blue-500 rounded-xl p-2">
          {pokemon.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name}
        </button> */}
        <p>
          <span className="font-bold">Height:</span> {height / 10} m
        </p>
        <p>
          {" "}
          <span className="font-bold">Weight:</span> {weight / 10} kg
        </p>
        <p className="">{`${descriptions[id - 1].flavor_text.replace(
          /[^a-z0-9 ,.?!É']/gi,
          " "
        )}`}</p>
      </div>
    </>
  );
};

export default PokemonPage;
