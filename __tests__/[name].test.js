import { render, screen } from "@testing-library/react";
import PokemonPage from "../pages/pokemon/[name]";

it("renders pokemon", () => {
  render(<PokemonPage />);
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
});
