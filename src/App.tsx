import { BrowserRouter, Route, Routes } from "react-router";
import Calculator from "./components/pages/Calculator";
import Results from "./components/pages/Results";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Calculator />} />
          <Route path="/rezultate" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
