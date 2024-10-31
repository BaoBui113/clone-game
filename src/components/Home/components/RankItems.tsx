import Input from "@/components/shared/utils/input";
import Image from "next/image";
import React from "react";

export default function RankItems({
  icon,
  title,
  listRanks,
}: {
  icon: string;
  title: string;
  listRanks: { id: number; name: string }[];
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-0 md:mb-5 flex items-center gap-[10px] bg-black md:bg-transparent p-3 md:p-0">
        <div className="relative w-6 h-6">
          <Image src={icon} alt="icon" fill />
        </div>
        <span className="text-sm font-medium text-white">{title}</span>
      </div>
      <div className="flex flex-col mb-5">
        {listRanks.map((rank, index) => {
          return (
            <Input
              className={
                index % 2 === 0
                  ? "bg-[#3B3B3B] focus:bg-[#3B3B3B]"
                  : "bg-[#313131] focus:bg-[#313131]"
              }
              key={rank.id}
              value={rank.name}
              placeholder="Title"
            />
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-2 cursor-pointer md:gap-0">
        <span className="text-xs leading-4 md:text-[10px] font-normal text-[#F7F7F7]">
          view more
        </span>
        <div className="relative h-[14px] w-[11px]">
          <Image src={"/images/icon/next.svg"} alt="next" fill />
        </div>
      </div>
    </div>
  );
}
