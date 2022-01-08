import { render, screen } from "@testing-library/react";
import PokemonPage from "../pages/pokemon/[name]";
import { getStaticPaths } from "../pages/pokemon/[name]";
import "isomorphic-fetch";

it("renders pokemon", () => {
  render(<PokemonPage />);
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
});
it("Should return paths", async () => {
  const result = await getStaticPaths();
  const paths = result.paths;
  expect(paths.length === 151).toBeTruthy();
});
