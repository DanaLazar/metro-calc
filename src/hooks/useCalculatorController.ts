import { useDispatch, useSelector } from "react-redux";
import {
  inputNumber,
  chooseOperation,
  calculate,
  inputDecimal,
  backspace,
} from "../store/calculatorSlice";
import { openModal } from "../store/modalSlice";
import type { RootState, AppDispatch } from "../store/store";

export const useCalculatorController = () => {
  const dispatch: AppDispatch = useDispatch();

  const state = useSelector((state: RootState) => state.calculator);

  const actions = {
    onNumberClick: (value: string) => dispatch(inputNumber(value)),
    onOperationClick: (operation: string) =>
      dispatch(chooseOperation(operation)),
    onClear: () => dispatch(openModal("clear")),
    onDecimalClick: () => dispatch(inputDecimal()),
    onEqualsClick: () => dispatch(calculate()),
    onBackspaceClick: () => dispatch(backspace()),
    onSave: () => dispatch(openModal("save")),
  };

  return {
    state,
    actions,
  };
};
