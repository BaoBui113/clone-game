import React, { useState } from "react";
import { Button } from "../shared/utils/form/Button";
import { AccountInfoTab } from "./components/AccountInfoTab";
import { AccountBanking } from "./components/AccountBanking";
import AccountBalance from './components/AccountBalance'

type AccountWalletProps = {};

export function AccountWallet({}: AccountWalletProps) {
  const [tabActive, setTabActive] = useState<"REGISTER" | "BANKING" | string>(
    "REGISTER"
  );
  return (
    <>
      <div className="text-xl font-semibold">마이페이지</div>
      <div className="flex flex-row items-center justify-start gap-2 my-3">
        {TAB_ACCOUNT.map((tab, idx) => (
          <Button
            key={idx}
            className={`border-none px-2 lg:px-6 py-2 lg:text-base text-xs ${
              tabActive === tab.tab ? "bg-warning" : "bg-black"
            }`}
            text={tab.title}
            onClick={() => setTabActive(tab?.tab)}
          />
        ))}
      </div>
      <div className="my-3">
        {
          TAB_ACCOUNT.find((item,index)=> item.tab === tabActive)?.children
        }
      </div>
    </>
  );
}

const TAB_ACCOUNT = [
  {
    title: "회원가입정보",
    tab: "REGISTER",
    children:<AccountInfoTab/>
  },
  {
    title: "고객계좌관리",
    tab: "BANKING",
    children:<AccountBanking/>

  },
  {
    title: "계정 잔액",
    tab: "BALANCE",
    children:<AccountBalance/>
  }
];
