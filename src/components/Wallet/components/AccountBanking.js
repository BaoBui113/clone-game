import React, { useState, useEffect} from "react";
import { RowItem } from "@/components/shared/common/components/RowItem";
import { Input } from "@/components/shared/utils/form/Input";
import { useWalletContext } from "../provider/wallet-provider";
import Select from '@/components/shared/utils/form/Select'
import Form from "@/components/shared/utils/form/Form";



export function AccountBanking() {
  const { accountInfo } = useWalletContext();
  console.log("accountInfo", accountInfo)
  const [bank, setBank] = useState(null)
  const [bankList, setBankList] = useState([])



  const maskString = (inputString) => {
    if (inputString) {
      const lastEightChars = inputString.slice(-8);
      const maskedPart = inputString.length >= 8 ? "*".repeat(inputString.length - 8) : "";
      return maskedPart + lastEightChars;
    }
  };
  
  useEffect(() => {
    const _bankList = accountInfo?.BANK_LIST?.map((bank) => { return { label: bank.BANK_NM, value: bank.BANK_CD } })
    const _bank = _bankList?.find(bank => bank.value == accountInfo?.LAST_BANK_INFO.BANK_CD)
    setBank(_bank)
    setBankList(_bankList)
}, [accountInfo])

  return (
    <div>
      <div className="w-full rounded shadow-lg bg-primary p-7">
        <Form onSubmit={() => { }}>
          <RowItem label="은행" className="lg:mb-3">
            <div className="flex w-[180px]">
              <Select value={bank} options={bankList} isDisabled placeholder="--선택--" />
            </div>
          </RowItem>
          <RowItem label="예금주" className="lg:mb-3">
            {" "}
            <>
              <div className="flex flex-row items-start justify-start gap-3">
                <Input
                  placeholder=""
                  type="text"
                  name="account_holder"
                  style={{
                    width: "100%",
                  }}
                  inputWrapStyle="w-[180px]"
                  defaultValue={accountInfo?.LAST_BANK_INFO?.ACC_NAME}
                  disabled
                />
              </div>
            </>{" "}
          </RowItem>
          <RowItem label="계좌번호" className="lg:mb-3">
            {" "}
            <>
              <div className="flex flex-row items-start justify-start gap-3">
                <Input
                  placeholder=""
                  type="text"
                  name="number_bank"
                  inputWrapStyle="w-[180px]"
                  defaultValue={maskString(
                    accountInfo?.LAST_BANK_INFO?.BANK_NO
                  )}
                  disabled
                />
              </div>
            </>{" "}
          </RowItem>
        </Form>
      </div>
      <div className="my-3 text-center">
        <p className="text-blue-500">
          * 출금통장 변경은 고객센터 또는 실시간상담으로만 변경이 가능합니다. *
        </p>
        <p className="text-gray-200">☎ 고객센터 070-7847-6791 ☎</p>
      </div>
    </div>
  );
}
