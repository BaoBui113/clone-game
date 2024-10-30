import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DialogComponentProps, DialogModal } from "../../utils/dialog/dialog";
import { BoxItem } from "./BoxItem";
import { NotifySupport } from "@/components/Support/NotifySupport";
import { PartnerSupport } from "@/components/Support/PartnerSupport";
import { SafeSupport } from "@/components/Support/SafeSupport";
import { RemoteSupport } from "@/components/Support/RemoteSupport";
import { RankWithdrawSupport } from "@/components/Support/RankWithdrawSupport";
import { FaqSupport } from "@/components/Support/FaqSupport";
import { EventSupport } from "@/components/Support/EventSupport";
import {
  SupportContext,
  SupportProvider,
} from "@/components/Support/provider/support-provider";
import { useAuth } from "@/libs/provider/auth-provider";
import { useScreen } from "@/libs/hooks/useScreen";

interface SupportDialogProps extends DialogComponentProps {}
const dialogStyle = {
  borderRadius: "4px",
  borderTop: "6px solid var(--yellow-yellow-500, #FFD035)",
  background: "#161616",
  boxShadow:
    "0px 1px 10px -1px rgba(255, 255, 255, 0.70) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.40)",
};

export function SupportDialog({ ...props }: SupportDialogProps) {
  const { setOpenLoginForm, user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [tabActive, setTabActive] = useState("");
  const isLg = useScreen("lg");
  const tagAct = params.get("tag");

  useEffect(() => {
    if (tagAct) {
      isCheckAuth(tagAct);
    }
  }, [tagAct]);
  const isCheckAuth = (tabName: string) => {
    if (
      (tabName === "rank-withdraw" && !user) ||
      (tabName === "partner" && !user)
    ) {
      setOpenLoginForm?.(true);
    } else {
      setTabActive(tabName);
    }
  };

  return (
    <SupportProvider>
      <SupportContext.Consumer>
        {({ setSeq }) => (
          <DialogModal
            isOpen={props.isOpen}
            onClose={() => {
              router.push("/");
              props.onClose();
              setSeq?.("");
            }}
            width={900}
            className=""
            dialogBodyClass={""}
            isOverlayClick={true}
            style={dialogStyle}
            slideFromBottom="mobile-only"
            mobileSizeMode={true}
          >
            <div className="flex flex-col">
              {!isLg && <BoxTitle title={"Support"} subTitle={"고객지원"} />}

              <div className="flex flex-col items-start justify-start overflow-x-auto lg:flex-row lg:items-center lg:justify-start">
                {isLg && <BoxTitle title={"Support"} subTitle={"고객지원"} />}

                <div className="flex flex-row items-center justify-around gap-8 mt-3 lg:mt-0 lg:w-full lg:flex-1">
                  {TAB_SUPPORT.length &&
                    TAB_SUPPORT.map((tab, idx) => (
                      <BoxItem
                        img={tab.img}
                        title={tab.title}
                        key={idx}
                        onClick={() => {
                          isCheckAuth(tab.tabName)
                        setSeq?.("")
                        }}
                        className={
                          tab.tabName === tabActive
                            ? "border-b-2 border-warning"
                            : "border-b-2 border-[#161616]"
                        }
                        classNameTitle={
                          tab.tabName === tabActive
                            ? "text-warning"
                            : "text-white"
                        }
                      />
                    ))}
                </div>
              </div>
              <div className="min-h-[100px] bg-[#3C3C3C] p-3 lg:p-7">
                {
                  TAB_SUPPORT.find((tab, idx) => tab.tabName === tabActive)
                    ?.children
                }
              </div>
            </div>
          </DialogModal>
        )}
      </SupportContext.Consumer>
    </SupportProvider>
  );
}

export function BoxTitle({ title, subTitle }: { title: string; subTitle?: string }) {
  return (
    <div className="w-full lg:w-1/6">
      <h4 className="text-2xl text-warning">{title}</h4>
      <div className="text-sm text-white">{subTitle}</div>
    </div>
  );
}

const TAB_SUPPORT: {
  title: string;
  tabName: string | any;
  img: string;
  children: JSX.Element;
}[] = [
  {
    title: "공지사항",
    tabName: "notify",
    img: "/images/svg/icon-notify.svg",
    children: <NotifySupport />,
  },
  {
    title: "이벤트안내",
    tabName: "event",
    img: "/images/svg/icon-success.svg",
    children: <EventSupport />,
  },
  {
    title: "자주묻는 질문",
    tabName: "faq",
    img: "/images/svg/icon-faq.svg",
    children: <FaqSupport />,
  },
  {
    title: "출금랭킹",
    tabName: "rank-withdraw",
    img: "/images/svg/icon-top.svg",
    children: <RankWithdrawSupport />,
  },
  {
    title: "1:1원격지원",
    tabName: "remote",
    img: "/images/svg/spp-remote.svg",
    children: <RemoteSupport />,
  },
  {
    title: "PC안전지킴이",
    tabName: "safe",
    img: "/images/svg/spp-rule.svg",
    children: <SafeSupport />,
  },
  {
    title: "파트너제휴",
    tabName: "partner",
    img: "/images/svg/spp-partner.svg",
    children: <PartnerSupport />,
  },
];
