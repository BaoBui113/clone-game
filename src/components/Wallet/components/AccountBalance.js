import React, { useEffect, useState } from "react";
import { RowItem } from "@/components/shared/common/components/RowItem";
import Select from "@/components/shared/utils/form/Select";
import { getTokenHost } from "@/utils/getTokenAndHost";
import Modal from "@/components/shared/utils/modal";
import ScaleLoader from "react-spinners/ScaleLoader";
import withdrawApi from "@/app/apis/withdrawApi";
import { formatThousand } from "@/libs/helpers/format-amount";
import { useAuth } from "@/libs/provider/auth-provider";
const AccountBalance = () => {
  const [game, setGame] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [msgModal, setMsgModal] = useState("");
  const [modalType, setModalType] = useState("error");
  const [amountMsg, setAmountMsg] = useState("신청하실 게임을 선택하여주세요.");
  const [isAmountLoading, setIsAmountLoading] = useState(false);

  const { token, host } = getTokenHost();
  const {isCheckTokenExpire} = useAuth()

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

  const getData = async () => {
    const res = await withdrawApi.getWithDrawData({ token, host });
    isCheckTokenExpire(res?.status)
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
      showErrorMsg(`오류입니다. 고객센터로 연락주세요![VAL-ERR-${res.status}]`);
    }
  };

  const onSelectGame = async (game) => {
    setIsAmountLoading(true);
    setGame(game);
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
      setAmountMsg("0");
    } else {
      const money = Math.floor(res.rate_money);
      setAmountMsg(formatThousand(money));
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
    getData();
  }, []);

  return (
    <div className="w-full rounded shadow-lg bg-primary p-7">
      <RowItem label="신청게임" className="lg:mb-3">
        <div className="flex w-[180px]">
          <Select
            value={game}
            options={gameList}
            onSelect={onSelectGame}
            placeholder="게임을 선택"
          />
        </div>
      </RowItem>
      <RowItem label="잔액" className="lg:mb-3">
        <div className="flex w-[180px]">
          {isAmountLoading ? <ScaleLoader color="#36d7b7" /> : amountMsg}
        </div>
      </RowItem>
      <MessageModal />
    </div>
  );
};

export default AccountBalance;
