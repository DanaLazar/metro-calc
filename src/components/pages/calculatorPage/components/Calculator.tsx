import { Button, Keypad } from "@danalazar/metro-ui";
import { useCalculatorController } from "../../../../hooks/useCalculatorController";

const Calculator = () => {
  const {
    state: { currentValue, previousValue, operation, isCalculated },
    actions,
  } = useCalculatorController();

  return (
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

      {/* Keypad */}
      <Keypad {...actions} />

      {/* Save */}
      <Button
        className="mt-4 w-full"
        disabled={!isCalculated}
        onClick={actions.onSave}
      >
        Salvează
      </Button>
    </div>
  );
};

export default Calculator;
