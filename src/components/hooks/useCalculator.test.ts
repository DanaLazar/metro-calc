import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useCalculator } from "./useCalculator";

describe("useCalculator", () => {
  it("should set isCalculated to true after calculation", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumber("2");
    });

    act(() => {
      result.current.handleOperation("+");
    });

    act(() => {
      result.current.handleNumber("3");
    });

    act(() => {
      result.current.calculate();
    });

    expect(result.current.display).toBe("5");
    expect(result.current.isCalculated).toBe(true);
  });

  it("should reset isCalculated when typing again", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumber("2");
      result.current.handleOperation("+");
      result.current.handleNumber("3");
      result.current.calculate();
    });

    act(() => {
      result.current.handleNumber("1");
    });

    expect(result.current.isCalculated).toBe(false);
  });
});
