import Image from "next/image";
import React from "react";

export default function BoxInforItems({
  title,
  des,
}: {
  title: string;
  des: string;
}) {
  return (
    <div className="flex min-h-[108px] w-full cursor-pointer items-center rounded-xl bg-[#0A0A0A] p-4">
      <div className="flex-1">
        <div className="relative mb-[2px] h-6 w-[151px]">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            fill
            className="object-cover"
          />
        </div>
        <p className="mb-[2px] text-xl font-black leading-7 text-white">
          {title}
        </p>
        <p className="text-sm font-normal leading-5 text-[#EBEBF599]">{des}</p>
      </div>
      <div className="relative h-4 w-4">
        <Image src={"/images/icon/next.svg"} alt="icon" fill />
      </div>
    </div>
  );
}
