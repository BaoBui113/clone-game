import React, { useEffect, useState } from "react";
import Table, { ColumnProps } from "../shared/utils/table/table";
import { ColumnItem, TableRow } from "../shared/utils/table/table-row";
import { Pagination } from "../shared/utils/pagination/Pagination";
import { useSupportContext } from "./provider/support-provider";
import { formatDate } from "@/libs/helpers/parser";
import { BoxItemDetail } from "./components/BoxItemDetail";
import { useScreen } from "@/libs/hooks/useScreen";
import { NotifyPagingMobile } from "./components/NotifyPadingMobile";
import { styleBase } from "@/libs/constants/color-skeleton";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

type Props = {};

export function FaqSupport({}: Props) {
  const isLg = useScreen("lg");
  const { mainBoardPagingFaq, seq, setSeq } = useSupportContext();
  const [currentFAaqItems, setCurrentFaqItems] = useState<any[]>([]);
  useEffect(() => {
    if (mainBoardPagingFaq?.list) {
      setCurrentFaqItems(mainBoardPagingFaq?.list.slice(0, 10));
    } else {
      setCurrentFaqItems([]);
    }
  }, [mainBoardPagingFaq]);

  return (
    <>
      <div className="mb-3 text-xl">자주묻는질문</div>
      {seq ? (
        <>
          <BoxItemDetail />
        </>
      ) : (
        <>
          {isLg ? (
            <>
              <Table columns={THEAD_FAQ} items={currentFAaqItems}>
                {currentFAaqItems === null || currentFAaqItems === undefined ? (
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
                  <TableRow items={currentFAaqItems}>
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
                items={mainBoardPagingFaq?.list as []}
                itemsPerPage={10}
                currentItems={(items) => setCurrentFaqItems(items)}
                isShowPaging={false}
              />
            </>
          ) : (
            <NotifyPagingMobile notifies={currentFAaqItems} />
          )}
        </>
      )}
    </>
  );
}

const THEAD_FAQ: ColumnProps[] = [
  { label: "No.", field: "NOTICE_SEQ" },
  { label: "제목", field: "NOTICE_TITLE" },
  { label: "등록일", field: "RGST_DT" },
];
