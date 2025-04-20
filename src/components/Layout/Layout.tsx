import React from "react";
import { Outlet } from "react-router-dom";

interface Props {}

const Layout = (props: Props) => {
  return (
    <>
      <div className="bg-[#FFFFED] h-screen w-full">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
