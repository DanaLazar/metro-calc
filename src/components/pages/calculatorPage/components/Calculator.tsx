import { Delete, Save } from "lucide-react";
import { Button } from "@danalazar/metro-ui";
import { useCalculator } from "../../../hooks/useCalculator";

const Calculator = () => {
  const {
    display,
    previousValue,
    operation,
    isCalculated,
    handleNumber,
    handleOperation,
    calculate,
    clear,
    handleDecimal,
    handleBackspace,
  } = useCalculator();

  const buttons = [
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
  ];

  const handleClick = (
    button:
      | { label: string; type: string; span: number }
      | { label: string; type: string; span?: undefined },
  ) => {
    switch (button.type) {
      case "number":
        handleNumber(button.label);
        break;
      case "operation":
        handleOperation(button.label);
        break;
      case "clear":
        clear();
        break;
      case "decimal":
        handleDecimal();
        break;
      case "equals":
        calculate();
        break;
      case "backspace":
        handleBackspace();
        break;
    }
  };

  function handleSave(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="absolute inset-0 bg-[#00a8e1]/20 blur-xl"></div>
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
              {display}
            </div>
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={
                button.type === "operation"
                  ? "primary"
                  : button.type === "equals"
                    ? "dark"
                    : button.type === "clear" || button.type === "backspace"
                      ? "danger"
                      : "secondary"
              }
              size="md"
              className={`${button.span === 2 ? "col-span-2" : ""} h-16`}
              onClick={() => handleClick(button)}
            >
              {button.label === "⌫" ? (
                <Delete className="w-5 h-5" />
              ) : (
                button.label
              )}
            </Button>
          ))}
        </div>

        {/* Save Button */}
        <Button
          variant="primary"
          size="md"
          className="mt-4 w-full flex items-center justify-center"
          disabled={!isCalculated}
          onClick={handleSave}
        >
          <Save className="w-5 h-5 mr-2" />
          Salvează
        </Button>
      </div>
    </>
  );
};

export default Calculator;
