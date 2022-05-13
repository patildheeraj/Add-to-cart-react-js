import "./App.css";
import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import CardDetails from "./components/CardDetails";
import Cards from "./components/Cards";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cart/:id" element={<CardDetails />} />
      </Routes>
    </>
  );
}

export default App;
