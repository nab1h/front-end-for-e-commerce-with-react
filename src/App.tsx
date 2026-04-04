import './App.css'
import ProductsPage from "./components/pages/ProductsPage";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./components/pages/ProductPage";
import AppLayout from './layout/AppLayout';
import AuthForms from './components/AuthForms';
import HomePage from './components/pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './components/pages/CartPage';
import PublicRoute from './components/PublicRoute';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/Products" element={<ProductsPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/Product/:id" element={<ProductPage />} />
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthForms />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}
export default App;
