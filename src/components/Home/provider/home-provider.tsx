"use client";
import bbsApi from "@/app/apis/bbsApi";
import exchangeApi from "@/app/apis/exchangeApi";
import { GameRuleDialog } from "@/components/shared/common/components/GameRuleDialog";
import { SupportDialog } from "@/components/shared/common/components/SupportDialog";
import { useAuth } from "@/libs/provider/auth-provider";

import { getTokenHost } from "@/utils/getTokenAndHost";

import { usePathname, useSearchParams } from "next/navigation";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

export const HomeContext = createContext<
  Partial<{
    mainBoardNotify: MainNotifyBoard;
    mainBoardEvent: MainNotifyBoard;
    mainBoardFaq: MainNotifyBoard;
    withDrawWeek: WithdrawTopList;
    withDrawDay: WithdrawTopList;
    tabMenuActive: string;
    setTabMenuActive?: (tab: string) => any;
    setIsLoadSkeleton?: (load: boolean) => any;
    isLoadSkeleton: boolean;
  }>
>({});

export const getNotifyBoard = async (
  token: string,
  host?: string,
  notice_type?: string,
  top?: number | string
) => {
  const data = await bbsApi.getMainNotifyBoard({
    token: token,
    host: host,
    notice_type: `${notice_type}`,
    top: `${top}`,
  });
  return data;
};

export const getWithDraw = async (
  token: string,
  host?: string,
  top?: string,
  list_type?: string,
  io_type?: string
) => {
  const data = await exchangeApi.getWithdrawTopList({
    token: token,
    host: host,
    top: `${top}`,
    list_type: `${list_type}`,
    io_type: `${io_type}`,
  });

  return data;
};

export function HomeProvider({ ...props }) {
  const { token, host } = getTokenHost();
  const { user } = useAuth();
  const [mainBoardNotify, setMainBoardNotify] = useState<MainNotifyBoard>();
  const [mainBoardEvent, setMainBoardEvent] = useState<MainNotifyBoard>();
  const [mainBoardFaq, setMainBoardFaq] = useState<MainNotifyBoard>();
  const [withDrawDay, setWithDrawDay] = useState<WithdrawTopList>();
  const [withDrawWeek, setWithDrawWeek] = useState<WithdrawTopList>();
  const [isOpenSupportDialog, setIsOpenSupportDialog] = useState<any>(null);
  const [isOpenGameRuleDialog, setIsOpenGameRuleDialog] = useState<any>(false);
  const [tabMenuActive, setTabMenuActive] = useState<string>("Live");
  const [siteType, setSiteType] = useState();
  const [isLoadSkeleton, setIsLoadSkeleton] = useState(true)

  const params = useSearchParams();
  const pathname = usePathname()

  const tag = params.get("tag");
  const isOpenSupport = params.get("support");
  const isOpenGameRule = params.get("rule");

  const getSiteType = async (host?: string) => {
    const res = await bbsApi.getSiteType({
      host: host,
    });
    console.log("getSiteType", res);
    //setSiteType(data)
  };

  useEffect(() => {
    if (isOpenSupport === "true") {
      setIsOpenSupportDialog(tag);
    } else {
      setIsOpenSupportDialog(false);

    }
  }, [tag, isOpenSupport, pathname]);

  useEffect(() => {
    if (isOpenGameRule === "true") {
      setIsOpenGameRuleDialog(true);
    }
  }, [isOpenGameRule]);

  useEffect(() => {

    getNotifyBoard(token as string, host, "N", "5").then((data) => {
      setMainBoardNotify(data.data);
    });
    getNotifyBoard(token as string, host, "E", "5").then((data) => {
      setMainBoardEvent(data.data);
    });
    getNotifyBoard(token as string, host, "F", "5").then((data) => {
      setMainBoardFaq(data.data);
    });


  }, [user]);


  useEffect(() => {
    getSiteType(host);
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const withDrawWeek = await getWithDraw(
          token as string,
          host,
          "5",
          "WeekRank",
          "O"
        );
        setWithDrawWeek(withDrawWeek?.data);
        const withDrawDay = await getWithDraw(
          token as string,
          host,
          "5",
          "DayLive",
          "O"
        );
        setWithDrawDay(withDrawDay?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadSkeleton(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <HomeContext.Provider
      value={{
        mainBoardFaq,
        mainBoardEvent,
        mainBoardNotify,
        withDrawDay,
        withDrawWeek,
        setTabMenuActive,
        tabMenuActive,
        setIsLoadSkeleton,
        isLoadSkeleton,
      }}
    >
      {props.children}
      <SupportDialog
        isOpen={!!isOpenSupportDialog}
        onClose={() => setIsOpenSupportDialog(null)}
      />
      <GameRuleDialog
        isOpen={isOpenGameRuleDialog}
        onClose={() => setIsOpenGameRuleDialog(false)}
      />
    </HomeContext.Provider>
  );
}
export const useHomeContext = () => useContext(HomeContext);
