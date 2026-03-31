import './App.css'
import ProductsPage from "./components/pages/ProductsPage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./components/pages/ProductPage";
import { Container } from '@chakra-ui/react';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/Product/:id" element={<ProductPage />} />
        </Routes>
      </Container>
    </>
  );
}
export default App;
