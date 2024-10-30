import React, { useEffect, useState } from "react";
import { DialogComponentProps, DialogModal } from "../../utils/dialog/dialog";
import { BoxItem } from "./BoxItem";
import { useRouter, useSearchParams } from "next/navigation";
import { BaccaratRule } from "@/components/GameRule/BaccaratRule";
import { BlackjackRule } from "@/components/GameRule/BlackjackRule";
import { RouletteRule } from "@/components/GameRule/RouletteRule";
import { DiceRule } from "@/components/GameRule/DiceRule";
import { DragonTigerRule } from "@/components/GameRule/DragonTigerRule";
import { BullfightRule } from "@/components/GameRule/BullfightRule";
import { MahjongRule } from "@/components/GameRule/MahjongRule";
import { PokerRule } from "@/components/GameRule/PokerRule";
import { useScreen } from "@/libs/hooks/useScreen";
import { BoxTitle } from "./SupportDialog";

interface GameRuleDialogProps extends DialogComponentProps {}
const dialogStyle = {
  borderRadius: "4px",
  borderTop: "6px solid var(--yellow-yellow-500, #FFD035)",
  background: "#161616",
  boxShadow:
    "0px 1px 10px -1px rgba(255, 255, 255, 0.70) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.40)",
};

export function GameRuleDialog({ ...props }: GameRuleDialogProps) {
  const router = useRouter();
  const isLg = useScreen("lg");
  const [tabActive, setTabActive] = useState("baccarat");
  const [gameRule, setGameRule] = useState(TAB_GAME_RULES);

  return (
    <DialogModal
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
        router.push("/");
      }}
      width={900}
      className=""
      dialogBodyClass={""}
      isOverlayClick={true}
      style={dialogStyle}
      slideFromBottom="mobile-only"
      mobileSizeMode={true}
    >
      <div className="flex flex-col ">
        {!isLg && <BoxTitle title={"Game rule"} subTitle={"게임방법"} />}

        <div className="flex flex-col items-start justify-start overflow-x-auto lg:flex-row lg:items-center lg:justify-start">
          {isLg && <BoxTitle title={"Game rule"} subTitle={"게임방법"} />}
          <div className="flex flex-row items-center justify-around gap-8 mt-3 lg:mt-0 lg:w-full lg:flex-1">
            {gameRule.length &&
              gameRule.map((tab, idx) => (
                <BoxItem
                  widthImg={isLg ? 40 : 30}
                  img={tab.img}
                  title={tab.title}
                  key={idx}
                  onClick={() => setTabActive(tab.tabName)}
                  className={
                    tab.tabName === tabActive
                      ? "border-b-2 border-warning"
                      : "border-b-2 border-[#161616]"
                  }
                  classNameTitle={
                    tab.tabName === tabActive ? "text-warning" : "text-white"
                  }
                />
              ))}
          </div>
        </div>
        <div className="max-h-[500px] min-h-[100px] overflow-y-auto bg-[#3C3C3C] p-2 lg:p-7">
          {gameRule
            .filter((rule, idx) => rule.tabName === tabActive)
            .map((item, index) => (
              <div key={index}>{item.content}</div>
            ))}
        </div>
      </div>
    </DialogModal>
  );
}

const TAB_GAME_RULES: {
  title: string;
  tabName: string | any;
  img: string;
  content?: JSX.Element;
}[] = [
  {
    title: "바카라",
    tabName: "baccarat",
    img: "/images/game-rule/baccarat-1.svg",
    content: <BaccaratRule />,
  },

  {
    title: "블랙잭",
    tabName: "blackjack",
    img: "/images/game-rule/blackjack.svg",
    content: <BlackjackRule />,
  },
  {
    title: "룰렛",
    tabName: "roulette",
    img: "/images/game-rule/roulette.svg",
    content: <RouletteRule />,
  },
  {
    title: "식보",
    tabName: "dice",
    img: "/images/game-rule/dice.svg",
    content: <DiceRule />,
  },

  {
    title: "드래곤타이거",
    tabName: "dragon-tiger",
    img: "/images/game-rule/baccarat.svg",
    content: <DragonTigerRule />,
  },
  {
    title: "Bullfight",
    tabName: "bullfight",
    img: "/images/game-rule/poker-table.svg",
    content: <BullfightRule />,
  },
  {
    title: "마종",
    tabName: "mahjong",
    img: "/images/game-rule/mahjong.svg",
    content: <MahjongRule />,
  },

  {
    title: "캐리비언스터드포커",
    tabName: "poker",
    img: "/images/game-rule/baccarat-2.svg",
    content: <PokerRule />,
  },
];
