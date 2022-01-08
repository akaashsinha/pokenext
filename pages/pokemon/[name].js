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
      <h1>{pokemon.name}</h1>
      <p>{pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name}</p>
      <p>{pokemon.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name}</p>
      <img
        className=""
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
      />
    </>
  );
};

export default PokemonPage;
