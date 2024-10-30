"use client";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { NavMenuTop } from "./components/NavMenuTop";
import { Button } from "../shared/utils/form/Button";
import { LoginForm } from "./components/LoginForm";
import { useScreen } from "@/libs/hooks/useScreen";
import { JoinMemberFormDialog } from "@/components/shared/common/components/JoinMemberFormDialog";
import { useAuth } from "@/libs/provider/auth-provider";
import { UserRepo } from "@/types/user";
import { Popover, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { RowPopoverItem } from "../shared/common/components/RowItemPopover";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "./components/Sidebar";
import { HiMenuAlt3, HiOutlineMenuAlt3 } from "react-icons/hi";
type Props = {};

export function Header({ }: Props) {
  const logoPage = "/images/logo.png";

  const isXl = useScreen("xl");
  const {
    user,
    openLoginForm,
    setOpenLoginForm,
    openJoinMemberForm,
    setOpenJoinMemberForm,
  } = useAuth();

  const [isOpenSlideOut, setIsOpenSlideOut] = useState(false);

  return (
    <section className="sticky top-0 z-10 bg-[#21172E]">
      <header className="container flex flex-row items-center justify-between py-4 ">
        <Link href={"/"} >
          <Image
            src={logoPage}
            alt="logo"
            width={140}
            height={60}
            className="object-cover"
          />

        </Link>
        <div className="flex flex-row items-center justify-end gap-2 xl:gap-12">
          {isXl && <NavMenuTop />}
          {user ? (
            <>
              <ManageAccount user={user} />
            </>
          ) : (
            <>
              <div className="flex-row items-center hidden gap-2 xl:flex">
                <Button
                  text="로그인"
                  className={
                    "whitespace-nowrap rounded-lg border-2 border-warning bg-warning px-3 py-1 text-[12px] text-primary transition-all  hover:border-yellow-400 hover:bg-yellow-400 hover:text-white lg:px-6 lg:py-2 lg:text-base"
                  }
                  onClick={() => setOpenLoginForm?.(true)}
                />
                <Button
                  text="회원가입"
                  className={
                    "whitespace-nowrap rounded-lg border-2 border-warning px-3 py-1 text-[12px] hover:bg-warning hover:text-white lg:px-6 lg:py-2 lg:text-base"
                  }
                  onClick={() => setOpenJoinMemberForm?.(true)}
                />
              </div>
            </>
          )}
          <Button
            text=""
            icon={<HiMenuAlt3 />}
            onClick={() => setIsOpenSlideOut(true)}
            iconPosition="start"
            iconClassName={"!text-3xl font-semibold text-white"}
            className={"block border-none text-white xl:hidden !px-0"}
          />
        </div>
      </header>
      <LoginForm
        isOpen={!!openLoginForm}
        onClose={() => setOpenLoginForm?.(false)}
      />
      <JoinMemberFormDialog
        isOpen={!!openJoinMemberForm}
        onClose={() => setOpenJoinMemberForm?.(false)}
      />
      <Sidebar
        isOpen={isOpenSlideOut}
        onClose={() => setIsOpenSlideOut(false)}
      />
    </section>
  );
}

function ManageAccount({ user, ...props }: { user: UserRepo }) {
  const { setConfirmLogout } = useAuth();
  const router = useRouter();

  return (
    <>
      <Popover className="relative mt-1">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                 group inline-flex items-center rounded-md text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <i className="mr-1 text-xl text-warning">
                <FaUserCircle />
              </i>
              <span className="hidden text-sm text-warning lg:block ">{user.MEM_LID}</span>
              <FiChevronDown
                className={`${open ? "" : "text-opacity-70"}
                  ml-1 h-5 w-5 text-warning transition duration-150 ease-in-out group-hover:text-opacity-80 lg:block hidden`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-3 w-60 sm:px-0 ">
                <div className="overflow-hidden rounded shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="w-full bg-[#21172E] p-2">
                    <ul className="flex flex-col items-start justify-start ">
                      <RowPopoverItem
                        icon={<RiCoupon2Line />}
                        title="쿠폰내역"
                        onClick={() => {
                          router.push("?dialogWallet=true&tag=coupon");
                        }}
                      />
                      <RowPopoverItem
                        icon={<FaRegUserCircle />}
                        onClick={() => {
                          router.push("?dialogWallet=true&tag=account");
                        }}
                        title="마이페이지"
                      />

                      <RowPopoverItem
                        icon={<MdLogout />}
                        title="Logout"
                        onClick={() => setConfirmLogout?.(true)}
                      />
                    </ul>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}
