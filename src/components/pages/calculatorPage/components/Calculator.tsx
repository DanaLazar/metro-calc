import { Save } from "lucide-react";
import { Button, Keypad } from "@danalazar/metro-ui";
import { useDispatch, useSelector } from "react-redux";
import {
  inputNumber,
  chooseOperation,
  calculate,
  inputDecimal,
  backspace,
} from "../../../../store/calculatorSlice";
import { openModal } from "../../../../store/modalSlice";
import type { RootState, AppDispatch } from "../../../../store/store";

const Calculator = () => {
  const dispatch: AppDispatch = useDispatch();

  const { currentValue, previousValue, operation, isCalculated } = useSelector(
    (state: RootState) => state.calculator,
  );

  const handleNumberClick = (value: string) => {
    dispatch(inputNumber(value));
  };

  const handleOperationClick = (operation: string) => {
    dispatch(chooseOperation(operation));
  };

  const handleClear = () => {
    dispatch(openModal("clear"));
  };

  const handleDecimalClick = () => {
    dispatch(inputDecimal());
  };

  const handleEqualsClick = () => {
    dispatch(calculate());
  };

  const handleBackspaceClick = () => {
    dispatch(backspace());
  };

  const handleSave = () => {
    dispatch(openModal("save"));
  };

  return (
    <>
      <div className="relative bg-[var(--color-white)] shadow-2xl p-8 border border-[var(--color-border)]">
        {/* Display */}
        <div className="mb-6 p-6 bg-[var(--color-border-light)] border border-[var(--color-border)]">
          <div className="text-right">
            {previousValue && operation && (
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {previousValue} {operation}
              </div>
            )}
            <div className="text-4xl font-light text-[var(--color-text)] break-all">
              {currentValue}
            </div>
          </div>
        </div>

        {/* Buttons */}

        <Keypad
          onNumberClick={handleNumberClick}
          onOperationClick={handleOperationClick}
          onClear={handleClear}
          onDecimalClick={handleDecimalClick}
          onEqualsClick={handleEqualsClick}
          onBackspaceClick={handleBackspaceClick}
        />

        {/* Save */}
        <Button
          className="mt-4 w-full"
          disabled={!isCalculated}
          onClick={handleSave}
        >
          <Save /> Salvează
        </Button>
      </div>
    </>
  );
};

export default Calculator;
