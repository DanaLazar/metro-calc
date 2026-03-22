import { Button } from "@danalazar/metro-ui";
import { useDispatch } from "react-redux";
import { clearCalculator } from "../../../../store/calculatorSlice";
import { closeModal } from "../../../../store/modalSlice";
import type { AppDispatch } from "../../../../store/store";

const ClearModalContent = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCalculator());
    dispatch(closeModal());
  };

  return (
    <>
      <p>Sigur doriți să ștergeți calculatorul?</p>

      <div className="flex justify-between gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => dispatch(closeModal())}
        >
          Anulează
        </Button>

        <Button variant="danger" className="flex-1" onClick={handleClear}>
          Șterge
        </Button>
      </div>
    </>
  );
};

export default ClearModalContent;
