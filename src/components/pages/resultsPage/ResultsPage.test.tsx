import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi } from "vitest";

import ResultsPage from "@/components/pages/resultsPage/ResultsPage";
import calculatorReducer, {
  clearHistory,
  initialCalculatorState,
} from "@/store/calculatorSlice";
import type { SavedExpression } from "@/store/calculatorSlice";

const createTestStore = (history: SavedExpression[] = []) =>
  configureStore({
    reducer: {
      calculator: calculatorReducer,
    },
    preloadedState: {
      calculator: {
        ...initialCalculatorState,
        history,
      },
    },
  });

describe("ResultsPage", () => {
  it("renders empty state when no results", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <ResultsPage />
      </Provider>,
    );

    expect(
      screen.getByText("Nu există rezultate salvate."),
    ).toBeInTheDocument();
  });

  it("renders list of results", () => {
    const mockHistory: SavedExpression[] = [
      { label: "Adunare", result: "4" },
      { label: "Înmulțire", result: "9" },
    ];

    const store = createTestStore(mockHistory);

    render(
      <Provider store={store}>
        <ResultsPage />
      </Provider>,
    );

    expect(screen.getByText("Adunare")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();

    expect(screen.getByText("Înmulțire")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
  });

  it("dispatches clearHistory on reset button click", async () => {
    const user = userEvent.setup();

    const store = createTestStore([{ label: "Test", result: "123" }]);

    const spy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <ResultsPage />
      </Provider>,
    );

    const button = screen.getByText("Resetează statistici");
    await user.click(button);

    expect(spy).toHaveBeenCalledWith(clearHistory());
  });
});
