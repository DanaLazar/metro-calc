import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import Calculator from "./Calculator";
import { expect, it } from "vitest";

const renderWithStore = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

it("Save button is disabled initially", () => {
  renderWithStore(<Calculator />);
  expect(screen.getByText(/salvează/i)).toBeDisabled();
});

it("Save button becomes enabled after calculation", () => {
  renderWithStore(<Calculator />);

  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("="));

  expect(screen.getByText(/salvează/i)).not.toBeDisabled();
});
