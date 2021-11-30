import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import CoinDetails from "..";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

test("Should render coin detail component", () => {
  render(<CoinDetails />);
  let coinDetailElement = screen.getByTestId("coin-detail");
  expect(coinDetailElement).toBeInTheDocument();
});
