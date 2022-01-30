import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useState } from "react";

export const getStaticProps = async (context) => {
  const client = new ApolloClient({
    uri: `https://beta.pokeapi.co/graphql/v1beta`,
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query {
        pokemon_v2_pokemon(order_by: { id: asc }, limit: 151) {
          id
          name
        }
      }
    `,
  });
  return {
    props: {
      pokemon: data.data.pokemon_v2_pokemon,
    },
  };
};
const WhosThatPokemon = ({ pokemon }) => {
  // console.log(pokemon);
  let randomNumber = Math.floor(Math.random() * 150);
  const [guess, setGuess] = useState("");
  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        {"Who's That Pokémon?"}
      </h1>
      <Image
        className=""
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png`}
        alt={`Guess that Pokemon`}
        layout="intrinsic"
        width={95}
        height={95}
      />
      <form>{/* <input type="text" name="" id="" value={guess} /> */}</form>
      <input type="text" name="guessPokemon" id="" />
    </>
  );
};

export default WhosThatPokemon;
