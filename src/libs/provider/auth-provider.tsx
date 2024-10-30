"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  ClearUserInfo,
  ClearUserToken,
  GetUserInfo,
  SetCoinDeposit,
  SetUserInfo,
  SetUserToken,
} from "../repo/auth";
import userApi from "@/app/apis/userApi";
import { User, UserRepo } from "@/types/user";
import { collectDeviceInfo } from "@/components/shared/common/getInfoUserAccess";
import { usePathname, useRouter } from "next/navigation";
import { getTokenHost } from "@/utils/getTokenAndHost";
import { useToast } from "./toast-provider";
import { AlertShowMsg } from "@/components/shared/common/components/AlertShowMsg";
import { ShowMessageDialog } from "@/components/shared/common/components/ShowMessageDialog";
import { ConfirmLogoutDialog } from "@/components/shared/common/components/ConfirmLogoutDialog";
import { ShowMessTokensExpire } from "@/components/shared/common/components/ShowMessTokensExpire";

export const AuthContext = createContext<
  Partial<{
    user: UserRepo;
    setUser: (user: UserRepo) => any;
    loginUser: (user: User) => Promise<any>;
    logoutUser: () => void;
    deviceInfo?: any;
    openLoginForm?: boolean;
    setOpenLoginForm?: (isOpen: boolean) => void;
    openJoinMemberForm?: boolean;
    setOpenJoinMemberForm?: (isOpen: boolean) => void;
    isOpenMsg: boolean;
    setIsOpenMsg: (isOpen: boolean) => any;
    updateAccountPassword: (old_pass: string, new_pass: string) => void;
    confirmLogout: boolean;
    setConfirmLogout: (confirm: boolean) => any;
    isOpenShowMessTokenExpire: boolean;
    setIsOpenShowMessTokenExpire: (isOpen: boolean) => any;
    isCheckTokenExpire: (status: string | number) => void;

  }>
>({});

export function AuthProvider({ ...props }) {
  const { token, host } = getTokenHost();
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<UserRepo>(undefined as any);
  const path = usePathname();
  const router = useRouter();
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openJoinMemberForm, setOpenJoinMemberForm] = useState(false);
  const toast = useToast();
  const [isOpenMsg, setIsOpenMsg] = useState<boolean>(false);
  const [textError, setTextError] = useState({ text: "", status: true });
  const [isOpenShowMsg, setIsOpenShowMsg] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isOpenShowMessTokenExpire, setIsOpenShowMessTokenExpire] = useState(false);

  useEffect(() => {
    collectDeviceInfo().then((info) => {
      setDeviceInfo(info);
    });
  }, []);

  const mode: "user" | "member" = useMemo(() => {
    return "user";
  }, [path]);

  useEffect(() => {
    switch (mode) {
      case "user":
        loadUser();
        break;
    }
  }, [mode, token]);

  const loadUser = () => {
    const user = GetUserInfo();

    if (!!user && !!token) {
      const { MEM_LID } = user;
      if (MEM_LID && MEM_LID !== "") {
        setUser(user);
        SetUserToken(token);
      }
    } else {
      setUser(null as any);
      ClearUserToken();
    }
  };

  const loginUser = async (data?: User) => {
    try {
      const response = await userApi.login(data as User);
      if (!!response && response.status == 0) {
        const {
          GAME_ALIAS,
          MEM_LID,
          MEM_ID,
          HP_NO,
          LEVEL_CD,
          LEVEL_NAME,
          TEST_ID_YN,
          token,
        }: UserRepo | any = response;
        SetUserToken(token);
        setUser({
          GAME_ALIAS: GAME_ALIAS,
          MEM_LID: MEM_LID,
          MEM_ID: MEM_ID,
          HP_NO: HP_NO,
          LEVEL_CD: LEVEL_CD,
          LEVEL_NAME: LEVEL_NAME,
        });
        SetUserInfo({
          GAME_ALIAS: GAME_ALIAS,
          MEM_LID: MEM_LID,
          MEM_ID: MEM_ID,
          HP_NO: HP_NO,
          TEST_ID_YN: TEST_ID_YN,
        });
        const coin = LEVEL_NAME?.includes("C");
        const normal = LEVEL_NAME?.includes("N");
        if (!coin && !normal) {
          SetCoinDeposit("CN");
        } else if (!coin) {
          SetCoinDeposit("C");
        } else {
          SetCoinDeposit("N");
        }
        setTextError({ text: "Login successful!", status: true });
        setIsOpenShowMsg?.(true);
      } else {
        const { err_data, status } = response as any;
        if (status == 6 && err_data?.f_limit == 5) {
          setTextError({
            text: `출금통장 변경은 고객센터 또는 실시간상담으로만 변경이 가능합니다. 고객센터 070-7847-6791 ${err_data?.tel_num}`,
            status: false,
          });

          setIsOpenShowMsg?.(true);
        } else {
          setTextError({
            text: "Sign in failed due to incorrect userId or password",
            status: false,
          });
        }
        setIsOpenShowMsg?.(true);
      }
    } catch (err) {
      console.error(err);
      ClearUserToken();
      setUser(null as any);
      let message = "에러 발생됨";
      setIsOpenShowMsg?.(true);
      setTextError({
        text: "에러 발생됨 다시 로그인해주세요",
        status: false,
      });
      throw new Error(message);
    }
  };

  const logoutUser = () => {
    ClearUserToken();
    ClearUserInfo();
    setUser(null as any);
    setConfirmLogout(false);
  };

  const updateAccountPassword = async (
    old_pass: string,
    new_password: string
  ) => {
    try {
      const res = await userApi.updatePassword({
        token: token,
        host: host,
        new_password: new_password,
        old_password: old_pass,
        userip: deviceInfo.userIp,
      });

      if (res?.data?.status == 0 && res.data) {
        const { SMS_INFO } = res?.data;
        toast.success(SMS_INFO?.message + "다시 로그인하십시오");
        router.push("/");
        ClearUserInfo();
        ClearUserToken();
        router.refresh();
      } else {
        console.error("Error response:", res?.data);
        toast.error("Update Account failed", res?.data.status);
      }
    } catch (error) {
      console.error("Error response:", error);
    }
  };

  const isCheckTokenExpire = (status: string | number) => {
    if (status == 2 || status == -1) {
      setIsOpenShowMessTokenExpire(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginUser: loginUser,
        logoutUser,
        deviceInfo,
        openLoginForm,
        setOpenLoginForm,
        openJoinMemberForm,
        setOpenJoinMemberForm,
        setIsOpenMsg,
        updateAccountPassword,
        confirmLogout,
        setConfirmLogout,
        isCheckTokenExpire,
        isOpenShowMessTokenExpire,
        setIsOpenShowMessTokenExpire
      }}
    >
      {props.children}
      <AlertShowMsg
        isOpen={isOpenMsg}
        onClose={() => setIsOpenMsg(false)}
        message="고객센터070-7847-6791로 문의하세요.  또는 오른쪽 하단의 실시간 상담창으로 문의해주시기 바랍니다."
      />
      <ShowMessageDialog
        isOpen={isOpenShowMsg}
        onClose={() => setIsOpenShowMsg?.(false)}
        bgColor={textError?.status ? "success" : "error"}
      >
        <div className="">{textError?.text}</div>
      </ShowMessageDialog>
      <ConfirmLogoutDialog
        isOpen={confirmLogout}
        onClose={() => setConfirmLogout(false)}
      />
      <ShowMessTokensExpire
        isOpen={isOpenShowMessTokenExpire}
        onClose={() => {
          setIsOpenShowMessTokenExpire(false);
        }}
      />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
