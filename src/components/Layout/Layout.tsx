import React, { ReactComponentElement } from "react";
import Navbar from "../Navbar/Navbar";

interface ChildrenProps {
  children: React.ReactNode;
}

const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
