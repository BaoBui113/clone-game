"use client"
import { useScreen } from "@/libs/hooks/useScreen";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function BoxTutorialSupport({
    image,
    title,
    url,
  }: {
    image: string;
    title: string;
    url:string | any
  }) {
    const boxStyle = {
      borderRadius: "4px",
      border: "1.619px solid rgba(255, 255, 255, 0.20)",
      background:
        "lineargradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.20) 0.01%, rgba(217, 217, 217, 0.10) 100%)",
      boxShadow:
        "0px 0px 8.095044136047363px -0.8095043897628784px rgba(255, 255, 255, 0.40) inset, 0px 0.8095043897628784px 4.857025623321533px 0px rgba(255, 255, 255, 0.30)",
    };
    const isLg = useScreen("lg");
    const router = useRouter();
    return (
      <div
        style={boxStyle}
        className="flex flex-col items-center justify-center p-2 cursor-pointer lg:p-4"
        onClick={()=>{router.push(url)}}
      >
        <Image
          src={image}
          alt={title}
          width={isLg ? 80 : 34}
          height={isLg ? 80 : 34}
          className="object-cover"
        />
        <div className="text-white lg:text-lg text-[9px]">{title}</div>
      </div>
    );
  }