import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { type FC } from "react";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";


const AppLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <CartDrawer />
      <Footer />
    </>
  );
};

export default AppLayout;
