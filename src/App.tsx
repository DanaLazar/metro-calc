import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ResultsPage from "@/components/pages/resultsPage/ResultsPage";
import Layout from "@/components/layout/Layout";
import CalculatorPage from "@/components/pages/calculatorPage/CalculatorPage";
import FormPage from "@/components/pages/FormPage";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<CalculatorPage />} />
            <Route path="/rezultate" element={<ResultsPage />} />
            <Route path="/form" element={<FormPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
