"use client";
import Image from "next/image";
import React from "react";
import { boxStyle } from "../MenuSupport";
import { useScreen } from "@/libs/hooks/useScreen";
import { useAuth } from "@/libs/provider/auth-provider";
import { useRouter } from "next/navigation";

export type SupportPropsType = {
  image: string;
  title: string;
  url?: string;
  subtitle?: string;
};

export default function SupportItem({
  image,
  title,
  url,
  subtitle,
}: SupportPropsType) {
  const isXl = useScreen("xl");
  const isLg = useScreen("lg");
  const {user,setOpenLoginForm} = useAuth();
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 p-4 lg:w-[165px] xl:w-[223px] cursor-pointer"
      style={boxStyle}
      onClick={()=>{
        if(!user){
          setOpenLoginForm?.(true)
        }else{
          router.push(`?${url}`)
        }
      }}
    >
      <Image
        src={image || "/"}
        alt={title}
        width={isXl ? 100 : isLg ? 73 : 50}
        height={isXl ? 100 : isLg ? 73 : 50}
        className="object-cover h-auto"
      />
      <div className="text-base text-white lg:text-2xl">{title}</div>
      <div className="text-[10px] text-warning lg:text-sm">{subtitle}</div>
    </div>
  );
}
