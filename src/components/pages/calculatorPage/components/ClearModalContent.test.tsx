import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi } from "vitest";

import ClearModalContent from "./ClearModalContent";
import calculatorReducer, {
  clearCalculator,
} from "../../../../store/calculatorSlice";
import modalReducer, { closeModal } from "../../../../store/modalSlice";

const createTestStore = () =>
  configureStore({
    reducer: {
      calculator: calculatorReducer,
      modal: modalReducer,
    },
  });

describe("ClearModalContent", () => {
  it("renders confirmation message", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <ClearModalContent />
      </Provider>,
    );

    expect(
      screen.getByText("Sigur doriți să ștergeți calculatorul?"),
    ).toBeInTheDocument();
  });

  it("dispatches closeModal on cancel", async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    const spy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <ClearModalContent />
      </Provider>,
    );

    await user.click(screen.getByText("Anulează"));

    expect(spy).toHaveBeenCalledWith(closeModal());
  });

  it("dispatches clearCalculator and closeModal on confirm", async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    const spy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <ClearModalContent />
      </Provider>,
    );

    await user.click(screen.getByText("Șterge"));

    expect(spy).toHaveBeenCalledWith(clearCalculator());
    expect(spy).toHaveBeenCalledWith(closeModal());
  });
});
