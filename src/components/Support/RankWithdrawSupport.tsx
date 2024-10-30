import React, { useEffect, useState } from "react";
import Table, { ColumnProps } from "../shared/utils/table/table";
import { ColumnItem, TableRow } from "../shared/utils/table/table-row";
import { parseNumber } from "@/libs/helpers/parser";

import { useSupportContext } from "./provider/support-provider";

type Props = {};

export function RankWithdrawSupport({}: Props) {
  return (
    <div>
      <div className="text-xl">실시간 출금현황</div>
      <div className="grid grid-cols-1 gap-3 mt-4 lg:grid-cols-2">
        <RankWithDrawWeek />
        <RankWithDrawDayLive />
      </div>
    </div>
  );
}

function RankWithDrawWeek() {
  const { withDrawWeek } = useSupportContext();
  const [currentWeekItems, setCurrentWeekItems] = useState<any[]>(
    withDrawWeek?.list as []
  );
  useEffect(() => {
    if (withDrawWeek?.list) {
      setCurrentWeekItems(withDrawWeek?.list);
    }
  }, [withDrawWeek]);

  const getPreviousDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Subtract 1 day

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = currentDate.getFullYear();

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div className="mb-2 text-lg text-warning">금주출금 랭킹</div>
      <Table columns={THEAD_WEEK} items={currentWeekItems}>
        <TableRow
          items={currentWeekItems}
          textNotFound={"금주 출금 TOP10 데이터가 존재하지 않습니다."}
        >
          {(row, idex) => [
            <ColumnItem key="STT" value={++idex} />,
            <ColumnItem key="RGST_DT" value={row.RGST_DT} />,
            <ColumnItem key="MB_LOGID" value={row.MB_LOGID} />,
            <ColumnItem
              key="IO_REAL_AMOUNT"
              value={
                <span className="text-warning">
                  {parseNumber(row.IO_REAL_AMOUNT)}
                </span>
              }
            />,
          ]}
        </TableRow>
      </Table>
      <div className="mt-2 text-right text-[13px]">
        * 산정일 : {getPreviousDate()} 00시 부터 현재까지
      </div>
    </div>
  );
}

function RankWithDrawDayLive() {
  const { withDrawDay } = useSupportContext();
  const [currentDayItems, setCurrentDayItems] = useState<any[]>(
    withDrawDay?.list as []
  );
  useEffect(() => {
    if (withDrawDay?.list) {
      setCurrentDayItems(withDrawDay?.list);
    }
  }, [withDrawDay]);

  return (
    <div>
      <div className="mb-2 text-lg text-warning">금일 실시간 출금현황</div>
      <Table columns={THEAD_DAYLIVE} items={currentDayItems}>
        <TableRow
          items={currentDayItems}
          textNotFound={"실시간 데이터가 존재하지 않습니다"}
        >
          {(row) => [
            <ColumnItem key="RGST_DT" value={row.RGST_DT} />,
            <ColumnItem key="MB_LOGID" value={row.MB_LOGID} />,
            <ColumnItem
              key="IO_REAL_AMOUNT"
              value={
                <div className="text-warning">
                  {parseNumber(row.IO_REAL_AMOUNT)}
                </div>
              }
            />,
          ]}
        </TableRow>
      </Table>
      <div className="mt-2 text-right text-[13px]">
        * 산정일 : 현재부터 40건 까지
      </div>
    </div>
  );
}

const THEAD_WEEK: ColumnProps[] = [
  { label: "순위", field: "STT" },
  { label: "시간", field: "RGST_DT" },
  { label: "닉네임", field: "MB_LOGID" },
  { label: "금액", field: "IO_REAL_AMOUNT" },
];
const THEAD_DAYLIVE: ColumnProps[] = [
  { label: "시간", field: "RGST_DT" },
  { label: "닉네임", field: "MB_LOGID" },
  { label: "금액", field: "IO_REAL_AMOUNT" },
];
