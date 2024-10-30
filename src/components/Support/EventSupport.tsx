import React, { useEffect, useState } from "react";
import Table, { ColumnProps } from "../shared/utils/table/table";
import { useSupportContext } from "./provider/support-provider";
import { ColumnItem, TableRow } from "../shared/utils/table/table-row";
import { formatDate } from "@/libs/helpers/parser";
import { Pagination } from "../shared/utils/pagination/Pagination";
import { BoxItemDetail } from "./components/BoxItemDetail";
import { useScreen } from "@/libs/hooks/useScreen";
import { NotifyPagingMobile } from "./components/NotifyPadingMobile";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { styleBase } from "@/libs/constants/color-skeleton";
type Props = {};

export function EventSupport({}: Props) {
  const isLg = useScreen("lg");
  const { mainBoardPagingEvent, seq, setSeq } = useSupportContext();
  const [currentEventItems, setCurrentEventItems] = useState<any[]>([]);
  useEffect(() => {
    if (mainBoardPagingEvent?.list) {
      setCurrentEventItems(mainBoardPagingEvent?.list.slice(0, 10));
    } else {
      setCurrentEventItems([]);
    }
  }, [mainBoardPagingEvent]);
console.log("currentEventItems",currentEventItems)
  return (
    <>
      <div className="mb-3 text-xl">이벤트안내</div>
      {seq ? (
        <>
          <BoxItemDetail />
        </>
      ) : (
        <>
          {isLg ? (
            <>
              <Table columns={THEAD_EVENT} items={currentEventItems}>
                {currentEventItems === null ||
                currentEventItems === undefined ? (
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
                  <TableRow items={currentEventItems}>
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
                items={mainBoardPagingEvent?.list as []}
                itemsPerPage={10}
                currentItems={(items) => setCurrentEventItems(items)}
                isShowPaging={false}
              />
            </>
          ) : (
            <NotifyPagingMobile notifies={currentEventItems} />
          )}
        </>
      )}
    </>
  );
}

const THEAD_EVENT: ColumnProps[] = [
  { label: "No.", field: "NOTICE_SEQ" },
  { label: "제목", field: "NOTICE_TITLE" },
  { label: "등록일", field: "RGST_DT" },
];
