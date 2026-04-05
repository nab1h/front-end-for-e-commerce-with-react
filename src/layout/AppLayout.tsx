import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { type FC } from "react";
import CartDrawer from "@/components/CartDrawer";

const AppLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <CartDrawer />
    </>
  );
};

export default AppLayout;
