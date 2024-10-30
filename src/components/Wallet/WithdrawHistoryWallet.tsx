import React, { useEffect, useState } from "react";
import { ColumnProps, Table } from "../shared/utils/table/table";
import { ColumnItem, TableRow } from "../shared/utils/table/table-row";
import { formatDate, parseNumber } from "@/libs/helpers/parser";
import { Pagination } from "../shared/utils/pagination/Pagination";
import { useWalletContext } from "./provider/wallet-provider";
import { TYPES, WithdrawHistoryType } from "@/types/withdraw-history";
import { takeTwoDaysApart } from "@/libs/helpers/get-date-form-string";
import { Button } from "../shared/utils/form/Button";
import { TfiReload } from "react-icons/tfi";
import Select from "../shared/utils/form/Select";
import { getTokenHost } from "@/utils/getTokenAndHost";
import { useAuth } from "@/libs/provider/auth-provider";
import exchangeApi from "@/app/apis/exchangeApi";

type Props = {};

export function WithdrawHistoryWallet({}: Props) {
  const { token, host } = getTokenHost();
  const { user,isCheckTokenExpire } = useAuth();
  const {
    setLoadingTable,
    loadingTable,
  } = useWalletContext();
  const [currPage, setCurrPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [withdrawType, setWithdrawType] = useState<"I" | "O" |string>("I");
  const [typeWithdraw, setTypeWithdraw] = useState(TYPES?.find((item)=> item.value === withdrawType))
  const [withdrawHistory, setWithdrawHistory] = useState<WithdrawHistoryType>(
    null as any
  );
  const { day, month, year } = takeTwoDaysApart();

  useEffect(() => {
    (async () => {
      if (user && token) {
        console.log("run with history")
        try {
          const res = await exchangeApi.getWithdrawHistory({
            token: token,
            host: host,
            type: withdrawType, 
          });
          if (res?.data.status == 0) {
            setWithdrawHistory(res.data);
          }else{
          isCheckTokenExpire?.(res?.data.status);

          }
        } catch (error) {
          console.log("error",error)
          const {response}:any = error
          console.error("Error fetching data history", response?.data?.status );
          isCheckTokenExpire?.(response?.data?.status);
        }
      }
    })();
  }, [withdrawType,loadingTable,token,user]);

  useEffect(() => {
    if (withdrawHistory?.list) {
      setCurrentItems(withdrawHistory?.list.slice(0, 10));
    }
  }, [withdrawHistory]);

  const calculateStt = (index: number) => {
    return (currPage - 1) * 10 + index + 1;
  };
  const onSelectType = (ele:any)=> {

    setWithdrawType?.(ele?.value)
    setTypeWithdraw(ele)
    setLoadingTable?.(!loadingTable)
  }
  return (
    <div>
      <div className="flex flex-col items-start justify-between lg:flex-row lg:items-end">
        <div>
          <div className="text-2xl">입출금내역</div>
          <p className="mt-2 text-sm">
            {`${year} - ${month} - ${day}`} 부터 현재까지의{" "}
            {withdrawType == "I" ? "입금" : "출금"} 내역입니다.{" "}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <Button
            text=""
            icon={<TfiReload />}
            className={"!h-9 bg-white text-black "}
            iconPosition="start"
            iconClassName={`font-semibold text-black ${
              loadingTable && "animate-spin"
            }`}
            onClick={() => setLoadingTable?.(!loadingTable)}
          />
          <Select
            value={typeWithdraw}
            options={TYPES}
            onSelect={onSelectType}
            placeholder=""
          />
        </div>
      </div>

      <div className="mt-6">
        <Table columns={THEAD_HISTORY_WITHDRAW} items={currentItems}>
          <TableRow items={currentItems}>
            {(row, idx) => [
              <ColumnItem key="STT" value={<>{calculateStt(idx)}</>} />,
              <ColumnItem
                key="RGST_DT"
                value={formatDate(row.RGST_DT, "MM-dd HH:mm:ss")}
              />,
              <ColumnItem key="GAMENAME" value={row.GAMENAME} />,
              <ColumnItem
                key="IO_AMOUNT"
                value={
                  <div className="text-warning">
                    {parseNumber(row.IO_AMOUNT)}
                  </div>
                }
              />,
              <ColumnItem
                key="SYS_NM"
                value={
                  <>
                    <span className="text-white">
                      {row.SYS_NM.replace("게임승인", "출금대기중")}
                    </span>
                  </>
                }
              />,
              <ColumnItem
                key="CHG_DT"
                value={formatDate(row.CHG_DT, "MM-dd HH:mm:ss")}
              />,
            ]}
          </TableRow>
        </Table>
      </div>
      <Pagination
        items={withdrawHistory?.list as []}
        itemsPerPage={10}
        currentItems={(items) => setCurrentItems(items)}
        getCurrentPage={(page) => setCurrPage(page)}
      />
    </div>
  );
}

const THEAD_HISTORY_WITHDRAW: ColumnProps[] = [
  {
    field: "STT",
    label: "No.",
  },
  {
    field: "RGST_DT",
    label: "신청일자",
  },
  {
    field: "GAMENAME",
    label: "신청브랜드",
  },
  {
    field: "IO_AMOUNT",
    label: "신청금액",
  },
  {
    field: "SYS_NM",
    label: "진행결과",
  },
  {
    field: "CHG_DT",
    label: "처리일자",
  },
];
