
import Image from "next/image";
import { Button } from "@/components/shared/utils/form/Button";
import { useAuth } from "@/libs/provider/auth-provider";
import { useToast } from "@/libs/provider/toast-provider";
import { useDefaultContext } from "@/libs/provider/default-provider";
import { GameType } from "@/libs/constants/list-game";

const styleBox = {
  background:
    "linear-gradient(180deg, rgba(255, 87, 87, 0.20) 0%, rgba(255, 255, 255, 0.20) 0.01%, rgba(217, 217, 217, 0.10) 100%)",
  boxShadow:
    "0px 1px 10px -1px rgba(255, 255, 255, 0.70) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.40)",
};
export function GameItem({
  game,
  getInfoGameStart,
}: {
  game: GameType;
  getInfoGameStart: (game: any) => void;
}) {
  const { user } = useAuth();
  const { agreeRuleGame, setAgreeRuleGame } = useDefaultContext();
  const toast = useToast();
  const gameStart = () => {
    if (game.release) {
      if (!user) {
        toast.info("로그인 후 이용해주세요.");
      } else {
        setAgreeRuleGame?.({ isOpen: true, status: false });
        getInfoGameStart(game?.argument as any);
      }
    }else{
      toast.info("게임이 개발 중입니다. ") // The game is under development.
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-between p-4 rounded-lg cursor-pointer"
      style={styleBox}
    >
      <Image
        src={game.img || "/images/bg-game-item.png"}
        alt={game.title}
        width={160}
        height={200}
        className="w-full h-auto rounded-xl"
        loading="lazy"
        onClick={gameStart}
      />
      <div className="flex flex-col items-center gap-2 mt-1 text-center">
        <div className="text-[11px] text-warning lg:text-base">
          {game.title}
        </div>
        {game.release && (
          <div className="text-[9px] text-white   lg:text-sm">
            {game.subTitle}
          </div>
        )}
        <Button
          text={game.release ? "Play now" : "Coming soon..."}
          className={`  rounded-xl px-4 lg:py-1 text-xs lg:text-base  ${
            game.release ? "border-warning" : "border-none bg-gray-500"
          }`}
          onClick={gameStart}
        />
      </div>
    </div>
  );
}
