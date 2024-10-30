import React from "react";
import { DialogComponentProps, DialogModal } from "../../utils/dialog/dialog";
import { Button } from "../../utils/form/Button";

type Props = {
  message?: string | any;
};

export function LoginMsgDialog({
  message,
  ...props
}: Props & DialogComponentProps) {
  return (
    <DialogModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      width={700}
      className="h-[800px] bg-cover bg-center bg-no-repeat !px-0 pb-0 "
      isBtnClose={false}
      style={{ backgroundImage: `url('${"/images/mainpopup_bg.jpg"}')` }}
      dialogBodyClass={"flex flex-col justify-center h-full"}
    >
      {message && (
        <div className="flex flex-col justify-end p-4 mt-6">
          <div
            className="flex flex-row items-center justify-center ck-content"
            dangerouslySetInnerHTML={{
              __html: message.TITLE_TXT,
            }}
          ></div>
          <div className="h-[550px] overflow-y-auto">
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: message.MSG_TXT }}
            />
          </div>
          <div className="flex flex-row justify-center mt-3">
            <Button
              text="창닫기 ✕"
              className={"px-6 py-1"}
              onClick={props.onClose}
            />
          </div>
        </div>
      )}
    </DialogModal>
  );
}
