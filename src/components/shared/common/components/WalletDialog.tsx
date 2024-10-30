import React, { useEffect, useState } from "react";
import { DialogComponentProps, DialogModal } from "../../utils/dialog/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import DepositWallet from "@/components/Wallet/DepositWallet";
import WithdrawWallet from "@/components/Wallet/WithdrawWallet";
import TransferWallet from "@/components/Wallet/TransferWallet";
import { CouponWallet } from "@/components/Wallet/CouponWallet";
import { AccountWallet } from "@/components/Wallet/AccountWallet";
import { BoxItem } from "./BoxItem";
import { WithdrawHistoryWallet } from "@/components/Wallet/WithdrawHistoryWallet";
import { WalletProvider } from "@/components/Wallet/provider/wallet-provider";
import { useScreen } from "@/libs/hooks/useScreen";
import { BoxTitle } from "./SupportDialog";
const dialogStyle = {
  borderRadius: "4px",
  borderTop: "6px solid var(--yellow-yellow-500, #FFD035)",
  background: "#161616",
  boxShadow:
    "0px 1px 10px -1px rgba(255, 255, 255, 0.70) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.40)",
};

interface WalletProps extends DialogComponentProps {}

export function WalletDialog({ children, ...props }: WalletProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [tabActive, setTabActive] = useState("");
  const isLg = useScreen("lg");
  const tagAct = params.get("tag");

  useEffect(() => {
    if (tagAct) {
      setTabActive(tagAct);
    }
  }, [tagAct]);

  return (
    <WalletProvider>
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
          {!isLg && <BoxTitle title={"My wallet"} subTitle={"마이월렛"} />}

          <div className="flex flex-col items-start justify-start overflow-x-auto lg:flex-row lg:items-center lg:justify-start">
            {isLg && <BoxTitle title={"My wallet"} subTitle={"마이월렛"} />}
            <div className="flex flex-row items-center justify-around gap-8 mt-3 lg:mt-0 lg:w-full lg:flex-1">
              {TAB_HEADER.length &&
                TAB_HEADER.map((tab, idx) => (
                  <BoxItem
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
          <div className="min-h-[100px] bg-[#3C3C3C] lg:p-7 p-3">
            {tabActive === "deposit" ? (
              <DepositWallet />
            ) : tabActive === "withdraw" ? (
              <WithdrawWallet />
            ) : tabActive === "transfer" ? (
              <TransferWallet />
            ) : tabActive === "banking" ? (
              <WithdrawHistoryWallet />
            ) : tabActive === "coupon" ? (
              <CouponWallet />
            ) : tabActive === "account" ? (
              <AccountWallet />
            ) : (
              <></>
            )}
          </div>
        </div>
      </DialogModal>
    </WalletProvider>
  );
}

const TAB_HEADER: {
  title: string;
  tabName: string | any;
  img: string;
}[] = [
  {
    title: "입금하기",
    tabName: "deposit",
    img: "/images/wallet/wt-donate.svg",
  },
  {
    title: "출금하기",
    tabName: "withdraw",
    img: "/images/wallet/wt-atm.svg",
  },
  {
    title: "머니이동",
    tabName: "transfer",
    img: "/images/wallet/wt-transfer.svg",
  },
  {
    title: "입출금내역",
    tabName: "banking",
    img: "/images/wallet/wt-banking.svg",
  },
  {
    title: "쿠폰내역",
    tabName: "coupon",
    img: "/images/wallet/wt-coupon.svg",
  },
  {
    title: "마이페이지",
    tabName: "account",
    img: "/images/wallet/wt-account.svg",
  },
];
