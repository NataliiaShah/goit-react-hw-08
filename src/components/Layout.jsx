import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader/AppHeader";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <AppHeader />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Toaster />
    </>
  );
};

export default Layout;