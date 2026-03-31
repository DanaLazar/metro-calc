import { useForm, Controller, useWatch } from "react-hook-form";
import { Button, Select } from "@danalazar/metro-ui";
import { useResultsController } from "@/hooks/useResultsController";

type FormValues = {
  operationType: string;
};

type SelectOption = {
  label: string;
  value: string;
};

const operationOptions: SelectOption[] = [
  { label: "Toate", value: "" },
  { label: "Adunare", value: "add" },
  { label: "Scădere", value: "subtract" },
  { label: "Înmulțire", value: "multiply" },
  { label: "Împărțire", value: "divide" },
];

const getOperationType = (expression: string) => {
  if (expression.includes("+")) return "add";
  if (expression.includes("-")) return "subtract";
  if (expression.includes("×")) return "multiply";
  if (expression.includes("÷")) return "divide";
  return "";
};

const ResultsPage = () => {
  const { results, actions } = useResultsController();

  const { control } = useForm<FormValues>({
    defaultValues: { operationType: "" },
  });

  const selectedOperation = useWatch({
    control,
    name: "operationType",
    defaultValue: "",
  });

  const filteredResults = selectedOperation
    ? results.filter((r) => getOperationType(r.result) === selectedOperation)
    : results;

  return (
    <div className="w-full max-w-[540px] h-[calc(100vh-200px)] flex flex-col bg-[var(--color-white)] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--color-dark)] px-6 py-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-[var(--color-white)]">
          Rezultate Calculator
        </h2>
      </div>

      {/* Filtru operație */}
      <div className="px-6 py-4 flex-shrink-0 bg-[var(--color-white)]">
        <Controller
          name="operationType"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={operationOptions}
              ariaLabel="Filtru tip operație"
              className="w-full"
            />
          )}
        />
      </div>

      {/* Lista rezultate */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[var(--color-white)]">
        {filteredResults.length === 0 ? (
          <p className="text-[var(--color-text-secondary)] text-center">
            Nu există rezultate salvate.
          </p>
        ) : (
          filteredResults.map((item) => (
            <div
              key={item.label}
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
          onClick={actions.onReset}
          className="w-full"
        >
          Resetează statistici
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
