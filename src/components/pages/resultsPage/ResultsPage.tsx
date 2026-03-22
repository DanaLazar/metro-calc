import { useSelector, useDispatch } from "react-redux";
import { Button } from "@danalazar/metro-ui";
import type { AppDispatch, RootState } from "../../../store/store";
import { clearHistory } from "../../../store/calculatorSlice";

const ResultsPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const results = useSelector((state: RootState) => state.calculator.history);

  const handleReset = () => {
    dispatch(clearHistory());
  };

  return (
    <div className="w-full max-w-md h-[calc(100vh-200px)] flex flex-col bg-[#e6c18b] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#003d7a] px-6 py-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-white">Rezultate Calculator</h2>
      </div>

      {/* Lista rezultate */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#e6c18b]">
        {results.length === 0 ? (
          <p className="text-gray-700 text-center">
            Nu există rezultate salvate.
          </p>
        ) : (
          results.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-white/90 border border-gray-200 hover:border-[#00a8e1] transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 break-words">
                {item.label}
              </span>
              <span className="text-lg font-bold text-[#003d7a] flex-shrink-0">
                {item.result}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Buton resetare */}
      <div className="px-6 pb-6 flex-shrink-0 bg-[#e6c18b]">
        <Button variant="primary" size="md" onClick={handleReset}>
          Resetează statistici
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
