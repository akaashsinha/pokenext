import "isomorphic-fetch";
import { render } from "react-dom";
import { WhosThatPokemon } from "../pages/whos-that-pokemon";

it("renders pokemon", () => {
  render(<WhosThatPokemon />);
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
});
