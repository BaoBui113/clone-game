import { RowItem } from "@/components/shared/common/components/RowItem";
import { Button } from "@/components/shared/utils/form/Button";
import { Input } from "@/components/shared/utils/form/Input";
import React, { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import Form from "@/components/shared/utils/form/Form";
import { useAuth } from "@/libs/provider/auth-provider";
import { useToast } from "@/libs/provider/toast-provider";
import { GetUserInfo } from "@/libs/repo/auth";

type Props = {};

export function AccountInfoTab({}: Props) {
  const { updateAccountPassword } = useAuth();
  const userInfo = GetUserInfo();
  const toast = useToast();
  const { reset } = useForm<FormData>();

  const obSubmitJoinMember = async (data: any) => {
    if (data) {
      const { passwordNew, old_password, new_password } = data;
      if (passwordNew !== new_password) {
        toast.error("새 비밀번호가 일치하지 않습니다");
      } else {
        updateAccountPassword?.(old_password, new_password);
        reset();
      }
    }
  };
  const coverPhoneNumber = (phone: string) => {
    return phone?.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1-$2**-**$4");
  };

  return (
    <div>
      <Form
        className="flex flex-col items-center gap-5 "
        onSubmit={obSubmitJoinMember}
      >
        <div className="w-full rounded shadow-lg bg-primary p-7">
          <RowItem label="밴더아이디">
            {" "}
            <div className="text-gray-600">
              {coverPhoneNumber(userInfo?.HP_NO)}
            </div>
          </RowItem>
          <RowItem label="현재비밀번호">
            {" "}
            <div className="flex flex-col items-start justify-start gap-3 lg:flex-row">
              <Input
                placeholder=""
                type="password"
                required
                name="old_password"
                style={{
                  width: "100%",
                }}
                inputWrapStyle="w-[180px]"
                messageError="현재 비밀번호 필요"
              />
              <p className="mt-1 text-xs text-gray-400">
                * 현재 사용하고 계시는 비밀번호를 입력하세요.
              </p>
            </div>
          </RowItem>
          <RowItem label="새로운 비밀번호">
            {" "}
            <>
              <div className="flex flex-col items-start justify-start gap-3 lg:flex-row">
                <Input
                  placeholder=""
                  type="password"
                  name="passwordNew"
                  required
                  style={{
                    width: "100%",
                  }}
                  inputWrapStyle="w-[180px]"
                  messageError="새 비밀번호 요청"
                />
                <p className="mt-1 text-xs text-gray-400">
                  * 새로운 비밀번호를 입력하세요.
                </p>
              </div>
            </>
          </RowItem>
          <RowItem label="새로운비밀번호 확인 ">
            <>
              <div className="flex flex-col items-start justify-start gap-3 lg:flex-row">
                <Input
                  placeholder=""
                  type="password"
                  required
                  name="new_password"
                  style={{
                    width: "100%",
                  }}
                  inputWrapStyle="w-[180px]"
                  messageError={"확인 새 비밀번호 입력"}
                />
                <p className="mt-1 text-xs text-gray-400">
                  * 새로운 비밀번호를 다시 한번 입력하세요.
                </p>
              </div>
            </>
          </RowItem>
        </div>
        <Button
          text="등록하다"
          className={
            "mx-auto my-8 w-full flex-row justify-center  border-none bg-warning px-3 py-2 text-center !text-primary lg:w-[400px]"
          }
          onClick={() => console.log("submit")}
        />
      </Form>
    </div>
  );
}
