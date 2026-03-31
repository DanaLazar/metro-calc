import React from "react";
import { Button, Input } from "@danalazar/metro-ui";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/modalSlice";
import { saveExpression } from "@/store/calculatorSlice";
import type { AppDispatch, RootState } from "@/store/store";

const SaveModalContent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [label, setLabel] = React.useState("");

  const { expression, result } = useSelector(
    (state: RootState) => state.calculator,
  );

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

      <Input
        id="save-modal-input"
        value={label}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLabel(e.target.value)
        }
        placeholder="Introduceți o etichetă..."
      />

      <div className="flex justify-between gap-3">
        <Button
          variant="secondary"
          onClick={() => dispatch(closeModal())}
          className="flex-1"
        >
          Anulează
        </Button>
        <Button variant="primary" onClick={handleSave} className="flex-1">
          Salvează
        </Button>
      </div>
    </>
  );
};

export default SaveModalContent;
