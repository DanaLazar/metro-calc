import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SaveModalContent from "@/components/pages/calculatorPage/components/SaveModalContent";
import calculatorReducer, {
  initialCalculatorState,
  saveExpression,
} from "@/store/calculatorSlice";
import modalReducer, { closeModal } from "@/store/modalSlice";
import { describe, it, expect, vi } from "vitest";

const createTestStore = () =>
  configureStore({
    reducer: {
      calculator: calculatorReducer,
      modal: modalReducer,
    },
    preloadedState: {
      calculator: {
        ...initialCalculatorState,
        expression: "2 + 2",
        result: "4",
        currentValue: "4",
        isCalculated: true,
      },
      modal: {
        type: null,
        isOpen: false,
      },
    },
  });

describe("SaveModalContent", () => {
  it("renders expression and result", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <SaveModalContent />
      </Provider>,
    );

    expect(screen.getByText("2 + 2 = 4")).toBeInTheDocument();
  });

  it("updates input value", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    render(
      <Provider store={store}>
        <SaveModalContent />
      </Provider>,
    );

    const input = screen.getByPlaceholderText("Introduceți o etichetă...");

    await user.type(input, "Test label");

    expect(input).toHaveValue("Test label");
  });

  it("dispatches saveExpression and closeModal on save", async () => {
    const user = userEvent.setup();

    const store = createTestStore();
    const spy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <SaveModalContent />
      </Provider>,
    );

    const input = screen.getByPlaceholderText("Introduceți o etichetă...");

    await user.type(input, "My calc");

    const saveButton = screen.getByText("Salvează");
    await user.click(saveButton);

    expect(spy).toHaveBeenCalledWith(saveExpression({ label: "My calc" }));

    expect(spy).toHaveBeenCalledWith(closeModal());
  });

  it("does NOT save if label is empty", async () => {
    const user = userEvent.setup();

    const store = createTestStore();
    const spy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <SaveModalContent />
      </Provider>,
    );

    const saveButton = screen.getByText("Salvează");
    await user.click(saveButton);

    expect(spy).not.toHaveBeenCalledWith(saveExpression(expect.anything()));
  });

  it("closes modal on cancel", async () => {
    const user = userEvent.setup();

    const store = createTestStore();
    const spy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <SaveModalContent />
      </Provider>,
    );

    const cancelButton = screen.getByText("Anulează");
    await user.click(cancelButton);

    expect(spy).toHaveBeenCalledWith(closeModal());
  });
});
