import { Delete, Save } from "lucide-react";
import { Button } from "@danalazar/metro-ui";
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

type CalculatorButton = {
  label: string;
  type: "number" | "operation" | "clear" | "decimal" | "equals" | "backspace";
  span?: number;
};

const Calculator = () => {
  const dispatch: AppDispatch = useDispatch();

  const { currentValue, previousValue, operation, isCalculated } = useSelector(
    (state: RootState) => state.calculator,
  );

  const buttons: readonly CalculatorButton[] = [
    { label: "C", type: "clear", span: 2 },
    { label: "⌫", type: "backspace" },
    { label: "÷", type: "operation" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "×", type: "operation" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "-", type: "operation" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operation" },
    { label: "0", type: "number", span: 2 },
    { label: ".", type: "decimal" },
    { label: "=", type: "equals" },
  ] as const satisfies readonly CalculatorButton[];

  const getVariant = (type: CalculatorButton["type"]) => {
    switch (type) {
      case "operation":
        return "primary";
      case "equals":
        return "dark";
      case "clear":
      case "backspace":
        return "danger";
      default:
        return "secondary";
    }
  };

  const handleClick = (button: CalculatorButton) => {
    switch (button.type) {
      case "number":
        dispatch(inputNumber(button.label));
        break;
      case "operation":
        dispatch(chooseOperation(button.label));
        break;
      case "clear":
        dispatch(openModal("clear"));
        break;
      case "decimal":
        dispatch(inputDecimal());
        break;
      case "equals":
        dispatch(calculate());
        break;
      case "backspace":
        dispatch(backspace());
        break;
    }
  };

  const handleSave = () => {
    dispatch(openModal("save"));
  };

  return (
    <>
      <div className="relative bg-white shadow-2xl p-8 border border-gray-200">
        {/* Display */}
        <div className="mb-6 p-6 bg-gray-50 border border-gray-200">
          <div className="text-right">
            {previousValue && operation && (
              <div className="text-sm text-gray-500 mb-1">
                {previousValue} {operation}
              </div>
            )}
            <div className="text-4xl font-light text-gray-900 break-all">
              {currentValue}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={getVariant(button.type)}
              size="md"
              className={`${button.span === 2 ? "col-span-2" : ""} h-16`}
              onClick={() => handleClick(button)}
            >
              {button.label === "⌫" ? <Delete /> : button.label}
            </Button>
          ))}
        </div>

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
