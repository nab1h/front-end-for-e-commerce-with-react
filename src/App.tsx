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
import { Toaster } from "@/components/ui/toaster";
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';
import Orders from './components/dashboard/Orders';
import Products from './components/dashboard/products';
function App() {
  return (
    <>
      <Toaster />
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

        {/* dashboard route */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<Products />} />
          <Route path='orders' element={<Orders />} />
        </Route>

        {/* public route */}
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
