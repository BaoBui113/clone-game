import exchangeApi from "@/app/apis/exchangeApi";
import userApi from "@/app/apis/userApi";
import { useAuth } from "@/libs/provider/auth-provider";
import { AccountInfo } from "@/types/user";

import { getTokenHost } from "@/utils/getTokenAndHost";
import React, { createContext, useContext, useEffect, useState } from "react";
import codeApi from "@/app/apis/codeApi";
import { CouponType } from "@/types/coupon";
import { WithdrawHistoryType } from "@/types/withdraw-history";

export const WalletContext = createContext<
  Partial<{
    accountInfo: AccountInfo;
    coupons: CouponType;
    loadingTable:boolean;
    setLoadingTable:(loading:boolean)=>any;
  }>
>({});

export function WalletProvider({ ...props }) {
  const { token, host } = getTokenHost();
  const { user } = useAuth();
  const [accountInfo, setAccountInfo] = useState<AccountInfo>(null as any);

  
  const [loadingTable,setLoadingTable] = useState(false)

  useEffect(() => {
    (async () => {
      if (user && token) {
        try {
          const res = await userApi.getMyPage({
            token: token,
            host: host,
          });
          if (res?.data.status == 0) {
            setAccountInfo(res.data);
          }
        } catch (error) {
          console.error("Error fetching data mypage:", error);
        }
      }
    })();
  }, [user, token]);

 

  

  useEffect(() => {
    if (loadingTable) {
      const timer = setTimeout(() => {
        setLoadingTable(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [loadingTable]);

  return (
    <WalletContext.Provider
      value={{
        accountInfo,
        setLoadingTable,
        loadingTable,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
}
export const useWalletContext = () => useContext(WalletContext);
