"use client";
import { ThemeProvider } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";
import { NotifyAdsDialog } from "@/components/shared/common/components/NotifyAdsDialog";
import { useAuth } from "./auth-provider";
import { LoginMsgDialog } from "@/components/shared/common/components/LoginMsgDialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WalletDialog } from "@/components/shared/common/components/WalletDialog";
import { getTokenHost } from "@/utils/getTokenAndHost";
import codeApi from "@/app/apis/codeApi";
import { useToast } from "./toast-provider";
import gameApi from "@/app/apis/gameApi";
import { AgreeRuleGameDialog } from "@/components/shared/common/components/AgreeRuleGameDialog";
export interface ArgumentTypeInput {
  width?: number;
  height?: number;
  game_title?: string;
  os?: string;
  vendor?: string;
  game_id?: string;
}
export const DefaultContext = createContext<
  Partial<{
    agreeRuleGame: {
      isOpen: boolean;
      status: boolean;
    };
    setAgreeRuleGame?: React.Dispatch<
      React.SetStateAction<{
        isOpen: boolean;
        status: boolean;
      }>
    >;
    gameCheck: (gameTitle: string) => void;
    goHLGame: (data: ArgumentTypeInput) => void;
    goSlotGame: (game_title: string) => void;
    slotGames: any;
    setSlotGames: () => any;
    goMiniExec: (game_title: string) => void;
    goAllbetExec: (game_title: string) => void;
  }>
>({});
export function DefaultProvider({ children }: { children: React.ReactNode }) {
  const { token, host } = getTokenHost();
  const toast = useToast();
  const router = useRouter();
  const { user, deviceInfo, isCheckTokenExpire } = useAuth();
  const [isOpenAdsDialog, setIsOpenAdsDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const pathName = usePathname();
  const params = useSearchParams();
  const [isOpenWalletDialog, setIsOpenWalletDialog] = useState<any>(null);
  const [agreeRuleGame, setAgreeRuleGame] = useState<{
    isOpen: boolean;
    status: boolean;
  }>({ isOpen: false, status: false });

  const [slotGames, setSlotGames] = useState({ categories: [], data: [] });
  const isOpen = params.get("dialogWallet");
  const tag = params.get("tag");


  useEffect(() => {
    if (token && user) {
      (async () => {
        try {
          const res = await codeApi.getLoginMsg({
            token: token,
            host: host,
          });

          if (res.data?.status == 0) {
            setMsg(res.data);
          } else {
            isCheckTokenExpire?.(res?.status)
          }
        } catch (err) {
          console.log("Failed to fetch data", err as any);
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    if (isOpen === "true") {
      setIsOpenWalletDialog(tag);
    } else {
      setIsOpenWalletDialog(null)
    }
  }, [tag, isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpenAdsDialog(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  const gameCheck = async (game_title: string) => {
    if (user) {
      try {
        const res = await gameApi.getCheck({
          token: token as string,
          host: host,
          game_title: game_title,
        });
        const { status, data } = res?.data;
        if (status == 0 && data.GAME_CHECK === "N") {
          return true;
        } else {
          toast.error("게임접속이 원할하지 않습니다", data?.MSG_TXT);
          return false;
        }
      } catch (error) {
        const { response }: any = error
        isCheckTokenExpire?.(response?.data?.status)
        console.log("error game check", error)

      }
    }
  };

  const goHLGame = async ({
    width = 1280,
    height = 820,
    game_title,
    game_id,
    vendor,
    os,
  }: ArgumentTypeInput) => {
    const res = await gameApi.getGameStartNew({
      token: token,
      host: host,
      game_title: game_title,
      game_id: game_id,
      os: os,
      vendor: vendor,
      width: width,
      height: height,
      userip: deviceInfo.userIp,
    });
    if (res?.data?.status == 0) {
      const url = res?.data.data?.url;

      window.open(url, "_blank");
    } else {
      console.error("Error response:", res?.data);
      toast.error("게임접속이 원할하지 않습니다.ERR", res?.data.status);
    }
  };

  const goSlotGame = async (game_title: string) => {
    const res = await gameApi.getSlotGames({
      token: token,
      host: host,
      game_title: game_title,
      width: 1280,
      height: 820,
    });
    if (res?.data?.status == 0 && res.data) {
      const { categories, data } = res.data;
      setSlotGames({ categories: categories, data: data });
      window.open("/slot-games", "_blank");
    } else {
      console.error("Error response:", res?.data);
      toast.error("게임접속이 원할하지 않습니다.ERR", res?.data.status);
    }
  };

  const goMiniExec = async (game_title: string) => {
    const res = await gameApi.getMiniGames({
      token: token,
      host: host,
      game_title: game_title,
      userip: deviceInfo.userIp,
    });
    if (res?.data?.status == 0 && res.data) {
      const url = res?.data.data?.url;

      window.open(url, "_blank");
    } else {
      console.error("Error response:", res?.data);
      toast.error("게임접속이 원할하지 않습니다.ERR", res?.data.status);
    }
  };

  const goAllbetExec = async (game_title: string) => {
    const res = await gameApi.goAllbet({
      token: token,
      host: host,
      game_title: game_title,
      userip: deviceInfo.userIp,
    });
    if (res?.data?.status == 0 && res.data) {
      const url = res?.data.data?.url;

      window.open(url, "_blank");
    } else {
      console.error("Error response:", res?.data);
      toast.error("게임접속이 원할하지 않습니다.ERR", res?.data.status);
    }
  };

  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <DefaultContext.Provider
        value={{
          agreeRuleGame,
          setAgreeRuleGame,
          gameCheck,
          goHLGame,
          goSlotGame,
          slotGames,
          goMiniExec,
          goAllbetExec,
        }}
      >
        {children}

        {/* <NotifyAdsDialog
          isOpen={isOpenAdsDialog}
          onClose={() => setIsOpenAdsDialog(false)}
          img={["/images/popup/ads-1.jpg", "/images/popup/ads-2.jpg"]}
          width={1100}
        />
        {user && (
          <LoginMsgDialog
            isOpen={!!msg}
            onClose={() => setMsg(null)}
            message={msg}
          />
        )}
        <WalletDialog
          isOpen={!!isOpenWalletDialog}
          onClose={() => setIsOpenWalletDialog(null)}
        />
        <AgreeRuleGameDialog
          isOpen={agreeRuleGame.isOpen}
          onClose={() => setAgreeRuleGame({ isOpen: false, status: false })}
        /> */}
      </DefaultContext.Provider>
    </ThemeProvider>
  );
}
export const useDefaultContext = () => useContext(DefaultContext);
