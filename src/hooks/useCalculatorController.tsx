import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCalculatorController } from "@/hooks/useCalculatorController";
import * as reactRedux from "react-redux";
import {
  inputNumber,
  chooseOperation,
  calculate,
  inputDecimal,
  backspace,
  initialCalculatorState,
} from "@/store/calculatorSlice";
import { openModal } from "@/store/modalSlice";
import { RootState } from "@/store/store";

describe("useCalculatorController", () => {
  const mockDispatch = vi.fn();
  const mockState = {
    calculator: initialCalculatorState,
    modal: {
      isOpen: false,
      type: null,
    },
  };

  beforeEach(() => {
    mockDispatch.mockClear();

    vi.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);
    vi.spyOn(reactRedux, "useSelector").mockImplementation(
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
