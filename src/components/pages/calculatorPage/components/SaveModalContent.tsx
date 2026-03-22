import React from "react";
import { InputWithAction, Button } from "@danalazar/metro-ui";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../store/modalSlice";
import { saveExpression } from "../../../../store/calculatorSlice";
import type { AppDispatch, RootState } from "../../../../store/store";

const SaveModalContent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [label, setLabel] = React.useState("");

  const { currentValue, previousValue, operation, result } = useSelector(
    (state: RootState) => state.calculator,
  );

  const expression =
    previousValue && operation
      ? `${previousValue} ${operation} ${currentValue}`
      : currentValue;

  const handleSave = () => {
    if (!label.trim()) return;

    dispatch(saveExpression({ label }));
    dispatch(closeModal());
  };

  return (
    <>
      <div>
        <p>Expresia:</p>
        <strong>
          {expression} = {result}
        </strong>
      </div>

      <InputWithAction
        value={label}
        onChange={setLabel}
        placeholder="Introduceți o etichetă..."
        showButtons={false}
      />

      <div className="metro-modal-buttons">
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          Anulează
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salvează
        </Button>
      </div>
    </>
  );
};

export default SaveModalContent;
