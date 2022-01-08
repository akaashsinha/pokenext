import "isomorphic-fetch";
import { render } from "react-dom";
import { getStaticProps, Index } from "../pages/index";

it("Should return list of pokemon", async () => {
  const result = await getStaticProps();
  const pokemons = result.props.data.data.pokemon_v2_pokemon;
  expect(pokemons.length >= 151).toBeTruthy();
});
// it("Each pokemon should have an ID displayed", () => {
//   render(<Index />);

// });
