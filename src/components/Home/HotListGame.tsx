import { useScreen } from "@/libs/hooks/useScreen";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useHomeContext } from "./provider/home-provider";
import { GameListDesktop } from "./components/GameListDesktop";
import { GameListSlider } from "./components/GameListSlider";
import { GAME_LIST } from "@/libs/constants/list-game";
type Props = {};

export function HotListGame({}: Props) {
  const isLg = useScreen("lg");
  const { tabMenuActive } = useHomeContext();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const listGameActive = GAME_LIST.find(
      (game, idx) => game.tab === tabMenuActive
    )?.listGame;
    setGames(listGameActive as any);
  }, [tabMenuActive]);

  return (
    <section className="container my-8 border-b border-[#6e6e6e]  lg:mt-16 lg:pb-[70px]">
      <div className="flex flex-row items-center justify-start gap-3">
        <Image
          src="/images/svg/icon-game-hot.svg"
          alt="icon"
          width={isLg ? 56 : 40}
          height={isLg ? 56 : 40}
        />
        <h4 className="text-xl font-semibold text-white lg:text-4xl">
          Game {tabMenuActive} casino
        </h4>
      </div>
      {isLg ? (
        <GameListDesktop gameList={games} />
      ) : (
        <GameListSlider gameList={games} />
      )}
    </section>
  );
}
