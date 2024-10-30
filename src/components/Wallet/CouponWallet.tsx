import React, { useEffect, useState } from "react";
import { ColumnProps, Table } from "../shared/utils/table/table";
import { Button } from "../shared/utils/form/Button";
import { Pagination } from "../shared/utils/pagination/Pagination";
import { useWalletContext } from "./provider/wallet-provider";

import { ColumnItem, TableRow } from "../shared/utils/table/table-row";
import { formatDate, parseNumber } from "@/libs/helpers/parser";
import { CouponType } from "@/types/coupon";
import { getTokenHost } from "@/utils/getTokenAndHost";
import { useAuth } from "@/libs/provider/auth-provider";
import codeApi from "@/app/apis/codeApi";
import { TfiReload } from "react-icons/tfi";
import { useRouter } from "next/navigation";

type CouponWalletProps = {};

export function CouponWallet({}: CouponWalletProps) {
  const { loadingTable, setLoadingTable } = useWalletContext();
  const { token, host } = getTokenHost();
  const { user, isCheckTokenExpire } = useAuth();
  const [coupons, setCoupons] = useState<CouponType>(null as any);
  const router = useRouter()

  const [currentItems, setCurrentItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (user && token) {
        try {
          const res = await codeApi.getCoupons({
            token: token,
            host: host,
            mtype: "A",
            use_yn: "A", // A = ALL , N = NOT USE
          });
          if (res?.data.status == 0) {
            setCoupons(res.data);
          } 
          
        } catch (error) {
          const {response}:any = error
          console.error("Error fetching data coupon:", response?.data?.status );
          isCheckTokenExpire?.(response?.data?.status);

        }
      }
    })();
  }, [user, token]);

  useEffect(() => {
    if (coupons?.coupon_list) {
      setCurrentItems(coupons?.coupon_list.slice(0, 10));
    }
  }, [coupons]);

  const isCheckExpDateCoupon = (exp_data: string) => {
    return new Date().toISOString().slice(0, 10) > exp_data;
  };
  return (
    <div>
      <div className="text-2xl">쿠폰사용</div>

      <p className="mt-2 text-sm">- 쿠폰만 사용시 5배이상 출금제한됩니다. </p>
      <p className="mt-2 text-sm">
        - 입금과 동시사용시 무제한 출금 가능합니다.{" "}
      </p>
      <p className="mt-2 text-sm">
        - 쿠폰만료일이 정해져 있으니 기간만료일 이전에 꼭 사용하세요.
      </p>
      <p className="text-sm">
        <span className="text-red-700">
          {" "}
          - 에볼루션 / 아시안 / 드림 / WM Live / 마이크로 / 프라그마틱 / 드윈 /
          보타 / 통합슬롯
        </span>
        을 이용해주시는 회원분께서는 통합월렛으로 신청바랍니다.{" "}
      </p>

      <div className="mt-6">
        <Button
          text=""
          icon={<TfiReload />}
          className={"mb-3 ml-auto flex !h-9 justify-end bg-white text-black "}
          iconPosition="start"
          iconClassName={`font-semibold text-black ${
            loadingTable && "animate-spin"
          }`}
          onClick={() => setLoadingTable?.(!loadingTable)}
        />
        <Table columns={THEAD_COUPON} items={currentItems}>
          <TableRow items={currentItems}>
            {(row) => [
              <ColumnItem
                key="CREGDT"
                value={formatDate(row.CREGDT, "year_month_date")}
              />,
              <ColumnItem key="CDESC" value={row.CDESC} />,
              <ColumnItem
                key="AMOUNT"
                value={
                  <div className="text-warning">{parseNumber(row.AMOUNT)}</div>
                }
              />,
              <ColumnItem
                key="EXP_DATE"
                value={formatDate(row.EXP_DATE, "year_month_date")}
              />,
              <ColumnItem
                key="U_STATUS"
                value={
                  <>
                    {isCheckExpDateCoupon(row.EXP_DATE) ? (
                      <span className="text-white">기간만료</span>
                    ) : (
                      ""
                    )}
                  </>
                }
              />,
              <ColumnItem
                key="GO_DEPOSIT"
                value={
                  <>
                    <Button
                      text="사용하기"
                      className={
                        "border border-red-400 bg-red-100 text-red-400"
                      }
                      disabled={isCheckExpDateCoupon(row.EXP_DATE)}
                    />
                  </>
                }
              />,
            ]}
          </TableRow>
        </Table>
      </div>
      <Pagination
        items={coupons?.coupon_list as []}
        itemsPerPage={10}
        currentItems={(items) => setCurrentItems(items)}
      />
    </div>
  );
}

const THEAD_COUPON: ColumnProps[] = [
  { label: "등록일", field: "CREGDT" },
  { label: "쿠폰명", field: "CDESC" },
  { label: "만료일자", field: "AMOUNT" },
  { label: "만료일자", field: "EXP_DATE" },
  { label: "사용브랜드", field: "EXP_USE" },
  { label: "쿠폰사용", field: "U_STATUS" },
];
