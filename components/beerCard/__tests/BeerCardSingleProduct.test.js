import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockedBeer } from "../../../__mocks__/beerMock";
import BeerCardSingleProductPage from "../BeerCardSingleProductPage";

it("should render correct info from API data", async () => {
  render(<BeerCardSingleProductPage beer={mockedBeer} />);

  expect(screen.getByText(/Bourbon Baby/gi)).toBeVisible();

  expect(
    screen.getByText(/Santa Paws Scotch ale aged in bourbon barrels/gi)
  ).toBeVisible();

  expect(screen.getByText(/European Brewing Convention: 44/gi)).toBeVisible();

  expect(screen.getByText(/Add to cart/gi)).toBeVisible();
});
