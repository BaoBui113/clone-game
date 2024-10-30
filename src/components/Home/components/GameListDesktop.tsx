import { useCallback, useEffect, useState } from "react";

import { GameItem } from "./GameItem";
import { Button } from "@/components/shared/utils/form/Button";
import { BiChevronDown } from "react-icons/bi";
import { RiArrowUpSLine } from "react-icons/ri";
import {
  ArgumentTypeInput,
  useDefaultContext,
} from "@/libs/provider/default-provider";
import { GameItemSkeleton } from "./GameItemSkeleton";
import { useHomeContext } from "../provider/home-provider";

export function GameListDesktop({ gameList }: { gameList: any[] }) {
  const {
    agreeRuleGame,
    gameCheck,
    goHLGame,
    goSlotGame,
    goMiniExec,
    goAllbetExec,
  } = useDefaultContext();
  const { isLoadSkeleton } = useHomeContext();
  const [showMore, setShowMore] = useState(false);
  const [infoGameStart, setInfoGameStart] = useState<{
    game_id: string;
    game_title: string;
    os: string;
    vendor: string;
  }>(null as any);
  const [games, setGames] = useState<any[]>([]);

  const handleStartGame = useCallback(
    ({ game_title, game_id, vendor, os }: ArgumentTypeInput) => {
      if (agreeRuleGame?.status) {
        (async () => {
          const isCheck = gameCheck?.(game_title as string);

          if (isCheck) {
            try {
              switch (game_title) {
                case "HL":
                  goHLGame?.({
                    game_id: game_id,
                    game_title: game_title,
                    os: os,
                    vendor: vendor,
                  });
                  break;
                case "slot":
                  goSlotGame?.(game_title);
                  break;
                case "C_ALL":
                  goAllbetExec?.(game_title);
                  break;
                case "MINI":
                  goMiniExec?.("Mini");
                  break;
                default:
                  break;
              }
            } catch (error) {
              console.error("An error occurred:", error);
            }
          }
        })();
      }
    },
    [agreeRuleGame?.status]
  );

  useEffect(() => {
    if (infoGameStart) {
      const { game_id, game_title, os, vendor } = infoGameStart;
      handleStartGame({
        game_id: game_id,
        game_title: game_title,
        os: os,
        vendor: vendor,
      });
    }
  }, [infoGameStart, handleStartGame]);

  useEffect(() => {
    if (gameList?.length >= 10) {
      const listGame = gameList?.slice(0, 10);
      if (!showMore) {
        setGames(listGame);
      } else {
        setGames(gameList);
      }
    } else {
      setGames(gameList);
    }
  }, [showMore, gameList]);

  return (
    <>
      {isLoadSkeleton ? (
        <div className={` grid h-full grid-cols-5 my-[35px] gap-8`}>
          {[...new Array(10)]?.map((item, index) => (
            <GameItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className={`grid h-full grid-cols-5 my-[35px]  gap-8 transition-all ease-in`}>
          {games?.map((game, index) => (
            <GameItem
              key={index}
              game={game}
              getInfoGameStart={(game) => setInfoGameStart(game)}
            />
          ))}
        </div>
      )}
      {games?.length >= 10 && (
        <Button
          icon={!showMore ? <BiChevronDown /> : <RiArrowUpSLine />}
          iconPosition="end"
          iconClassName={"!ml-1"}
          text={!showMore ? "Show More" : "Hidden"}
          className={
            "mx-auto flex flex-row items-center justify-center border-none text-xs !text-warning"
          }
          onClick={() => {
            setShowMore(!showMore);
          }}
        />
      )}
    </>
  );
}
