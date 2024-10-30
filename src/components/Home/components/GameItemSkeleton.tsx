"use client";
import { styleBase } from "@/libs/constants/color-skeleton";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
type Props = {};

export function GameItemSkeleton({}: Props) {
  return (
    <SkeletonTheme
      baseColor={styleBase?.baseColor}
      highlightColor={styleBase?.highlightColor}
    >
      <div className="flex flex-col justify-between gap-3">
        <Skeleton height={200} />
        <Skeleton count={2} />
        <Skeleton height={30} width={100} className="flex items-center justify-center mx-auto" />

      </div>
    </SkeletonTheme>
  );
}
