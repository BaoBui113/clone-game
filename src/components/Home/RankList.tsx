"use client";
import React, { useState } from "react";

import { RankBoxItem } from "./components/RankBoxItem";
import { BoxTutorialSupport } from "./components/BoxtutorialSupport";
import { useScreen } from "@/libs/hooks/useScreen";
import { useHomeContext } from "./provider/home-provider";
import { useAuth } from "@/libs/provider/auth-provider";

type Props = {};

export default function RankList({}: Props) {
  const isLg = useScreen("lg");
  const [tabActive, setTabActive] = useState<"TOP" | "WITHDRAWAL_STATUS">(
    "TOP"
  );
  return (
    <section className="container py-14">
      <div className="flex flex-row items-center justify-start p-3 overflow-x-auto bg-black gap-x-8 lg:hidden">
        {TAB_HEADER.map((tab, index) => (
          <div
            onClick={() => setTabActive(tab.tabName)}
            className={` py-2  ${
              tabActive === tab.tabName
                ? "border-warning text-warning"
                : "border-black text-white"
            }  cursor-pointer whitespace-nowrap border-b-2 text-center transition-all delay-75`}
            key={index}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <IsDesktopRankList />

        <IsMobileRankListTab tabActive={tabActive} />

        <MenuTutorialSupport />
      </div>
    </section>
  );
}

function IsDesktopRankList() {
  const { withDrawDay, withDrawWeek } = useHomeContext();
  return (
    <div className="hidden gap-8 lg:col-span-2 lg:grid lg:grid-cols-2">
      <RankBoxItem
        title="금주 출금 TOP"
        icon="/images/svg/icon-top.svg"
        contents={withDrawWeek?.list as any}
        textError="금주 출금 TOP10 데이터가 존재하지 않습니다."
      />
      <RankBoxItem
        title="실시간 출금현황"
        icon="/images/svg/icon-token.svg"
        contents={withDrawDay?.list as any}
        textError="실시간 데이터가 존재하지 않습니다."
      />
    </div>
  );
}

function IsMobileRankListTab({ tabActive }: { tabActive: string }) {
  const { withDrawDay, withDrawWeek } = useHomeContext();

  return (
    <div className="block lg:hidden">
      {tabActive === "TOP" ? (
        <RankBoxItem
          title="금주 출금 TOP"
          icon="/images/svg/icon-top.svg"
          contents={withDrawWeek?.list as any}
          textError="금주 출금 TOP10 데이터가 존재하지 않습니다."
        />
      ) : tabActive === "WITHDRAWAL_STATUS" ? (
        <RankBoxItem
          title="실시간 출금현황"
          icon="/images/svg/icon-token.svg"
          contents={withDrawDay?.list as any}
          textError="실시간 데이터가 존재하지 않습니다."
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export function MenuTutorialSupport() {
  const { user } = useAuth();
  return (
    <div className="hidden gap-2 lg:grid lg:grid-cols-2 lg:gap-4">
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

export const MENU_TUTORIAL_SUPPORT = [
  {
    image: "/images/svg/spp-poker.svg",
    title: "게임방법",
    url: "?rule=true",
    isActive: true,
  },
  {
    image: "/images/svg/spp-remote.svg",
    title: "1:1원격지원",
    url: "?support=true&tag=remote",
    isActive: true,
  },
  {
    image: "/images/svg/spp-rule.svg",
    title: "PC안전지킴이",
    url: "?support=true&tag=safe",
    isActive: true,
  },
  {
    image: "/images/svg/spp-partner.svg",
    title: "파트너제휴",
    url: "?support=true&tag=partner",
    isActive: false,
  },
];

const TAB_HEADER: {
  label?: string;
  tabName?: string | any;
}[] = [
  {
    label: "금주 출금 TOP",
    tabName: "TOP",
  },
  {
    label: "실시간 출금현황",
    tabName: "WITHDRAWAL_STATUS",
  },
];
