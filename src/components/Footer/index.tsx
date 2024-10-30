import Image from "next/image";
import React from "react";
const logoTop = [
  "/images/logo/logo1.svg",
  "/images/logo/logo2.svg",
  "/images/logo/logo3.svg",
  "/images/logo/logo4.svg",
  "/images/logo/logo5.svg",
];

const logoBottom = ["/images/logo/logo6.svg", "/images/logo/logo7.svg"];

const Logo = ({ listLogo }: { listLogo: string[] }) => {
  return (
    <div className="flex items-center justify-center gap-[100px]">
      {listLogo.map((item, index) => {
        return (
          <div key={index} className="relative flex h-[60px] w-[90px]">
            <Image src={item} alt="logo" fill className="object-cover" />
          </div>
        );
      })}
    </div>
  );
};

export default function Footer() {
  return (
    <div className=" bg-[#1B1B1B]">
      <div className="mb-6 flex w-full justify-center">
        <div className="relative flex h-10 w-[246px] justify-center">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="mb-16">
        <Logo listLogo={logoTop} />
        <Logo listLogo={logoBottom} />
      </div>
      <div className="pb-10 text-center text-sm font-normal leading-4 text-[#E3E3E3]">
        <p className="mb-2">
          By accessing, continuing to use or navigating throughout this site you
          accept thata we will use certain browser cookies to improve your
          customer experience with us M&M Casino only uses cookies which will
          improve your experience with us and will not interfere with your
          privacy
        </p>
        <p>Copyright ⓒ M&M Casino. All rights reserved.</p>
      </div>
    </div>
  );
}
