import bbsApi from "@/app/apis/bbsApi";
import {
  getNotifyBoard,
  getWithDraw,
} from "@/components/Home/provider/home-provider";
import { useAuth } from "@/libs/provider/auth-provider";
import { NoticeSelType } from "@/types/notice-sel";

import { getTokenHost } from "@/utils/getTokenAndHost";
import React, { createContext, useContext, useEffect, useState } from "react";

export const SupportContext = createContext<
  Partial<{
    mainBoardPagingNotify: MainNotifyBoard;
    mainBoardPagingEvent: MainNotifyBoard;
    mainBoardPagingFaq: MainNotifyBoard;
    withDrawWeek: WithdrawTopList;
    withDrawDay: WithdrawTopList;
    seq?: string | any;
    setSeq?: (value: string) => any;
    noticeSel: NoticeSelType;
  }>
>({});
export const getBoardPaging = async (
  token: string,
  host?: string,
  type?: string,
  page = 1,
  list_block = 10
) => {
  const data = await bbsApi.getMainNoticeBoardPaging({
    token: token,
    host: host,
    notice_type: `${type}`, // N = NOTIFY , E = EVENT , F = FAQ
    page: page,
    list_block: list_block,
  });

  return data;
};
export const getFaqSel = async (
  token: string,
  host?: string,
  kind = "",
  page = 1,
  list_block = 10
) => {
  const data = await bbsApi.getFaqSel({
    token: token,
    host: host,
    notice_kind: `${kind}`, // N = NOTIFY , E = EVENT , F = FAQ
    page: page,
    list_block: list_block,
  });

  return data;
};

export function SupportProvider({ ...props }) {
  const { token, host } = getTokenHost();

  const { user } = useAuth();
  const [mainBoardPagingNotify, setMainBoardNotifyPaging] =
    useState<MainNotifyBoard>();
  const [mainBoardPagingEvent, setMainBoardEventPaging] =
    useState<MainNotifyBoard>();
  const [mainBoardPagingFaq, setMainBoardFaqPaging] =
    useState<MainNotifyBoard>();
  const [withDrawDay, setWithDrawDay] = useState<WithdrawTopList>();
  const [withDrawWeek, setWithDrawWeek] = useState<WithdrawTopList>();
  const [noticeSel, setNoticeSel] = useState<NoticeSelType>();
  const [seq, setSeq] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const notifyData = await getBoardPaging(
          token as string,
          host,
          "N",
          1,
          10
        );

        setMainBoardNotifyPaging(notifyData?.data);
        const eventData = await getBoardPaging(
          token as string,
          host,
          "E",
          1,
          10
        );
        setMainBoardEventPaging(eventData?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [user, seq]);

  useEffect(() => {
    (async () => {
      if (user && token) {
        try {
          const res = await getFaqSel(token as string, host, "", 1, 10);
          if (res?.data.status == 0) {
            setMainBoardFaqPaging(res?.data);
          }
        } catch (error) {
          console.error("Error fetching faq sell data:", error);
        }
      } else {
        try {
          const faqRes = await getNotifyBoard(token as string, host, "F", "5");

          if (faqRes?.data.status == 0) {
            setMainBoardFaqPaging(faqRes?.data);
          }
        } catch (error) {
          console.error("Error fetching notify faq data:", error);
        }
      }
    })();
  }, [user]);
  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const withDrawWeek = await getWithDraw(
            token as string,
            host,
            "10",
            "WeekRank",
            "O"
          );
          setWithDrawWeek(withDrawWeek?.data);
          const withDrawDay = await getWithDraw(
            token as string,
            host,
            "40",
            "DayLive",
            "O"
          );

          setWithDrawDay(withDrawDay?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    })();
  }, [user, token]);

  useEffect(() => {
    (async () => {
      if (seq) {
        try {
          const res = await bbsApi.getNotifySel({ host, seq });

          if (res?.data.status == 0) {
            setNoticeSel(res?.data);
          }
        } catch (error) {
          console.error("Error fetching notifySell data:", error);
        }
      } else {
        setMainBoardEventPaging([] as any);
      }
    })();
  }, [seq]);

  return (
    <SupportContext.Provider
      value={{
        mainBoardPagingFaq,
        mainBoardPagingEvent,
        mainBoardPagingNotify,
        withDrawDay,
        withDrawWeek,
        seq,
        setSeq,
        noticeSel,
      }}
    >
      {props.children}
    </SupportContext.Provider>
  );
}
export const useSupportContext = () => useContext(SupportContext);
