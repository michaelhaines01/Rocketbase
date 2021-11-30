import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import CoinList from "..";

afterEach(cleanup);

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("Render CoinList component", () => {
  render(<CoinList />);
  const coinDetailElement = screen.getByTestId("coin-list");
  expect(coinDetailElement).toBeInTheDocument();
});

/*test("Test navigate hook", () => {
  render(<CoinList />);
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/details/bitcoin");
});*/
