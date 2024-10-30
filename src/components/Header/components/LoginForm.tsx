"use client";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Input } from "@/components/shared/utils/form/Input";
import { Button } from "@/components/shared/utils/form/Button";
import { HiOutlineKey } from "react-icons/hi2";

import { useForm } from "react-hook-form";

import {
  DialogComponentProps,
  DialogModal,
} from "@/components/shared/utils/dialog/dialog";
import Image from "next/image";
import { useScreen } from "@/libs/hooks/useScreen";
import { useToast } from "@/libs/provider/toast-provider";
import { useAuth } from "@/libs/provider/auth-provider";
import { useRouter } from "next/navigation";
import Form from "@/components/shared/utils/form/Form";

import Loading from "@/components/shared/utils/loading";
import { ShowMessageDialog } from "@/components/shared/common/components/ShowMessageDialog";

type FormLoginProps = {};

export function LoginForm({ ...props }: FormLoginProps & DialogComponentProps) {
  const isLg = useScreen("lg");
  const methods = useForm();
  const { loginUser, deviceInfo, setOpenJoinMemberForm, setIsOpenMsg } =
    useAuth();
  const [textError, setTextError] = useState({ text: "", status: true });
  const [isOpenLog, setIsOpenLog] = useState(false);

  const router = useRouter();

  const { reset } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitLogin = async (data: any) => {
    setIsLoading(true);
    try {
      await loginUser?.({
        userid: data.userid,
        password: data.password,
        userip: deviceInfo.userIp,
        host: "192.168.10.155",
        u_browser: deviceInfo.browserName,
        u_device: deviceInfo.device,
        u_os: deviceInfo.os,
        fp: "c1ff08ceba1900a1cb06f3441a2f67a",
      });

      methods.reset(); // Reset the form fields on successful login
      props.onClose();
    } catch (error) {
      console.log("login failed!", error);
      setTextError({
        text: `"login failed!", ${error}`,
        status: false,
      });
      setIsOpenLog?.(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!props.isOpen) {
      reset();
    }
  }, [props.isOpen]);

  return (
    <>
      <DialogModal
        isOpen={props.isOpen}
        onClose={() => {
          props.onClose();
          router.push("/");
        }}
        className="border-t-4 border-warning "
        width={isLg ? 400 : 300}
        dialogBodyClass={"px-5"}
      >
        <div className="flex items-center justify-center mb-5">
          <Image
            src={"/images/logo.png"}
            alt="logo page"
            width={160}
            height={60}
            className="object-cover h-auto "
          />
        </div>

        <Form
          className="flex flex-col items-center justify-center gap-5 "
          onSubmit={onSubmitLogin}
        >
          <Input
            placeholder="User ID"
            name="userid"
            icon={<FaRegUser />}
            required
            iconPosition="start"
            iconClassName={"text-[#deb24c]"}
            inputWrapStyle="w-full"
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            icon={<HiOutlineKey />}
            required
            iconPosition="start"
            iconClassName={"text-[#deb24c]"}
            inputWrapStyle="w-full"
          />
          <Button
            text="Login"
            className={
              "mx-auto w-full flex-row justify-center border-none  bg-warning px-3 py-2 text-center !text-primary "
            }
          />
          <div className="flex flex-row items-center justify-center gap-3 text-sm lg:text-base">
            <span
              className="cursor-pointer text-warning hover:underline"
              onClick={() => setOpenJoinMemberForm?.(true)}
            >
              회원가입
            </span>
            <span
              className="cursor-pointer text-warning hover:underline"
              onClick={() => setIsOpenMsg?.(true)}
            >
              ID/PW찾기
            </span>
          </div>
        </Form>
      </DialogModal>
      <Loading isLoading={isLoading} onClose={() => setIsLoading(false)} />
      <ShowMessageDialog
        isOpen={isOpenLog}
        onClose={() => setIsOpenLog?.(false)}
        bgColor={textError?.status ? "success" : "error"}
      >
        <div className="">{textError?.text}</div>
      </ShowMessageDialog>
    </>
  );
}
