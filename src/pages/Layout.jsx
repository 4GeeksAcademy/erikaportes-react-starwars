import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Layout = () => {
  return (
    <div className="bg-dark min-vh-100">
      <Navbar />
      <Outlet />
    </div>
  );
};