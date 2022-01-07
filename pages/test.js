import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: `https://beta.pokeapi.co/graphql/v1beta`,
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query {
        pokemon_v2_pokemon(order_by: { id: asc }) {
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
      <div className="flex flex-wrap">
        {pokemons.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              className={`m-5 p-2 ${
                pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name ==
                "electric"
                  ? "bg-yellow-200"
                  : "bg-white"
              }`}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              />
              <p className="capitalize">
                <a
                  className="hover:text-blue-500"
                  href={`/pokemon/${pokemon.name}`}
                >
                  {pokemon.name}
                </a>
              </p>
              <p className="capitalize">
                {pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name}
              </p>
              <p className="capitalize">
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
