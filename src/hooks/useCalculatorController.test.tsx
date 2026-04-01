import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCalculatorController } from "@/hooks/useCalculatorController";
import {
  inputNumber,
  chooseOperation,
  calculate,
  inputDecimal,
  backspace,
  initialCalculatorState,
} from "@/store/calculatorSlice";
import { openModal } from "@/store/modalSlice";
import type { RootState } from "@/store/store";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

import { useDispatch, useSelector } from "react-redux";

describe("useCalculatorController", () => {
  const mockDispatch = vi.fn();

  const mockState: RootState = {
    calculator: initialCalculatorState,
    modal: {
      isOpen: false,
      type: null,
    },
  } as RootState;

  const mockedUseDispatch = useDispatch as unknown as ReturnType<typeof vi.fn>;
  const mockedUseSelector = useSelector as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockDispatch.mockClear();

    mockedUseDispatch.mockReturnValue(mockDispatch);

    mockedUseSelector.mockImplementation(
      (selector: (state: RootState) => unknown) => selector(mockState),
    );
  });

  it("returns state correctly", () => {
    const { result } = renderHook(() => useCalculatorController());

    expect(result.current.state).toEqual(mockState.calculator);
  });

  it("dispatches inputNumber correctly", () => {
    const { result } = renderHook(() => useCalculatorController());

    act(() => {
      result.current.actions.onNumberClick("5");
    });

    expect(mockDispatch).toHaveBeenCalledWith(inputNumber("5"));
  });

  it("dispatches chooseOperation correctly", () => {
    const { result } = renderHook(() => useCalculatorController());

    act(() => {
      result.current.actions.onOperationClick("+");
    });

    expect(mockDispatch).toHaveBeenCalledWith(chooseOperation("+"));
  });

  it("dispatches calculate correctly", () => {
    const { result } = renderHook(() => useCalculatorController());

    act(() => {
      result.current.actions.onEqualsClick();
    });

    expect(mockDispatch).toHaveBeenCalledWith(calculate());
  });

  it("dispatches inputDecimal correctly", () => {
    const { result } = renderHook(() => useCalculatorController());

    act(() => {
      result.current.actions.onDecimalClick();
    });

    expect(mockDispatch).toHaveBeenCalledWith(inputDecimal());
  });

  it("dispatches backspace correctly", () => {
    const { result } = renderHook(() => useCalculatorController());

    act(() => {
      result.current.actions.onBackspaceClick();
    });

    expect(mockDispatch).toHaveBeenCalledWith(backspace());
  });

  it("dispatches openModal for clear correctly", () => {
    const { result } = renderHook(() => useCalculatorController());

    act(() => {
      result.current.actions.onClear();
    });

    expect(mockDispatch).toHaveBeenCalledWith(openModal("clear"));
  });

  it("dispatches openModal for save correctly", () => {
    const { result } = renderHook(() => useCalculatorController());

    act(() => {
      result.current.actions.onSave();
    });

    expect(mockDispatch).toHaveBeenCalledWith(openModal("save"));
  });
});
