import React from "react";
import { Outlet } from "react-router-dom";

interface Props {}

const Layout = (props: Props) => {
  return (
    <>
      <div className="bg-cyan-700 h-screen w-full">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
