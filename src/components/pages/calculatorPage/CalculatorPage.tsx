import Calculator from "./components/Calculator";
import { ModalContainer } from "../../common/ModalContainer";

const CalculatorPage = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <Calculator />
      <ModalContainer />
    </div>
  );
};

export default CalculatorPage;
