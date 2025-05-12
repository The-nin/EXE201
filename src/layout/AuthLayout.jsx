import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAuth from "../components/Header/HeaderAuth";

function AuthLayout() {
  return (
    <div>
      <HeaderAuth />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
