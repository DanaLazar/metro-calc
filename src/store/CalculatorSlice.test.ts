import { expect, it } from "vitest";
import reducer, {
  inputNumber,
  inputDecimal,
  chooseOperation,
  calculate,
  backspace,
  clearCalculator,
} from "@/store/calculatorSlice";
import { initialCalculatorState } from "@/store/calculatorSlice";

//Input

it("should input number correctly", () => {
  const state = reducer(initialCalculatorState, inputNumber("5"));
  expect(state.currentValue).toBe("5");
});

it("should append number", () => {
  const prevState = { ...initialCalculatorState, currentValue: "5" };
  const state = reducer(prevState, inputNumber("3"));

  expect(state.currentValue).toBe("53");
});

// Decimal
it("should add decimal only once", () => {
  let state = reducer(initialCalculatorState, inputDecimal());
  state = reducer(state, inputDecimal());

  expect(state.currentValue).toBe("0.");
});

// Operation
it("should set operation and move current to previous", () => {
  let state = reducer(initialCalculatorState, inputNumber("5"));
  state = reducer(state, chooseOperation("+"));

  expect(state.previousValue).toBe("5");
  expect(state.currentValue).toBe("0");
  expect(state.operation).toBe("+");
});

it("should chain operations correctly", () => {
  let state = reducer(initialCalculatorState, inputNumber("2"));
  state = reducer(state, chooseOperation("+"));
  state = reducer(state, inputNumber("3"));
  state = reducer(state, chooseOperation("+"));
  state = reducer(state, inputNumber("4"));
  state = reducer(state, calculate());

  expect(state.currentValue).toBe("9");
});

// Calculate
it("should calculate addition", () => {
  let state = reducer(initialCalculatorState, inputNumber("2"));
  state = reducer(state, chooseOperation("+"));
  state = reducer(state, inputNumber("3"));
  state = reducer(state, calculate());

  expect(state.result).toBe("5");
  expect(state.currentValue).toBe("5");
  expect(state.isCalculated).toBe(true);
});

it("should handle division by zero", () => {
  let state = reducer(initialCalculatorState, inputNumber("5"));
  state = reducer(state, chooseOperation("÷"));
  state = reducer(state, inputNumber("0"));
  state = reducer(state, calculate());

  expect(state.result).toBe("not possible");
  expect(state.currentValue).toBe("not possible");
});

//Backspace

it("should remove last digit", () => {
  let state = reducer(initialCalculatorState, inputNumber("5"));
  state = reducer(state, inputNumber("3"));
  state = reducer(state, backspace());

  expect(state.currentValue).toBe("5");
});

//Reset
it("should clear calculator", () => {
  let state = reducer(initialCalculatorState, inputNumber("5"));
  state = reducer(state, clearCalculator());

  expect(state).toEqual(initialCalculatorState);
});

// Save expression
import { saveExpression } from "@/store/calculatorSlice";

it("should save expression in history", () => {
  let state = reducer(initialCalculatorState, inputNumber("2"));
  state = reducer(state, chooseOperation("+"));
  state = reducer(state, inputNumber("3"));
  state = reducer(state, calculate());

  state = reducer(state, saveExpression({ label: "test" }));

  expect(state.history.length).toBe(1);
  expect(state.history[0].label).toBe("test");
});
