"use client";
import { MENU_TOP } from "@/libs/constants/nav-menu";
import { useAuth } from "@/libs/provider/auth-provider";
import {
  ArgumentTypeInput,
  useDefaultContext,
} from "@/libs/provider/default-provider";
import { useToast } from "@/libs/provider/toast-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
type Props = {};

export function NavMenuTop({}: Props) {
  const { user ,setOpenLoginForm} = useAuth();
  const toast = useToast();
  const router = useRouter()
  const {
    setAgreeRuleGame,
    agreeRuleGame,
    gameCheck,
    goAllbetExec,
    goHLGame,
    goMiniExec,
    goSlotGame,
  } = useDefaultContext();
  const [menuTop, setMenuTop] = useState(MENU_TOP);
  const [infoGameActive, setInfoGameActive] = useState<ArgumentTypeInput>(
    null as any
  );

  const handleStartGame = (argument: ArgumentTypeInput) => {
    if (!user) {
      toast.info("로그인 후 이용해주세요.");
    } else {
      setAgreeRuleGame?.({ isOpen: true, status: false });
      setInfoGameActive(argument);
    }
  };

  const handleRouterUrl = (submenu: any) => {
    if (!!submenu?.argument) {
      handleStartGame(submenu.argument as any);
    } else {
      if (!user && submenu?.permission) {
        setOpenLoginForm?.(true);
      } else {
        router.push(submenu?.url);
      }
    }
  };

  const handleGameActive = useCallback(
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
    if (agreeRuleGame?.status && infoGameActive) {
      const { game_id, game_title, os, vendor } = infoGameActive;
      handleGameActive({
        game_id: game_id,
        game_title: game_title,
        vendor: vendor,
        os: os,
      });
    }
  }, [agreeRuleGame?.status, infoGameActive]);
  return (
    <nav className="z-10">
      <ul className="flex flex-row items-center gap-8 justify-evenly">
        {!!menuTop?.length &&
          menuTop.map((item, index) => (
            <li
              className="relative transition-all cursor-pointer group"
              key={index}
            >
              <div className="flex flex-row items-center gap-2 text-[15px] text-white hover:text-warning">
                <span>{item.title}</span>
                <i>
                  <FiChevronDown className="text-white" />
                </i>
              </div>
              {!!item.subMenus?.length && (
                <ul className="z-100 absolute -left-2 top-9 hidden h-auto w-[200px] bg-[#21172E] p-2 group-hover:block">
                  <div className="absolute w-full h-6 transform -translate-x-1/2 -translate-y-1/2 -top-2 left-1/2"></div>
                  {item.subMenus?.map((sub, index) => (
                    <li
                      key={index}
                      className="my-2 text-sm text-white cursor-pointer hover:text-warning"
                    >
                      <div
                       
                        onClick={() => handleRouterUrl(sub)}
                      >
                        {sub?.title}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
}

