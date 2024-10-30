import React, { useEffect, useState } from "react";
import Select from "@/components/shared/utils/form/Select";
import InputSelect from "@/components/shared/utils/form/InputSelect";
import SubmitBtn from "@/components/shared/utils/form/SubmitBtn";
import TextArea from "@/components/shared/utils/form/TextArea";
import TextInput from "@/components/shared/utils/form/TextInput";
import styles from "./index.module.css";
import { getTokenHost } from "@/utils/getTokenAndHost";
import withdrawApi from "@/app/apis/withdrawApi";
import Modal from "@/components/shared/utils/modal";
import { useAuth } from "@/libs/provider/auth-provider";
import ScaleLoader from "react-spinners/ScaleLoader";
import WithdrawTime from "./WithdrawTime";
import Loading from "@/components/shared/utils/loading";

const WithdrawWallet = () => {
  const { deviceInfo, isCheckTokenExpire } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountMsg, setAmountMsg] = useState("신청하실 게임을 선택하여주세요.");
  const [accName, setAccName] = useState("");
  const [game, setGame] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [bank, setBank] = useState(null);
  const [bankList, setBankList] = useState([]);
  const [comment, setComment] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [msgModal, setMsgModal] = useState("");
  const [modalType, setModalType] = useState("error");
  const [isAmountLoading, setIsAmountLoading] = useState(false);
  const [bankNo, setBankNo] = useState("");
  const [bankCode, setBankCode] = useState("");

  const [cnt, setCnt] = useState(0);
  const [tranTime, setTranTime] = useState(0);
  const [ioAmount, setIoAmount] = useState(0);

  const [isTimeWithdraw, setIsTimeWithdraw] = useState(false);

  const { token, host } = getTokenHost();

  const showErrorMsg = (msg) => {
    setIsOpenModal(true);
    setMsgModal(msg);
    setModalType("error");
  };

  const showSuccessMsg = (msg) => {
    setIsOpenModal(true);
    setMsgModal(msg);
    setModalType("success");
  };

  const getWithDrawData = async () => {
    const res = await withdrawApi.getWithDrawData({ token, host });
    console.log(res);

    if (res.status == 0) {
      setGameList(
        res.game_list.map((game) => {
          return { label: game.GAMENAME, value: game.GAMECODE };
        })
      );
      const bankListMap = res.bank_list.map((bank) => {
        return { label: bank.BANK_NM, value: bank.BANK_CD };
      });
      setBankList(bankListMap);
      if (res.last_acct_info) {
        const bankCode = res.last_acct_info.BANK_CD;
        const bank = bankListMap.find((bank) => bank.value == bankCode);
        console.log(bank);
        setBank(bank);
        setAccName(res.last_acct_info.ACC_NAME);
        setBankNo(res.last_acct_info.BANK_NO);
        setBankCode(res.last_acct_info.BANK_CD);
      }
    } else if (res.status == 2) {
      showErrorMsg("체험아이디는 입출금이 불가능합니다.");
      isCheckTokenExpire?.(res?.status);

    } else if (res.status == 3) {
      showErrorMsg(
        "관리자 승인이 이루어지지않았습니다. 고객센터로 연락주세요!"
      );
    } else if (res.status == -1) {
      isCheckTokenExpire?.(res?.status);
    } else {
      showErrorMsg(`오류입니다. 고객센터로 연락주세요![VAL-ERR-${res.status}]`);
    }
  };

  const isValid = () => {
    if (!game) {
      showErrorMsg("신청 게임을 반드시 선택하시기 바랍니다.");
      return false;
    }
    if (!amount) {
      showErrorMsg("이동할 금액을 입력해주세요.");
      return false;
    }
    if (Number(amount) % 10000 != 0) {
      showErrorMsg("입금신청금액은 10000 단위로 입력해 주세요.");
      return false;
    }
    if (Number(amount) < 50000) {
      showErrorMsg("출금 최소 금액은 5만원입니다..");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!isValid()) {
      return;
    }

    const req = {
      token,
      host,
      acc_name: accName,
      bank_no: bankNo,
      bank_cd: bankCode,
      amount,
      comment,
      gamecode: game?.value,
      userip: deviceInfo.userIp,
    };

    console.log(req);
    setIsLoading(true);
    const res = await withdrawApi.makeWithdraw(req);
    setIsLoading(false);
    console.log("makeWithdraw api res", res);

    switch (res.status) {
      case "0":
        setCnt(res.waitInfo.CNT);
        setTranTime(res.waitInfo.TRAN_TIME);
        setIoAmount(res.waitInfo.IO_AMOUNT);
        showSuccessMsg("출금신청이 완료되었습니다.");
        setIsTimeWithdraw(true);
        break;
      case "1":
        showErrorMsg("오류입니다. 고객센터로 연락주세요![VAL-ERR-01]");
        break;
      case "2":
        showErrorMsg("체험아이디는 입출금이 불가능합니다.");
        isCheckTokenExpire(res.status);
        break;
      case "3":
        showErrorMsg(
          "관리자 승인이 이루어지지않았습니다. 고객센터로 연락주세요!"
        );
        break;
      case "4":
        showErrorMsg(res.MSG_TXT);
        break;
      case "5":
        showErrorMsg("이미 처리중입니다. 잠시만 기다려주세요.");
        break;
      case "6":
        showErrorMsg(
          "이전에 신청하신 출금신청에 대하여 처리중에 있습니다. 한번에 최대 1번까지만 신청하실 수 있습니다. 이전 신청이 처리된 후 다시 신청해주세요."
        );
        break;
      case "7":
        //todo write log
        showErrorMsg("출금 계좌 등록 오류!");
        break;
      case "8":
        showErrorMsg("[신청오류] 관리자에게 문의하세요![SET-ERR-01]");
        break;
      case "9":
        showErrorMsg(
          "[출금오류-ERR03] 현재 신청자가 많아 처리가 지연 되고 있습니다. 잠시후 다시 신청해주시기 바랍니다."
        );
        break;
      case "10":
        showErrorMsg(
          `♣ 이벤트머니 출금안내 ♣. 이벤트머니는 ${res.MAX_WITHDRAW_AMOUNT} 원만 출금이 가능 하십니다.`
        );
        break;
      case "-1":
        isCheckTokenExpire(res.status);
        break;
      default:
        showErrorMsg(
          "[출금오류] 현재 신청자가 많아 처리가 지연 되고 있습니다. 잠시후 다시 신청해주시기 바랍니다."
        );
    }
  };

  const onSelectGame = async (game) => {
    setIsAmountLoading(true);

    setGame(game);
    const res = await withdrawApi.checkAccountWithdraw({
      token,
      host,
      game_code: game.value,
    });
    console.log("checkAccountWithdraw api res:", res);
    if (res.status == 0) {
      if (res.retulr == "Y") {
        const res = await withdrawApi.checkMoney({
          token,
          host,
          gamecode: game.value,
        });
        console.log("checkMoney api res: ", res);
        if (res.status != 0) {
          showErrorMsg(
            `오류입니다. 고객센터로 연락주세요![VAL-ERR-${res.status}]`
          );
          return;
        }
        if (res.RATE == 0 || res.EXCHANGE == 0) {
          setAmountMsg("회원님의 출금가능 금액이 존재 하지 않습니다.");
        } else {
          const money = Math.floor(res.rate_money);
          if (money < 0) {
            setAmountMsg("조회중 오류가 발생했습니다.");
          } else if (money == 0) {
            setAmountMsg("회원님의 출금가능 금액이 존재 하지 않습니다.");
          } else if (money < 50000) {
            setAmountMsg("출금 최소금액은 50,000원 입니다.");
          } else {
            setAmountMsg(
              `회원님의 출금 가능금액은 최소 50,000원부터 최대 ${money} 원 입니다.`
            );
          }
        }
      } else {
        showErrorMsg(
          "출금 계좌 등록 후 출금 가능합니다. 마이페이지에서 출금 계좌 등록을 해주세요."
        );
        return;
      }
    } else {
      showErrorMsg(`오류입니다. 고객센터로 연락주세요![VAL-ERR-${res.status}]`);
      return;
    }
    setIsAmountLoading(false);
  };

  const MessageModal = () => {
    return (
      <Modal
        title={modalType == "error" ? "error" : "success"}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <div className="flex flex-col items-center justify-center px-6 py-6">
          {modalType == "error" ? (
            <p className="text-red-700">{msgModal}</p>
          ) : (
            <p className="text-black">{msgModal}</p>
          )}
        </div>
      </Modal>
    );
  };

  useEffect(() => {
    getWithDrawData();
  }, []);

  if (isTimeWithdraw) {
    return (
      <>
        <WithdrawTime tranTime={tranTime} cnt={cnt} ioAmount={ioAmount} />
        <MessageModal />
      </>
    );
  } else {
    return (
      <div>
        <div className="text-2xl">출금하기</div>

        <p className="mt-2 text-sm">
          - 24시간 출금이 언제든지 가능하나, 은행 및 금융감독원 점검시간 및
          전산장애 시에는 지연될 수 있습니다.{" "}
        </p>
        <p className="text-sm">
          - 또한{" "}
          <span className="text-red-700"> 출금 최소 금액은 50,000 원</span>{" "}
          입니다.{" "}
        </p>
        <p className="mt-2 text-sm">
          -
          <span className="text-red-700">
            {" "}
            - 에볼루션 / 아시안 / 드림 / WM Live / 마이크로 / 프라그마틱 / 드윈
            / 보타 / 통합슬롯
          </span>
          을 이용해주시는 회원분께서는 통합월렛으로 신청바랍니다.
        </p>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.labelWrap}>신청게임</div>
            <div className={styles.inputWrap}>
              <Select
                value={game}
                options={gameList}
                onSelect={onSelectGame}
                placeholder="게임을 선택"
              />
              {!game ? (
                <p>출금 신청하실 게임을 선택해주세요</p>
              ) : (
                <p> 현재 출금(환전)신청은 을(를) 진행하고 계십니다.</p>
              )}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelWrap}>출금가능금액</div>
            <div className={styles.inputWrap}>
              <div className={styles.phone}>
                {isAmountLoading ? <ScaleLoader color="#36d7b7" /> : amountMsg}
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelWrap}>금액</div>
            <div className={styles.inputWrap}>
              <InputSelect
                placeholder="금액을 입력해주세요"
                value={amount}
                onValueChange={setAmount}
                options={[
                  { name: "오만원", value: "50000" },
                  { name: "십만 원", value: "100000" },
                  { name: "삼십만원", value: "300000" },
                  { name: "오십만원", value: "500000" },
                  { name: "백만원", value: "1000000" },
                ]}
              />

              <p>* 출금 최소 금액은 5만원입니다.</p>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelWrap}>은행명</div>
            <div className={styles.inputWrap}>
              <Select
                value={bank}
                options={bankList}
                onSelect={setBank}
                isDisabled
                placeholder="--선택--"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.labelWrap}>예금주</div>
            <div className={styles.inputWrap}>
              <TextInput value={accName} disabled />
              <p>
                * 입금자명과 출금신청 시 예금주명이 동일하지 않은 경우에는 최대
                2일까지 별도의 입금자 본인확인절차를 거친 후 출금처리가 진행
                되오니 꼭 참고하시기 바랍니다.
              </p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.labelWrap}>남기고 싶은말</div>
            <div className={styles.inputWrap}>
              <TextArea value={comment} handleChange={setComment} />
            </div>
          </div>
        </div>
        <div className={styles.submitWrap}>
          <SubmitBtn label="확인 보내기" onSubmit={onSubmit} width="200px" />
        </div>

        <MessageModal />
        <Loading isLoading={isLoading} onClose={() => setIsLoading(false)} />
      </div>
    );
  }
};

export default WithdrawWallet;
