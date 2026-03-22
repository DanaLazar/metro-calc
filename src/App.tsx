import { BrowserRouter, Route, Routes } from "react-router";
import ResultsPage from "./components/pages/resultsPage/ResultsPage";
import Layout from "./components/layout/Layout";
import CalculatorPage from "./components/pages/calculatorPage/CalculatorPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CalculatorPage />} />
          <Route path="/rezultate" element={<ResultsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
