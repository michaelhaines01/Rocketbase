import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import CoinDetails from "..";

afterEach(cleanup);

test("Should render coin detail component", () => {
  render(<CoinDetails />);
  const coinDetailElement = screen.getByTestId("coindetail-1");
  expect(coinDetailElement).toBeInTheDocument();
});
