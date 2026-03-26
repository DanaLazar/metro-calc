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
    <div className="w-full max-w-[540px] h-[calc(100vh-200px)] flex flex-col bg-[var(--color-white)] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--color-dark)] px-6 py-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-[var(--color-white)]">
          Rezultate Calculator
        </h2>
      </div>

      {/* Lista rezultate */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[var(--color-white)]">
        {results.length === 0 ? (
          <p className="text-[var(--color-text-secondary)] text-center">
            Nu există rezultate salvate.
          </p>
        ) : (
          results.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-white/90 border border-[var(--color-border)] hover:border-[var(--color-primary-hover)] transition-colors"
            >
              <span className="text-sm font-medium text-[var(--color-text-secondary)] break-words">
                {item.label}
              </span>
              <span className="text-lg font-bold text-[var(--color-dark)] flex-shrink-0">
                {item.result}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Buton resetare */}
      <div className="px-6 pb-6 flex-shrink-0 bg-[var(--color-white)]">
        <Button
          variant="primary"
          size="md"
          onClick={handleReset}
          className="w-full"
        >
          Resetează statistici
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
