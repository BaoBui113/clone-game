"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useHomeContext } from "./provider/home-provider";

type Props = {};

export function MainMenu({}: Props) {
  const [menu, setMenu] = useState<MainMenuTypes>(MAIN_MENU);
  const { tabMenuActive, setTabMenuActive } = useHomeContext();
  return (
    <section className="z-10 bg-black">
      <ul
        className={`container grid grid-cols-2 lg:flex lg:flex-row
            lg:items-center lg:justify-center lg:gap-6
        `}
      >
        {!!menu.length &&
          menu.map((item, index) => (
            <div
              className={`group relative flex w-full cursor-pointer flex-col items-center py-2 lg:w-[150px] lg:p-6 lg:py-6 ${
                tabMenuActive === item.tabName
                  ? "border-b-2 border-warning text-warning"
                  : ""
              }`}
              key={index}
              onClick={() => {
                setTabMenuActive?.(item.tabName as string);
              }}
            >
              <h4
                className={`whitespace-nowrap text-sm font-semibold lg:text-xl ${
                  tabMenuActive === item.tabName
                    ? " text-warning"
                    : "text-white "
                }`}
              >
                {item.title}
              </h4>
              <div className="text-[10px] text-[#ffca00]">{item.subtitle}</div>

              {/* {!!item?.subMenu?.length && isLg ? (
                <div className="absolute -left-[320px] top-20  hidden h-auto w-auto transition-all  group-hover:block">
                  <div className="absolute w-full h-6 transform -translate-x-1/2 -translate-y-1/2 -top-2 left-1/2"></div>
                  <ul className="flex flex-row flex-wrap items-start justify-start lg:w-[1214px] ">
                    {item?.subMenu.map((game, index) => (
                      <li className="bg-black" key={index}>
                        <GameItemBox game={game} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <></>
              )} */}
            </div>
          ))}
      </ul>
    </section>
  );
}

function GameItemBox({ game }: { game: any }) {
  return (
    <Link href={game.url || "/"}>
      <div className="border border-black hover:border-warning">
        <Image
          src={game.image}
          alt={game.title}
          className=""
          width={200}
          height={150}
        />
        <div className="flex flex-col items-center justify-center gap-2 p-3">
          <div className="text-warning">{game.title}</div>
          <div className="text-sm text-gray-500">{game.subtitle}</div>
          <div className="text-white uppercase">Play Now</div>
        </div>
      </div>
    </Link>
  );
}

type MainMenuTypes = {
  title: string;
  url?: string;
  tabName?: string;
  subtitle?: string;
}[];
const MAIN_MENU: MainMenuTypes = [
  {
    title: "라이브카지노",
    url: "/",
    subtitle: "Live casino",
    tabName: "Live",
  },
  {
    title: "호텔카지노",
    url: "/",
    subtitle: "Hotel casino",
    tabName: "Hotel",
  },
  {
    title: "슬롯",
    url: "/",
    subtitle: "Slot games",
    tabName: "Slot",
  },
  {
    title: "미니게임",
    url: "/",
    subtitle: "Mini games",
    tabName: "Mini",
  },
];
