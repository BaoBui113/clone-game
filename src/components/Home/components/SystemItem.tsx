"use client";
import { Button } from "@/components/shared/utils/form/Button";
import { styleBase } from "@/libs/constants/color-skeleton";
import { getDateFormString } from "@/libs/helpers/get-date-form-string";
import Image from "next/image";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export function SystemItem({
  title,
  icon,
  listContent,
  path,
}: {
  title: string;
  icon?: string;
  listContent?: any[];
  path: string;
}) {
  const styleItem = {
    borderRadius: "4px",
    borderTop: "7px solid #8AFFC7",
    background:
      "lineargradient(180deg, rgba(255, 87, 87, 0.20) 0%, rgba(255, 255, 255, 0.20) 0.01%, rgba(217, 217, 217, 0.10) 100%)",
    boxShadow:
      "0px 1px 10px -1px rgba(255, 255, 255, 0.70) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.40)",
  };

  return (
    <div style={styleItem} className="h-[290px] flex-shrink p-4 ">
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
          className={
            "rounded-xl border border-warning px-6 py-2 text-sm lg:text-base"
          }
          href={path}
        />
      </div>
      <div className="my-7 h-full overflow-y-auto lg:h-[150px]  xl:h-full">
        {listContent === null || listContent == undefined ? (
          <SkeletonTheme
            baseColor={styleBase?.baseColor}
            highlightColor={styleBase?.highlightColor}
          >
            <Skeleton  count={5} height={25} className="my-1" />
          </SkeletonTheme>
        ) : (
          <>
            {!!listContent?.length ? (
              listContent.map((item, index) => (
                <Link href={item.url || "/"} key={index}>
                  <div className="flex flex-row items-center justify-between border-b border-[#727272] py-2 text-white hover:text-warning">
                    <div className="... w-36 truncate text-xs  lg:w-[230px] lg:text-sm">
                      {item.NOTICE_TITLE}
                    </div>
                    <div className="text-[10px]  lg:text-sm">
                      {getDateFormString(item.RGST_DT)}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-sm text-white">아직 게시물이 없습니다</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
