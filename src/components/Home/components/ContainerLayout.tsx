import React from "react";
import SideBars from "./SideBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="block min-h-screen md:flex">
      {/* Sticky Sidebar */}
      <div className="sticky top-0 hidden h-screen md:block md:w-1/4">
        <SideBars />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default ContainerLayout;

