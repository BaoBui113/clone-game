"use client";
import React, { useState } from "react";
import { SystemItem } from "./components/SystemItem";
import { useScreen } from "@/libs/hooks/useScreen";
import { useHomeContext } from "./provider/home-provider";

type Props = {};

export function BoardSystems({}: Props) {
  const isLg = useScreen("lg");
  const [tabHeader, setTabHeader] = useState(TAB_HEADER);
  const [tabActive, setTabActive] = useState<"NOTIFY" | "EVENT" | "FAQ">(
    "NOTIFY"
  );
  return (
    <section className="container my-6 lg:my-14">
      <div className="flex flex-row items-center justify-start p-3 overflow-x-auto bg-black gap-x-8 lg:hidden">
        {tabHeader.map((tab, index) => (
          <div
            onClick={() => setTabActive(tab.tabName)}
            className={` py-2  ${
              tabActive === tab.tabName
                ? "border-warning text-warning"
                : "border-black text-white"
            } w-14 cursor-pointer whitespace-nowrap border-b-2 text-center transition-all delay-75`}
            key={index}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="">
        <IsDesktopBoard />

        <IsMobileBoardTab tabSupport={tabActive} />
      </div>
    </section>
  );
}
function IsDesktopBoard() {
  const { mainBoardEvent, mainBoardFaq, mainBoardNotify } = useHomeContext();

  return (
    <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 ">
      <SystemItem
        title="공지사항"
        icon={"/images/svg/icon-notify.svg"}
        listContent={mainBoardNotify?.list}
        path={"?support=true&tag=notify"}
      />
      <SystemItem
        title="이벤트"
        icon={"/images/svg/icon-success.svg"}
        listContent={mainBoardEvent?.list}
        path={"?support=true&tag=event"}
      />
      <SystemItem
        title="FAQ"
        icon={"/images/svg/icon-faq.svg"}
        listContent={mainBoardFaq?.list}
        path={"?support=true&tag=faq"}
      />
    </div>
  );
}
function IsMobileBoardTab({ tabSupport }: { tabSupport: string }) {
  const { mainBoardEvent, mainBoardFaq, mainBoardNotify } = useHomeContext();

  return (
    <div className="block lg:hidden">
      {tabSupport === "NOTIFY" ? (
        <SystemItem
          title="공지사항"
          icon={"/images/svg/icon-notify.svg"}
          listContent={mainBoardNotify?.list}
          path={"?support=true&tag=notify"}
        />
      ) : tabSupport === "EVENT" ? (
        <SystemItem
          title="이벤트"
          icon={"/images/svg/icon-success.svg"}
          listContent={mainBoardEvent?.list}
          path={"?support=true&tag=event"}
        />
      ) : tabSupport === "FAQ" ? (
        <SystemItem
          title="FAQ"
          icon={"/images/svg/icon-faq.svg"}
          listContent={mainBoardFaq?.list}
          path={"?support=true&tag=faq"}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

const TAB_HEADER: {
  label?: string;
  tabName?: string | any;
}[] = [
  {
    label: "공지사항",
    tabName: "NOTIFY",
  },
  {
    label: "이벤트",
    tabName: "EVENT",
  },
  {
    label: "FAQ",
    tabName: "FAQ",
  },
];
