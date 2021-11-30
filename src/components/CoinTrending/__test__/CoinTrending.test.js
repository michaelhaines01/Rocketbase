import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import CoinTrending from "..";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("Render coin trending component", () => {
  render(<CoinTrending />);
  let coinDetailElement = screen.getByTestId("coin-trending");
  expect(coinDetailElement).toBeInTheDocument();
});
