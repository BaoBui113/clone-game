"use client";
import { Button } from "@/components/shared/utils/form/Button";
import { Spinner } from "@/components/shared/utils/misc/spinner";
import { styleBase } from "@/libs/constants/color-skeleton";
import { formatDate, parseNumber } from "@/libs/helpers/parser";
import { useAuth } from "@/libs/provider/auth-provider";
import Image from "next/image";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const rankBoxStyle = {
  borderRadius: "4px",
  borderTop: "7px solid #9975FF",
  background:
    "lineargradient(180deg, rgba(255, 87, 87, 0.20) 0%, rgba(255, 255, 255, 0.20) 0.01%, rgba(217, 217, 217, 0.10) 100%)",
  boxShadow:
    "0px 1px 10px -1px rgba(255, 255, 255, 0.70) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.40)",
};
export function RankBoxItem({
  icon,
  title,
  contents,
  textError,
}: {
  icon: string;
  title: string;
  textError?: string;
  contents: {
    IO_REAL_AMOUNT?: string;
    MB_LOGID?: string;
    RGST_DT: string;
  }[];
}) {
  const { user } = useAuth();

  return (
    <div className="p-4 h-[300px] flex-shrink " style={rankBoxStyle}>
      <div className="flex items-center justify-between ">
        <div className="flex flex-row items-center gap-2">
          {" "}
          <Image
            src={icon || "/"}
            alt={`icon-${title}`}
            width={40}
            height={40}
            className="object-cover"
          />{" "}
          <span className="text-xl font-semibold text-white">{title}</span>
        </div>
        <Button
          text="전체보기"
          className={"rounded-xl border border-warning px-6 py-2 text-sm"}
          href={
            !user
              ? "?support=false&tag=rank-withdraw"
              : "?support=true&tag=rank-withdraw"
          }
        />
      </div>
      <div className="my-7">
        {contents === null || contents == undefined ? (
          <>
            <SkeletonTheme
              baseColor={styleBase?.baseColor}
              highlightColor={styleBase?.highlightColor}
            >
              <Skeleton count={5} height={25} className="my-1" />
            </SkeletonTheme>
          </>
        ) : (
          <>
            {!!contents?.length ? (
              contents.map((item, index) => (
                <Link href={"#"} key={index}>
                  <div className="flex flex-row items-center justify-between border-b border-[#727272] py-2">
                    <div className="text-sm text-[#9975FF]">
                      {" "}
                      {formatDate(item?.RGST_DT, "HH:mm:ss")}
                    </div>
                    <div className="text-sm text-white ">{item.MB_LOGID}</div>
                    <div className="text-sm text-warning">
                      {parseNumber(item?.IO_REAL_AMOUNT)}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-sm text-white">
                {textError ? textError : "아직 게시물이 없습니다"}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
