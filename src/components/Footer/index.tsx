"use client";
import { useScreen } from "@/libs/hooks/useScreen";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

import {
  ArgumentTypeInput,
  useDefaultContext,
} from "@/libs/provider/default-provider";
import { useAuth } from "@/libs/provider/auth-provider";
import { useToast } from "@/libs/provider/toast-provider";
import { FOOTER, FooterType } from "@/libs/constants/nav-footer";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};

export function Footer({}: Props) {
  const { user, setOpenLoginForm } = useAuth();
  const toast = useToast();
  const router = useRouter();

 
  const {
    setAgreeRuleGame,
    agreeRuleGame,
    gameCheck,
    goAllbetExec,
    goHLGame,
    goMiniExec,
    goSlotGame,
  } = useDefaultContext();
  const [menuFooter, setMenuFooter] = useState<FooterType>(FOOTER);
  const isLg = useScreen("lg");

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

  return (
    <footer className="bg-black ">
      <div
        className={`container grid grid-cols-3  gap-4 py-7 md:flex-row lg:flex
            lg:flex-row lg:items-start lg:justify-center
         lg:gap-24 lg:py-14  `}
      >
        {!!menuFooter.length &&
          menuFooter.map((item, index) => (
            <div key={index}>
              <div className="mb-6 text-warning">{item.title}</div>
              {!!item.subMenu?.length && (
                <ul className="flex flex-col gap-2">
                  {item.subMenu.map((submenu, index) => (
                    <li
                      key={index}
                      className="text-sm text-white cursor-pointer"
                    >
                      <div onClick={() => handleRouterUrl(submenu)}>
                        {submenu.title}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>
      {isLg && (
        <div className="copy-right container border-t border-[#6e6e6e] py-4">
          <Image
            src={"/images/foot-copy-right.jpg"}
            alt="footer copy right"
            width="0"
            height={320}
            sizes="100vw"
            className="object-cover w-full"
            loading="lazy"
          />
          <Image
            src={"/images/logo-footer.png"}
            alt="footer copy right"
            width={100}
            height={100}
            className="flex items-center justify-center object-cover mx-auto my-3"
            loading="lazy"
          />
          
        </div>
      )}
    </footer>
  );
}
