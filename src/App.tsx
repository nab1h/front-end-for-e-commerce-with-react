
import { Container } from "@chakra-ui/react";
import './App.css'
import ProductsPage from "./components/pages/ProductsPage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./components/pages/ProductPage";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <ProductsPage />
      </Container>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/Product" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App
