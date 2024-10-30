import React, { useEffect, useState } from "react";
import Table, { ColumnProps } from "../shared/utils/table/table";
import { ColumnItem, TableRow } from "../shared/utils/table/table-row";
import { Pagination } from "../shared/utils/pagination/Pagination";
import { formatDate } from "@/libs/helpers/parser";
import { useSupportContext } from "./provider/support-provider";

import { BoxItemDetail } from "./components/BoxItemDetail";
import { useScreen } from "@/libs/hooks/useScreen";
import { NotifyPagingMobile } from "./components/NotifyPadingMobile";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { styleBase } from "@/libs/constants/color-skeleton";

type Props = {};

export function NotifySupport({}: Props) {
  const isLg = useScreen("lg");
  const { mainBoardPagingNotify, seq, setSeq } = useSupportContext();
  const [currentNotifyItems, setCurrentNotifyItems] = useState<any[]>([]);
  useEffect(() => {
    if (mainBoardPagingNotify?.list) {
      setCurrentNotifyItems(mainBoardPagingNotify?.list.slice(0, 10));
    }
  }, [mainBoardPagingNotify]);

  return (
    <>
      <div className="mb-3 text-xl">공지사항</div>
      {seq ? (
        <>
          <BoxItemDetail />
        </>
      ) : (
        <>
          {isLg ? (
            <>
              <Table columns={THEAD_NOTIFY} items={currentNotifyItems}>
                {currentNotifyItems === null ||
                currentNotifyItems === undefined ? (
                  <tr>
                    <td className="" colSpan={100}>
                      <SkeletonTheme
                        baseColor={styleBase?.baseColor}
                        highlightColor={styleBase?.highlightColor}
                      >
                        <Skeleton count={5} height={20} />
                      </SkeletonTheme>
                    </td>
                  </tr>
                ) : (
                  <TableRow items={currentNotifyItems}>
                    {(row) => [
                      <ColumnItem
                        key="NOTICE_SEQ"
                        value={
                          <span className="text-blue-500">
                            {row.NOTICE_SEQ}
                          </span>
                        }
                      />,
                      <ColumnItem
                        key="NOTICE_TITLE"
                        value={
                          <span
                            className="text-yellow-400 cursor-pointer"
                            onClick={() => setSeq?.(row.NOTICE_SEQ)}
                          >
                            {row.NOTICE_TITLE}
                          </span>
                        }
                        align="left"
                      />,
                      <ColumnItem
                        key="RGST_DT"
                        value={formatDate(row.RGST_DT, "year_month_date")}
                      />,
                    ]}
                  </TableRow>
                )}
              </Table>
              <Pagination
                items={mainBoardPagingNotify?.list as []}
                itemsPerPage={10}
                currentItems={(items) => setCurrentNotifyItems(items)}
                isShowPaging={false}
              />
            </>
          ) : (
            <NotifyPagingMobile notifies={currentNotifyItems} />
          )}
        </>
      )}
    </>
  );
}

const THEAD_NOTIFY: ColumnProps[] = [
  { label: "No.", field: "NOTICE_SEQ" },
  { label: "제목", field: "NOTICE_TITLE" },
  { label: "등록일", field: "RGST_DT" },
];
