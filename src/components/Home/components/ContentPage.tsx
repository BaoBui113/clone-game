"use client";
import React from "react";
import BannerHomePage from "./BannerHomePage";
import RankItems from "./RankItems";
import BoxInforItems from "./BoxInforItems";
const badge = [
  {
    id: 1,
    name: "Badge 1",
  },
  {
    id: 2,
    name: "Badge 2",
  },
  {
    id: 3,
    name: "Badge 3",
  },
  {
    id: 4,
    name: "Badge 4",
  },
  {
    id: 5,
    name: "Badge 5",
  },
];
const itemInfors = [
  {
    title: "파트너 제휴 문의 바로가기",
    des: "WITH SANDS CASINO PARTNERSHIP INQUIRY ",
  },
  {
    title: "자주 묻는 질문 바로가기",
    des: "FREQUENTLY ASKED QUESTIONS",
  },
  {
    title: "24시 상담 안내 ",
    des: "24-HOUR CONSULTAION INFORMATION",
  },
];
const ContentPage = () => {
  return (
    <div className="w-full bg-[#1B1B1B] p-[10px]">
      <div className="mb-8">
        <BannerHomePage />
      </div>
      <div className="mb-16 grid grid-cols-12 gap-5">
        <div className="col-span-4 w-full">
          <RankItems
            listRanks={badge}
            title="공지사항"
            icon="/images/icon/bell-badge.svg"
          />
        </div>
        <div className="col-span-4 w-full">
          <RankItems
            listRanks={badge}
            title="공지사항"
            icon="/images/icon/rank.svg"
          />
        </div>
        <div className="col-span-4 w-full">
          <RankItems
            listRanks={badge}
            title="공지사항"
            icon="/images/icon/medal.svg"
          />
        </div>
      </div>
      <div className="mb-10 grid grid-cols-12 gap-[10px]">
        {itemInfors.map((item, index) => {
          return (
            <div key={index} className="col-span-4 w-full">
              <BoxInforItems des={item.des} title={item.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentPage;
