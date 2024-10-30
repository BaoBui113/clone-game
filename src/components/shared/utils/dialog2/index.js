"use client"
import { useEffect } from "react";
import "./index.css";
import { TfiClose } from "react-icons/tfi";

import RModal from "react-modal";
const Dialog = ({
  children,
  isOpen,
  onClose,
  shouldCloseOnOverlayClick = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);
  return (
    <RModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="my-content-dialog"
      overlayClassName="my-overlay-dialog"
    >
      <div
        className="flex justify-end p-2 bg-primary-light"
        onClick={() => onClose()}
      >
        <TfiClose
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
          color="white"
        />
      </div>
      {children}
    </RModal>
  );
};

export default Dialog;
