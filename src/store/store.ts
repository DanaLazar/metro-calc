import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./calculatorSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    modal: modalReducer,
  },
});

// Tipuri pentru TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
