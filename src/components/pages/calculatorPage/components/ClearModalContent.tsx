import { Button } from "@danalazar/metro-ui";
import { useDispatch } from "react-redux";
import { clearCalculator } from "../../../../store/calculatorSlice";
import { closeModal } from "../../../../store/modalSlice";
import type { AppDispatch } from "../../../../store/store";

const ClearModalContent = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCalculator()); // ✅ șterge
    dispatch(closeModal()); // ✅ închide modal
  };

  return (
    <>
      <p>Sigur doriți să ștergeți calculatorul?</p>

      <div className="metro-modal-buttons">
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          Anulează
        </Button>

        <Button variant="danger" onClick={handleClear}>
          Șterge
        </Button>
      </div>
    </>
  );
};

export default ClearModalContent;
