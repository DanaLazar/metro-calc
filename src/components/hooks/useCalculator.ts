import { useState } from "react";
import { calculateExpression } from "../../utils/calculateExpression";

export const useCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleNumber = (num: string) => {
    setIsCalculated(false);
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay((prev) => (prev === "0" ? num : prev + num));
    }
  };

  const handleOperation = (op: string) => {
    setIsCalculated(false);
    if (previousValue !== null && !newNumber) {
      calculate();
    }
    setPreviousValue(display);
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (!previousValue || !operation) return;

    const result = calculateExpression(previousValue, operation, display);
    setDisplay(result);
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
    setIsCalculated(true);
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
    setIsCalculated(false);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleBackspace = () => {
    setDisplay((prev) => {
      if (prev.length > 1) return prev.slice(0, -1);
      return "0";
    });
    setNewNumber(false);
  };

  return {
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
  };
};
