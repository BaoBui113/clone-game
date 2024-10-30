import React from "react";
import { DialogComponentProps, DialogModal } from "../../utils/dialog/dialog";
import { Button } from "../../utils/form/Button";
import { useDefaultContext } from "@/libs/provider/default-provider";
const styleAgreeRuleDialog = {
  background: "#161616",
  boxShadow:
    "0px 1px 10px -1px rgba(255, 255, 255, 0.70) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.40)",
};
interface AgreeRuleGameProps extends DialogComponentProps {}

export function AgreeRuleGameDialog({ ...props }: AgreeRuleGameProps) {
  const { setAgreeRuleGame } = useDefaultContext();
  return (
    <DialogModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      width={400}
      className="bg-white"
      dialogBodyClass={""}
      isOverlayClick={true}
      style={styleAgreeRuleDialog}
    >
      <div className="text-center">
        <div className="text-lg text-white">게임이용동의</div>
        <div className="mt-2 rounded bg-[#2f2739] p-3 text-sm text-warning">
          <p>
            모든 공지사항을 확인했으며
            <br />
            공지 미숙지에 관한 책임은 본인에게 있습니다.
            <br />
            특히 에볼루션게임 및 호텔카지노
            <br />
            그리고 모든 영상의 룰렛게임 이용하시는 분들은 꼭 숙지하시기
            바랍니다.
          </p>
          <div className="flex flex-row items-center justify-center gap-8 mt-3">
            <Button
              text="동의"
              className={
                "w-[100px] justify-center border-none bg-warning px-4 py-1"
              }
              onClick={() => {
                setAgreeRuleGame?.({ isOpen: false, status: true });
              }}
            />
            <Button
              text="동의안함"
              className={
                "w-[100px] justify-center border-none bg-gray-500 px-4 py-1"
              }
              onClick={() => {
                setAgreeRuleGame?.({ isOpen: false, status: false });
                props.onClose();
              }}
            />
          </div>
        </div>
      </div>
    </DialogModal>
  );
}
