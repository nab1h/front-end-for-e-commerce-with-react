import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { type FC } from "react";

const AppLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppLayout;
