import Calculator from "@/components/pages/calculatorPage/components/Calculator";
import { ModalContainer } from "@/components/common/ModalContainer";

const CalculatorPage = () => {
  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      <Calculator />
      <ModalContainer />
    </div>
  );
};

export default CalculatorPage;
