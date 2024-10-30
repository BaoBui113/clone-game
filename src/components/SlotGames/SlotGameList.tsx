import React, { useEffect, useState } from "react";
import { Spinner } from "../shared/utils/misc/spinner";
import { Button } from "../shared/utils/form/Button";
import { useDefaultContext } from "@/libs/provider/default-provider";

type Props = {
  categoryActive: string;
};

export function SlotGameList({ categoryActive }: Props) {
  const { slotGames, goSlotGame, goHLGame } = useDefaultContext();
  const [visibleItems, setVisibleItems] = useState(30);
  const [listSlotGame, setListSlotGame] = useState([]);


  useEffect(() => {
    (() => {
      goSlotGame?.("slot");
    })();
  }, []);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 30);
  };

  const handleStartGame = (game: any) => {
    if (game) {
      goHLGame?.({
        game_id: game.id,
        game_title: "HL",
        os: "pc",
        vendor: game.vendor,
      });
    }
  };

  useEffect(() => {
    if (categoryActive) {
      const listGameFilter = slotGames?.data?.filter(
        (item: any) => item.vendor_ko === categoryActive
      );
      setListSlotGame(listGameFilter);
    } else {
      setListSlotGame(slotGames?.data);
    }
  }, [categoryActive, slotGames]);

  console.log("listSlotGame", listSlotGame);


  if (!slotGames) return <Spinner />;
  return (
    <div className="container">
      <div className="my-3 text-xl font-semibold text-white">{categoryActive && `게임 목록 선택: ${categoryActive}`}</div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {listSlotGame
          ?.slice(0, visibleItems)
          .map((game: any, index: number) => (
            <SlotGameItem
              key={index}
              game={game}
              getGameStart={handleStartGame}
            />
          ))}
      </div>
      {visibleItems < listSlotGame.length && (
        <div className="flex flex-row items-center justify-center my-5 text-center">
          <Button
            onClick={handleLoadMore}
            text="Load More"
            className={" border-none bg-warning px-5 py-1 text-sm"}
          />
        </div>
      )}
    </div>
  );
}

const styleBox = {
  background:
    "linear-gradient(180deg, rgba(255, 87, 87, 0.20) 0%, rgba(255, 255, 255, 0.20) 0.01%, rgba(217, 217, 217, 0.10) 100%)",
  boxShadow:
    "0px 1px 10px -1px rgba(255, 255, 255, 0.70) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.40)",
};
function SlotGameItem({
  game,
  getGameStart,
}: {
  game: any;
  getGameStart: (game: any) => void;
}) {
  return (
    <div
      className="p-3 overflow-hidden rounded-md shadow-md cursor-pointer"
      style={styleBox}
      onClick={() => {
        getGameStart(game);
      }}
    >
      <img
        src={game.thumbnail}
        alt="image game"
        className="object-cover w-auto overflow-hidden transition-transform ease-linear transform rounded hover:scale-105"
      />
      <div className="mt-2 text-sm text-warning">{game?.ko}</div>
    </div>
  );
}
