import { Modal } from "@danalazar/metro-ui";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import SaveModalContent from "../pages/calculatorPage/components/SaveModalContent";
import ClearModalContent from "../pages/calculatorPage/components/ClearModalContent";
import type { AppDispatch, RootState } from "../../store/store";

export const ModalContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, type } = useSelector((state: RootState) => state.modal);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
      title={type === "save" ? "Salvează Expresia" : "Confirmă Ștergerea"}
    >
      {type === "save" && <SaveModalContent />}
      {type === "clear" && <ClearModalContent />}
    </Modal>
  );
};
