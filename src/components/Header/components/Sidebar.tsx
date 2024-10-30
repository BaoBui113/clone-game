import { Button } from "@/components/shared/utils/form/Button";
import {
  SildeOutProps,
  SlideOut,
} from "@/components/shared/utils/slideout/Slideout";
import { MENU_TOP, MenuTopTypes } from "@/libs/constants/nav-menu";
import { useAuth } from "@/libs/provider/auth-provider";
import {
  ArgumentTypeInput,
  useDefaultContext,
} from "@/libs/provider/default-provider";
import { useToast } from "@/libs/provider/toast-provider";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type Props = {};

export function Sidebar({ ...props }: Props & SildeOutProps) {
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [activeSubMenu, setActiveSubMenu] = useState<any>(null);
  const [menus, setMenus] = useState<MenuTopTypes>(MENU_TOP);
  const { setOpenJoinMemberForm, setOpenLoginForm } = useAuth();
  const {
    setAgreeRuleGame,
    agreeRuleGame,
    gameCheck,
    goAllbetExec,
    goHLGame,
    goMiniExec,
    goSlotGame,
  } = useDefaultContext();
  const [infoGameActive, setInfoGameActive] = useState<ArgumentTypeInput>(
    null as any
  );

  const handleRouterUrl = (submenu: any) => {
    if (!!submenu?.argument) {
      handleStartGame(submenu.argument as any);
    } else {
      if (!user && submenu?.permission) {
        setOpenLoginForm?.(true);
      } else {
        router.push(submenu?.url);
        props.onClose && props.onClose();
        setActiveSubMenu(null);
      }
    }
  };

  const handleStartGame = (argument: ArgumentTypeInput) => {
    if (!user) {
      toast.info("로그인 후 이용해주세요.");
      props.onClose && props.onClose();
    } else {
      setAgreeRuleGame?.({ isOpen: true, status: false });
      setInfoGameActive(argument);
      setActiveSubMenu(null);
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
      setActiveSubMenu(null);
      props.onClose && props.onClose();
      setActiveSubMenu(null);
    }
  }, [agreeRuleGame?.status, infoGameActive]);

  return (
    <SlideOut isOpen={props.isOpen} onClose={props.onClose} className={`w-2/3`}>
      <nav className="">
        <ul className="flex flex-col items-start justify-start">
          {menus?.map((item, idx) => (
            <li className="w-full py-2 pl-2 " key={idx}>
              <div
                className="flex flex-row items-center justify-between font-semibold text-black cursor-pointer "
                onClick={() =>
                  setActiveSubMenu(activeSubMenu === idx ? null : idx)
                }
              >
                <span className="text-sm">{item.title}</span>
                {!!item.subMenus?.length && (
                  <i className="text-2xl hover:text-primary">
                    {activeSubMenu === idx ? (
                      <BiChevronUp />
                    ) : (
                      <BiChevronDown />
                    )}
                  </i>
                )}
              </div>
              {!!item.subMenus?.length && (
                <>
                  <ul
                    className={`${activeSubMenu === idx
                        ? "visible h-full transition-all"
                        : "hidden h-0 transition-all"
                      } z-100 w-full border-l bg-white`}
                  >
                    {item.subMenus.map((item, index) => (
                      <li
                        key={index}
                        className="w-full p-2 cursor-pointer hover:bg-gray-50 hover:text-primary"
                      >
                        <div
                          className="block text-sm text-black whitespace-nowrap"
                          onClick={() => handleRouterUrl(item)}
                        >
                          - {item.title}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>

        {user ? (
          <div className="px-2 py-3 text-sm border-t text-warning">
            활성 계정 - {user?.MEM_LID}
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between gap-3 py-2 border-t md:justify-start">
            <Button
              text="로그인"
              className={
                "mx-auto w-full  justify-center whitespace-nowrap rounded-lg border-2 border-warning bg-warning px-3 py-1 text-[12px] text-primary transition-all  hover:border-yellow-400 hover:bg-yellow-400 hover:text-white lg:px-6 lg:py-2 lg:text-base"
              }
              onClick={() => {
                props.onClose && props.onClose();
                setOpenLoginForm?.(true);
              }}
            />
            <Button
              text="회원가입"
              className={
                "mx-auto w-full  justify-center whitespace-nowrap rounded-lg border-2 border-warning px-3 py-1 text-[12px] !text-black hover:bg-warning hover:text-white lg:px-6 lg:py-2 lg:text-base"
              }
              onClick={() => {
                setOpenJoinMemberForm?.(true);
                props.onClose && props.onClose();
              }}
            />
          </div>
        )}
      </nav>
    </SlideOut>
  );
}
