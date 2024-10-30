"use client";
import React from "react";
import { DialogComponentProps, DialogModal } from "../../utils/dialog/dialog";
import { Button } from "../../utils/form/Button";
import { useAuth } from "@/libs/provider/auth-provider";
interface ConfirmProps extends DialogComponentProps {
  message?: string;
}

export function ConfirmLogoutDialog({ ...props }: ConfirmProps) {
  const { logoutUser } = useAuth();
  return (
    <DialogModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      width={300}
      className="bg-white"
      dialogBodyClass={"!my-3"}
      isOverlayClick={true}
      isBtnClose={false}
    >
      <div className="text-white ">
        <p className="text-center text-red-500">
          정말로 계정에서 로그아웃하시겠습니까?
        </p>
        <div className="flex flex-row items-center justify-center gap-8 mt-3">
          <Button
            text="닫다"
            className={"  border-none bg-red-500 px-5 py-1 text-sm"}
            onClick={props.onClose}
          />
          <Button
            text="확인하다"
            className={" border-none bg-warning px-5 py-1 text-sm"}
            onClick={logoutUser}
          />
        </div>
      </div>
    </DialogModal>
  );
}
