"use client";
import { styleBase } from "@/libs/constants/color-skeleton";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

type Props = {};

export function BannerItemSkeleton({}: Props) {

  return (
    <SkeletonTheme
      baseColor={styleBase?.baseColor}
      highlightColor={styleBase?.highlightColor}
    >
      <Skeleton className="flex h-[300px] flex-col justify-between gap-3 lg:h-[610px]" />
    </SkeletonTheme>
  );
}
