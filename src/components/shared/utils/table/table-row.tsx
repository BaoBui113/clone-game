"use client";
import { useEffect, useState, Fragment } from "react";

import { useWalletContext } from "@/components/Wallet/provider/wallet-provider";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { styleBase } from "@/libs/constants/color-skeleton";

interface TableRowProps<T> {
  children: (row: T, idx?: number | any) => React.ReactNode[];
  items: T[];
  textNotFound?: string | JSX.Element;
}
export function TableRow<T>({
  children,
  items,
  textNotFound,
}: TableRowProps<T>) {
  const { loadingTable } = useWalletContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (items && items.length >= 0) {
      setIsLoading(false);
    }
  }, [items]);

  return (
    <>
      {isLoading || loadingTable ? (
        <tr>
          <td className="" colSpan={100}>
            <SkeletonTheme
              baseColor={styleBase?.baseColor}
              highlightColor={styleBase?.highlightColor}
            >
              <Skeleton count={5} height={20} width={"100%"} />
            </SkeletonTheme>
          </td>
        </tr>
      ) : items && !items.length && !isLoading ? (
        <tr>
          <td
            className="w-full p-3 text-xs text-center text-white"
            colSpan={100}
          >
            {textNotFound ? textNotFound : "게시물이 없습니다"}
          </td>
        </tr>
      ) : (
        <>
          {items?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {children(row, rowIndex).map((node, columnIndex) => (
                <Fragment key={columnIndex}>{node}</Fragment>
              ))}
            </tr>
          ))}
        </>
      )}
    </>
  );
}

export function ColumnItem({
  value,
  col,
  align = "center",
}: {
  value: string | any;
  col?: number;
  align?: string;
}) {
  return (
    <td
      className={`p-2 text-${align} border-b border-[#3C3C3C] text-[13px] text-white `}
      colSpan={col}
    >
      {value}
    </td>
  );
}
