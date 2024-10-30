import React from "react";
import { DialogComponentProps, DialogModal } from "../../utils/dialog/dialog";
import { Button } from "../../utils/form/Button";

interface AlertShowMsgProps extends DialogComponentProps {
  message?: string;
}

export function AlertShowMsg({ message, ...props }: AlertShowMsgProps) {
  return (
    <DialogModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      width={400}
      className=""
      dialogBodyClass={""}
      isOverlayClick={true}
    >
      <div className="p-3 text-white ">
        <p className="text-center">{message}</p>
        <Button
          text="닫다"
          className={"mt-2 bg-warning px-5 py-1 !text-black mx-auto text-sm"}
          onClick={props.onClose}
        />
      </div>
    </DialogModal>
  );
}
