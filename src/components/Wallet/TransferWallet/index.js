import React, { useEffect, useState } from "react";
import Select from "@/components/shared/utils/form/Select";
import InputSelect from "@/components/shared/utils/form/InputSelect";
import SubmitBtn from "@/components/shared/utils/form/SubmitBtn";
import styles from "./index.module.css";
import { getTokenHost } from "@/utils/getTokenAndHost";
import exchangeApi from "@/app/apis/exchangeApi";
import withdrawApi from "@/app/apis/withdrawApi";
import Modal from "@/components/shared/utils/modal";
import { useAuth } from "@/libs/provider/auth-provider";
import ScaleLoader from "react-spinners/ScaleLoader";
import Loading from "@/components/shared/utils/loading";

const TransferWallet = () => {
  const { token, host } = getTokenHost();
  const [isLoading, setIsLoading] = useState(false);
  const { deviceInfo, isCheckTokenExpire } = useAuth();
  const [gameList, setGameList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [msgModal, setMsgModal] = useState("");
  const [modalType, setModalType] = useState("error");
  const [amount, setAmount] = useState("");
  const [amountMsg, setAmountMsg] = useState("이동전 게임을 선택해주세요.");
  const [isAmountLoading, setIsAmountLoading] = useState(false);
  const [fromGame, setFromGame] = useState(null);
  const [toGame, setToGame] = useState(null);

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

  const getMoveData = async () => {
    try {
      const res = await exchangeApi.movePre({ token, host });
      if (res.status == 0) {
        setGameList(
          res.game_list.map((game) => {
            return { label: game.GAMENAME, value: game.GAMECODE };
          })
        );
      } else if (res.status == 2) {
        showErrorMsg("체험아이디는 입출금이 불가능합니다.");
      } else if (res.status == 3) {
        showErrorMsg(
          "관리자 승인이 이루어지지않았습니다. 고객센터로 연락주세요!"
        );
      } else {
        showErrorMsg(
          `오류입니다. 고객센터로 연락주세요![VAL-ERR-${res.status}]`
        );
      }
    } catch (error) {
      const { response } = error;
      console.log("error fetch data move ",error)
      isCheckTokenExpire?.(response.data?.status);
    }
  };

  const onSelectFromGame = async (game) => {
    setIsAmountLoading(true);
    setFromGame(game);
    const res = await withdrawApi.checkMoney({
      token,
      host,
      gamecode: game.value,
    });
    if (res.status != 0) {
      showErrorMsg(`오류입니다. 고객센터로 연락주세요![VAL-ERR-${res.status}]`);
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
    setIsAmountLoading(false);
  };

  const isValid = () => {
    if (!fromGame) {
      showErrorMsg("이동전 게임을 선택해주세요.");
      return false;
    }
    if (!amount) {
      showErrorMsg("이동할 금액을 입력해주세요.");
      return false;
    }
    if (!toGame) {
      showErrorMsg("이동후 게임을 선택해주세요.");
      return false;
    }

    if (fromGame === toGame) {
      showErrorMsg("이동전 게임과 이동후 게임에 같은 게임이 입력되었습니다.");
      return false;
    }

    if (Number(amount) % 10000 != 0) {
      showErrorMsg("이동할 신청금액은 10000 단위로 입력해 주세요.");
      return false;
    }
    if (Number(amount) < 50000) {
      showErrorMsg("이동할 최소 금액은 5만원입니다.");
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
      s_game_code: fromGame.value,
      amount,
      t_game_code: toGame.value,
      userip: deviceInfo.userIp,
    };

    console.log(req);
    setIsLoading(true);
    const res = await exchangeApi.moveProcess(req);
    setIsLoading(false);
    console.log("exchangeApi.moveProcess res: ", res);
    //todo map err
    switch (res.status) {
      case "0":
        showSuccessMsg("게임머니 이동 신청이 완료되었습니다");
        break;
      case "1":
        showErrorMsg("오류입니다. 고객센터로 연락주세요![VAL-ERR-01]");
        break;
      case "2":
        showErrorMsg("이동전 게임과 이동후 게임에 같은 게임이 입력되었습니다.");
        isCheckTokenExpire(res.status)
        break;
      case "3":
        showErrorMsg(res.MSG_TXT);
        break;
      case "4":
        showErrorMsg(
          "이미  게임머니이동 신청 처리중입니다. 잠시만 기다려주세요."
        );
        break;
      case "5":
        showErrorMsg(
          "이전에 신청하신 게임머니이동 신청에 대하여 처리중에 있습니다. 한번에 최대 1번까지만 신청하실 수 있습니다. 이전 신청이 처리된 후 다시 신청해주세요."
        );
        break;
      case "6":
        showErrorMsg(res.MSG_TXT);
        break;
      case "-1":
        isCheckTokenExpire(res.status)
        break;
      default:
        showErrorMsg("게임머니 이동신청을 할 수 없습니다.");
    }
  };

  useEffect(() => {
    getMoveData();
  }, []);
  return (
    <div>
      <div className="text-2xl">게임머니 이동신청</div>

      <p className="mt-2 text-sm">
        회원님이 이용하는 게임브랜드가 아닌 다른 브랜드 게임으로 입금 처리가
        되었을 경우 게임머니 이동신청을 작성하시면, 회원님의 이용브랜드로
        이동처리 하여 드립니다.{" "}
      </p>
      <p className="text-sm">
        <span className="text-red-700">
          {" "}
          - 에볼루션 / 아시안 / 드림 / WM Live / 마이크로 / 프라그마틱 / 드윈 /
          보타 / 통합슬롯
        </span>
        을 이용해주시는 회원분께서는 통합월렛으로 신청바랍니다.{" "}
      </p>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.labelWrap}>이동전 게임</div>
          <div className={styles.inputWrap}>
            <Select
              value={fromGame}
              options={gameList}
              onSelect={onSelectFromGame}
              placeholder="게임을 선택"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelWrap}>이동가능 금액</div>
          <div className={styles.inputWrap}>
            <div className={styles.phone}>
              {isAmountLoading ? <ScaleLoader color="#36d7b7" /> : amountMsg}
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelWrap}>이동할 금액</div>
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
            <p>* 이동할 최소 금액은 5만원입니다.</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelWrap}>이동후 게임</div>
          <div className={styles.inputWrap}>
            <Select
              value={toGame}
              options={gameList}
              onSelect={setToGame}
              placeholder="게임을 선택"
            />
          </div>
        </div>
      </div>
      <div className={styles.submitWrap}>
        <SubmitBtn label="송금 확인" onSubmit={onSubmit} width="200px" />
      </div>
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
      <Loading isLoading={isLoading} onClose={() => setIsLoading(false)} />
    </div>
  );
};
export default TransferWallet;
