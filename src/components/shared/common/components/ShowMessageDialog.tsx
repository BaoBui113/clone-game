"use client"
import React, { useEffect } from "react";
import { DialogModal } from "../../utils/dialog/dialog";

import { BsCheckCircleFill } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";

type Props = {
  isOpen: boolean | any;
  onClose: () => any;
  children: React.ReactNode;
  bgColor?: "error" | "success" | "info" | "default";
  shouldCloseOnOverlayClick?: boolean;
};

export function ShowMessageDialog({
  isOpen,
  onClose,
  bgColor = "default",
  shouldCloseOnOverlayClick = true,
  children,
}: Props) {
  const checkColor = (color: string) => {
    switch (color) {
      case "error":
        return { icon: <BiError />, color: "text-red-500" };
      case "success":
        return { icon: <BsCheckCircleFill />, color: " text-green-500" };
      case "info":
        return { icon: <FaInfoCircle />, color: " text-blue-500" };
      default:
        return { icon: <AiFillFileText />, color: "text-black" };
    }
  };
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  return (
    <DialogModal
      isOpen={isOpen}
      onClose={onClose}
      isBtnClose={false}
      width={350}
      className={"bg-white text-black"}
      isOverlayClick={true}
    >
      <div className={`text-center `}>
        <div
          className={`mb-2 flex flex-row items-center justify-center text-center text-4xl ${
            checkColor(bgColor)?.color
          }`}
        >
          {checkColor(bgColor)?.icon}
        </div>
        <div className={`${checkColor(bgColor)?.color}`}>{children}</div>
      </div>
    </DialogModal>
    // <RModal
    //   isOpen={isOpen}
    //   shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    //   onRequestClose={onClose}
    //   ariaHideApp={false}
    //   className="my-content"
    //   overlayClassName="my-overlay"
    // >
    //   <div>
    //     {children}
    //   </div>

    // </RModal>
  );
}
