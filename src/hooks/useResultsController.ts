import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { clearHistory } from "@/store/calculatorSlice";

export const useResultsController = () => {
  const dispatch: AppDispatch = useDispatch();

  const results = useSelector((state: RootState) => state.calculator.history);

  const actions = {
    onReset: () => dispatch(clearHistory()),
  };

  return { results, actions };
};
