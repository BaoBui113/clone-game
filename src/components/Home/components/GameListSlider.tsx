import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useCallback, useEffect, useState } from "react";

import { GameItem } from "./GameItem";
import {
  ArgumentTypeInput,
  useDefaultContext,
} from "@/libs/provider/default-provider";
import { useScreen } from "@/libs/hooks/useScreen";
import { useHomeContext } from "../provider/home-provider";
import { GameItemSkeleton } from "./GameItemSkeleton";

export function GameListSlider({ gameList }: { gameList: any[] }) {
  const isMd = useScreen("md");
  const {
    agreeRuleGame,
    gameCheck,
    goHLGame,
    goSlotGame,
    goMiniExec,
    goAllbetExec,
  } = useDefaultContext();
  const { isLoadSkeleton } = useHomeContext();
  const [infoGameStart, setInfoGameStart] = useState<{
    game_id: string;
    game_title: string;
    os: string;
    vendor: string;
  }>(null as any);

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
  return (
    <Swiper
      className="h-full my-4"
      slidesPerView={isMd ? 3 : 2}
      spaceBetween={10}
      // centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      loop={true}
    >
      {isLoadSkeleton ? (
        <>
          {[...new Array(8)].map((item, index) => (
            <SwiperSlide key={index}>
              <GameItemSkeleton />
            </SwiperSlide>
          ))}
        </>
      ) : (
        <>
          {gameList.map((game, index) => (
            <SwiperSlide key={index}>
              <GameItem
                game={game}
                getInfoGameStart={(game) => setInfoGameStart(game)}
              />
            </SwiperSlide>
          ))}
        </>
      )}
    </Swiper>

  );
}
