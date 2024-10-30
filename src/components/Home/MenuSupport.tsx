"use client";
import Image from "next/image";
import React, { useState } from "react";
import SupportItem, { SupportPropsType } from "./components/SupportItem";
import { useScreen } from "@/libs/hooks/useScreen";
import { MENU_TUTORIAL_SUPPORT } from "./RankList";
import Link from "next/link";
import { useAuth } from "@/libs/provider/auth-provider";
import { BoxTutorialSupport } from "./components/BoxtutorialSupport";

type Props = {};
export const boxStyle = {
  borderRadius: "4px",
  border: "2px solid rgba(254, 245, 166, 0.40)",
  background:
    "lineargradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.20) 0.01%, rgba(217, 217, 217, 0.10) 100%)",
  boxShadow:
    "0px 0px 120px -1px rgba(255, 243, 137, 0.50) inset, 0px 1px 8px 0px rgba(255, 243, 137, 0.30)",
};

export function MenuSupport({}: Props) {
  const [menuSupport, setMenuSupport] = useState(MENU_SUPPORT);
  const isLg = useScreen("lg");
  return (
    <section className="container my-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-6">
        {!!menuSupport.length &&
          menuSupport.map((menu, index) => (
            <SupportItem
              key={index}
              image={menu?.image}
              title={menu.title}
              subtitle={menu.subtitle}
              url={menu.url}
            />
          ))}
        <Link
          target="_blank"
          href="https://www.google.com/intl/ko/chrome/"
          className="flex flex-col justify-center gap-3 p-4"
          style={boxStyle}
        >
          <div className="flex flex-row items-center justify-start gap-2 ">
            <Image
              src={"/images/svg/icon-chrome.svg"}
              alt="icon google"
              height={isLg ? 50 : 36}
              width={isLg ? 50 : 36}
              className="object-cover h-auto"
            />
            <div>
              <div className="text-base text-white lg:text-xl">입금신청</div>
              <div className="text-[10px] text-warning lg:text-sm">
                Chrome download
              </div>
            </div>
          </div>
          <p className="text-[9px] text-white lg:text-sm">
            플러스 카지노 이벤트및 게임규정안내플러스 카지노 이벤트및
            게임규정안내
          </p>
        </Link>
        <MenuTutorialSupportMobile />
      </div>
    </section>
  );
}
export function MenuTutorialSupportMobile() {
  const { user } = useAuth();
  return (
    <div className="grid grid-cols-2 gap-2 lg:gap-4 lg:hidden">
      {MENU_TUTORIAL_SUPPORT.map((item, index) => (
        <BoxTutorialSupport
          image={item.image}
          title={item.title}
          key={index}
          url={
            !user && !item.isActive ? "?support=false&tag=partner" : item.url
          }
        />
      ))}
    </div>
  );
}

const MENU_SUPPORT: SupportPropsType[] = [
  {
    image: "/images/svg/icon-deposit.svg",
    title: "입금신청",
    url: "dialogWallet=true&tag=deposit",
    subtitle: "Deposit",
  },
  {
    image: "/images/svg/icon-withdraw.svg",
    title: "출금신청",
    url: "dialogWallet=true&tag=withdraw",
    subtitle: "Withdraw",
  },
  {
    image: "/images/svg/icon-tranfer.svg",
    title: "게임머니이동신청",
    url: "dialogWallet=true&tag=transfer",
    subtitle: "Transfer",
  },
  {
    image: "/images/svg/icon-history.svg",
    title: "입출금내역",
    url: "dialogWallet=true&tag=banking",
    subtitle: "Money history",
  },
];
