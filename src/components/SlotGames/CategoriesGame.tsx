import React, { useEffect } from "react";
import { useHomeContext } from "../Home/provider/home-provider";
import { Spinner } from "../shared/utils/misc/spinner";
import { useDefaultContext } from "@/libs/provider/default-provider";

type Props = {
  getFilterCategory?: (category: string) => void;
  categoryActive: string;
};

export function CategoriesGame({ categoryActive, getFilterCategory }: Props) {
  const { slotGames, goSlotGame } = useDefaultContext();

  useEffect(() => {
    (() => {
      goSlotGame?.("slot");
    })();
  }, []);

  if (!slotGames) return <Spinner />;
  return (
    <div className="bg-black">
      <div className="mx-2 text-lg text-white uppercase">Categories</div>

      <div className="flex flex-row items-start justify-start gap-1 overflow-y-auto rounded  p-2 lg:h-[700px] lg:flex-col">
        <div
          className="w-full px-2 py-1 text-white rounded-md cursor-pointer whitespace-nowrap bg-warning hover:bg-yellow-500 hover:text-black"
          onClick={() => getFilterCategory?.(null as any)}
        >
          모든 게임들
        </div>
        {slotGames?.categories.map((category: string, idx: number) => (
          <div
            className={`w-full cursor-pointer whitespace-nowrap rounded-md bg-warning px-2 py-1 text-white hover:bg-yellow-500 hover:text-black ${categoryActive == category ? "bg-yellow-500 !text-black" : ""
              }`}
            key={idx}
            onClick={() => getFilterCategory?.(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
