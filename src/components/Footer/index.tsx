import Image from "next/image";
import React from "react";


const logo = [
  "/images/logo/logo1.svg",
  "/images/logo/logo2.svg",
  "/images/logo/logo3.svg",
  "/images/logo/logo4.svg",
  "/images/logo/logo5.svg",
  "/images/logo/logo6.svg",
  "/images/logo/logo7.svg"
]

const FOOTERBOTTOMLIST =
  [
    {
      icon: '/images/icon/grid.svg',
      name: 'MENU'
    },
    {
      icon: '/images/icon/home.svg',
      name: 'HOME'
    },
    {
      icon: '/images/icon/account.svg',
      name: 'ACCOUNT'
    }
  ]

const FooterBottom = ({ icon, name }: { icon: string, name: string }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-6 h-6">
        <Image src={icon} alt="icon" fill />
      </div>
      <span className="text-[10px] leading-3 uppercase font-normal text-white">{name}</span>
    </div>
  )
}

export default function Footer() {
  return (
    <>
      <div className="px-[10px] bg-[#1B1B1B] w-full">
        <div className=" border-t-[1px] border-t-[#777777] border-b-[1px] border-b-[#FFF] md:border-none">
          <div className="flex justify-center w-full mb-6 md:pt-0 pt-[10px]">
            <div className="relative flex h-10 w-[246px] justify-center">
              <Image
                src={"/images/logo.png"}
                alt="logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="mb-16 max-w-[1000px] mx-auto">
            <div className="flex flex-wrap items-center gap-x-[100px] gap-y-6 justify-center">
              {logo.map((item, index) => {
                return (
                  <div key={index} className="relative flex h-[60px] w-[90px]">
                    <Image src={item} alt="logo" fill className="object-cover" />
                  </div>
                );
              })}
            </div>

          </div>
          <div className="pb-10 px-5 md:px-0 text-center text-sm font-normal leading-4 text-[#E3E3E3]">
            <p className="flex flex-col gap-2 mb-4 md:mb-2">
              <span className="text-[#777] md:text-[#E3E3E3]">
                By accessing, continuing to use or navigating throughout this site you
                accept thata we will use certain browser cookies to improve your
                customer experience with us
              </span>
              <span className="text-[#777] md:text-[#E3E3E3]">
                M&M Casino only uses cookies which will
                improve your experience with us and will not interfere with your
                privacy
              </span>

            </p>
            <p>Copyright ⓒ M&M Casino. All rights reserved.</p>
          </div>

        </div>


      </div>
      <div className="sticky bottom-0 left-0 right-0 z-50 block md:hidden">
        <div className="flex bg-[#111316] justify-between px-5 pt-2">
          {FOOTERBOTTOMLIST.map((item, index) => {
            return <FooterBottom key={index} icon={item.icon} name={item.name} />
          })}
        </div>
        <div className="bg-[#0E0E0E] flex justify-center w-full pt-5 pb-2">
          <div className="bg-white w-[122px] h-[5px] rounded-md" />
        </div>
      </div>

    </>
  );
}
