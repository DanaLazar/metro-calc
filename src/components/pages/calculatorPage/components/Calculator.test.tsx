import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Calculator from "./Calculator";

vi.mock("@danalazar/metro-ui", () => ({
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} />
  ),
}));
describe("Calculator UI", () => {
  it("Save button is disabled initially", () => {
    render(<Calculator />);
    const saveButton = screen.getByRole("button", { name: /salvează/i });

    expect(saveButton).toBeDisabled();
  });

  it("Save button becomes enabled after calculation", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));

    const saveButton = screen.getByText("Salvează");

    expect(saveButton).not.toBeDisabled();
  });
});
