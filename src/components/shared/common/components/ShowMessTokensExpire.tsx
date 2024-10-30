"use client";
import React from "react";
import { DialogComponentProps, DialogModal } from "../../utils/dialog/dialog";
import { Button } from "../../utils/form/Button";
import { useAuth } from "@/libs/provider/auth-provider";
import { useRouter } from "next/navigation";
interface ShowMessTokensExpireProps extends DialogComponentProps {
  status?: string | number;
}

export function ShowMessTokensExpire({
  status,
  ...props
}: ShowMessTokensExpireProps) {
    const router = useRouter()
    const {logoutUser,setOpenLoginForm} = useAuth()

  const confirmRefetchPage = () => {
    props.onClose();
    logoutUser?.();
    router.refresh()
    router.push("/")
    setOpenLoginForm?.(true)


  }

  return (
    <DialogModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      width={300}
      className="bg-white"
      dialogBodyClass={"!my-3"}
      isBtnClose={false}
      style={{zIndex:100}}
    >
      <div className="text-white ">
        <p className="text-lg text-center text-red-500">
        로그인 세션이 만료되었습니다 <br/> 로그인 후 이용해 주세요.
        </p>
        <div className="flex flex-row items-center justify-center gap-8 mt-3">
          <Button
            text="닫다"
            className={"  border-none bg-red-500 px-5 py-1 text-sm "}
            onClick={props.onClose}
          />
          <Button
            text="확인하다"
            className={" border-none bg-warning px-5 py-1 text-sm "}
            onClick={confirmRefetchPage}
          />
        </div>
      </div>
    </DialogModal>
  );
}
