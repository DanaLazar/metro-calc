import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { calculateExpression } from "../utils/calculateExpression";

interface SavedExpression {
  label: string;
  result: string;
}

interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string;
  expression: string;
  result: string;
  isCalculated: boolean;
  history: SavedExpression[];
}

const initialState: CalculatorState = {
  currentValue: "0",
  previousValue: "",
  operation: "",
  expression: "",
  result: "",
  isCalculated: false,
  history: [],
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
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
      if (!state.currentValue.includes(".")) {
        state.currentValue += ".";
      }
    },

    chooseOperation: (state, action: PayloadAction<string>) => {
      if (!state.currentValue) return;

      if (state.previousValue) {
        const result = calculateExpression(
          state.previousValue,
          state.operation,
          state.currentValue,
        );
        state.previousValue = result;
      } else {
        state.previousValue = state.currentValue;
      }

      state.operation = action.payload;
      state.currentValue = "0";
      state.isCalculated = false;
    },

    calculate: (state) => {
      if (!state.previousValue || !state.operation) return;

      const result = calculateExpression(
        state.previousValue,
        state.operation,
        state.currentValue,
      );

      const numericResult = parseFloat(result).toFixed(2);

      state.expression = `${state.previousValue} ${state.operation} ${state.currentValue}`;

      state.result = numericResult;
      state.currentValue = numericResult;
      state.previousValue = "";
      state.operation = "";
      state.isCalculated = true;
    },

    backspace: (state) => {
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
      state.isCalculated = false;
    },

    clearHistory: (state) => {
      state.history = [];
    },

    saveExpression: (state, action: PayloadAction<{ label: string }>) => {
      if (!state.result) return;

      state.history.push({
        label: action.payload.label,
        result: state.result,
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
