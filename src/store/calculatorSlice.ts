import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { calculateExpression } from "@/utils/calculateExpression";

export interface SavedExpression {
  label: string;
  result: string;
}

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string;
  expression: string;
  result: string;
  isCalculated: boolean;
  history: SavedExpression[];
}

export const initialCalculatorState: CalculatorState = {
  currentValue: "0",
  previousValue: "",
  operation: "",
  expression: "",
  result: "",
  isCalculated: false,
  history: [],
};

const formatResult = (value: number): string => {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState: initialCalculatorState,
  reducers: {
    inputNumber: (state, action: PayloadAction<string>) => {
      if (state.isCalculated) {
        state.currentValue = action.payload;
        state.isCalculated = false;
        return;
      }

      if (state.currentValue === "0") {
        state.currentValue = action.payload;
      } else {
        state.currentValue += action.payload;
      }
    },

    inputDecimal: (state) => {
      if (state.isCalculated) {
        state.currentValue = "0.";
        state.isCalculated = false;
        return;
      }

      if (!state.currentValue.includes(".")) {
        state.currentValue += ".";
      }
    },

    chooseOperation: (state, action: PayloadAction<string>) => {
      // operator override (ex: 5 + - ×)
      if (state.currentValue === "0" && state.previousValue) {
        state.operation = action.payload;
        return;
      }

      if (!state.currentValue) return;

      if (state.previousValue && state.operation) {
        const result = calculateExpression(
          state.previousValue,
          state.operation,
          state.currentValue,
        );

        if (isNaN(Number(result))) {
          state.currentValue = result;
          state.previousValue = "";
          state.operation = "";
          state.isCalculated = true;
          return;
        }

        state.previousValue = formatResult(Number(result));
      } else {
        state.previousValue = state.currentValue;
      }

      state.operation = action.payload;
      state.currentValue = "0";
      state.isCalculated = false;
    },

    calculate: (state) => {
      if (!state.previousValue || !state.operation) return;

      const expression = `${state.previousValue} ${state.operation} ${state.currentValue}`;

      const result = calculateExpression(
        state.previousValue,
        state.operation,
        state.currentValue,
      );

      // handle invalid result (ex: division by zero)
      if (isNaN(Number(result))) {
        state.result = result;
        state.currentValue = result;
        state.expression = expression;
      } else {
        const numeric = Number(result);
        const formatted = formatResult(numeric);

        state.result = formatted;
        state.currentValue = formatted;
        state.expression = expression;
      }

      state.previousValue = "";
      state.operation = "";
      state.isCalculated = true;
    },

    backspace: (state) => {
      if (state.isCalculated) {
        state.currentValue = "0";
        state.isCalculated = false;
        return;
      }

      if (state.currentValue.length <= 1) {
        state.currentValue = "0";
      } else {
        state.currentValue = state.currentValue.slice(0, -1);
      }
    },

    clearCalculator: (state) => {
      state.currentValue = "0";
      state.previousValue = "";
      state.operation = "";
      state.result = "";
      state.expression = "";
      state.isCalculated = false;
    },

    clearHistory: (state) => {
      state.history = [];
    },

    saveExpression: (state, action: PayloadAction<{ label: string }>) => {
      if (!state.result || !state.expression) return;

      state.history.push({
        label: action.payload.label,
        result: `${state.expression} = ${state.result}`,
      });
    },
  },
});

export const {
  inputNumber,
  inputDecimal,
  chooseOperation,
  calculate,
  backspace,
  clearCalculator,
  saveExpression,
  clearHistory,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
