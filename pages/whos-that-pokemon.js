import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const randomNumber = Math.floor(Math.random() * 151);

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

  const [guess, setGuess] = useState("");
  const onChange = (e) => setGuess(e.target.value);
  const [results, setResults] = useState("");
  const [victory, setVictory] = useState(false);

  const game = () => {
    setGuess(guess);
    if (guess.toLowerCase() === pokemon[randomNumber - 1].name.toLowerCase()) {
      setResults(
        <div>
          <p>Congrats you win!</p>
          <p>
            Learn more about{" "}
            <Link href={`/pokemon/${pokemon[randomNumber - 1].name}`}>
              <a className="capitalize text-blue-500">
                {pokemon[randomNumber - 1].name}
              </a>
            </Link>
          </p>
        </div>
      );
      setGuess("");
      setVictory(true);
    } else {
      setResults(<p>Keep trying!</p>);
      setVictory(false);
    }
  };

  const refresh = () => {
    window.location.reload(false);
    setGuess("");
  };

  const giveUp = () => {
    setVictory(true);
    setResults(
      <div>
        <p>
          It was{" "}
          <span className="capitalize">{pokemon[randomNumber - 1].name}</span>!
        </p>
        <p>
          Learn more about{" "}
          <Link href={`/pokemon/${pokemon[randomNumber - 1].name}`}>
            <a className="capitalize text-blue-500">
              {pokemon[randomNumber - 1].name}
            </a>
          </Link>
        </p>
      </div>
    );
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        {"Who's That Pokémon?"}
      </h1>
      <div className="flex justify-center">
        <div className="justify-center">
          <Image
            className={`${victory ? "" : "brightness-0"}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomNumber}.png`}
            alt={`Guess that Pokemon`}
            layout="responsive"
            width={300}
            height={300}
          />
          <input
            type="text"
            className="form-input rounded-full"
            name="guessPokemon"
            value={guess}
            style={{ color: "blue" }}
            onChange={onChange}
          />
          <button
            className="bg-blue-500 text-white rounded-full p-3 mx-2"
            onClick={game}
          >
            Guess
          </button>
          <button
            className="bg-green-500 text-white rounded-full p-3 mx-2"
            onClick={refresh}
          >
            Refresh
          </button>
          <button
            className="bg-red-500 text-white rounded-full mx-2 p-3"
            onClick={giveUp}
          >
            Give Up
          </button>
          {results}
        </div>
      </div>
    </>
  );
};

export default WhosThatPokemon;
