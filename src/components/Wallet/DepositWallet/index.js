import React, { useEffect, useState } from "react";
import Select from '@/components/shared/utils/form/Select'
import InputSelect from '@/components/shared/utils/form/InputSelect'
import SubmitBtn from '@/components/shared/utils/form/SubmitBtn'
import TextArea from '@/components/shared/utils/form/TextArea'
import TextInput from '@/components/shared/utils/form/TextInput'
import styles from './index.module.css'
import { getTokenHost } from "@/utils/getTokenAndHost";
import depositApi from '@/app/apis/depositApi'
import Modal from '@/components/shared/utils/modal'
import { useAuth } from "@/libs/provider/auth-provider";
import Bank from './Bank'
import Loading from "@/components/shared/utils/loading"


const DepositWallet = () => {
  const { user, deviceInfo,isCheckTokenExpire } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [amount, setAmount] = useState("")
  const [accName, setAccName] = useState("")
  const [gameCode, setGameCode] = useState(null)
  const [comment, setComment] = useState("")
  const [games, setGames] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [msgModal, setMsgModal] = useState("")
  const [modalType, setModalType] = useState("error")

  const [isDepoBank, setIsDepoBank] = useState(false)
  const [isDepositVirtual, setIsDepositVirtual] = useState(false)


  const { token, host } = getTokenHost();

  const getGameList = async () => {
    try{
      const res = await depositApi.getGameList({ token, host })
      console.log(res)
      const games = res?.game_list?.map((item) => {
        return { label: item.GAMENAME, value: item.GAMECODE }
      })
      console.log(games)
      setGames(games)
      setAccName(res?.last_acct_info?.ACC_NAME)
    }catch(error){
      const {response} = error
      console.error("Error fetching data game list:", error );
      isCheckTokenExpire?.(response?.data?.status);
    }

  }

  const showErrorMsg = (msg) => {
    setIsOpenModal(true)
    setMsgModal(msg)
    setModalType("error")
  }

  const showSuccessMsg = (msg) => {
    setIsOpenModal(true)
    setMsgModal(msg)
    setModalType("success")
  }

  const isValid = () => {
    if (!gameCode) {
      showErrorMsg("신청 게임을 반드시 선택하시기 바랍니다.")
      return false
    }
    if (!amount) {
      showErrorMsg("입금신청금액을 입력해 주세요.")
      return false
    }

    if ((Number(amount) % 10000) != 0) {
      showErrorMsg("입금신청금액은 10000 단위로 입력해 주세요.");
      return false
    }
    if (Number(amount) < 50000) {
      showErrorMsg("입금 최소 금액은 5만원입니다.");
      return false
    }
    if (Number(amount) > 100000000) {
      showErrorMsg("입금 최대 금액은 1억입니다.");
      return false
    }
    return true
  }

  const onSubmit = async () => {
    if (!isValid()) {
      return
    }
    try {
      const req = {
        token,
        host,
        acc_name: accName,
        amount,
        comment,
        gamecode: gameCode?.value,
        userip: deviceInfo.userIp,
      }

      console.log("depositApi.deposit req: ", req)
      setIsLoading(true)
      const res = await depositApi.deposit(req)
      setIsLoading(false)
      console.log("depositApi.deposit res: ", res)
     
      if (res.status == 1 || res.status == 2 || res.status == -1 ) {
        showErrorMsg("오류입니다. 고객센터로 연락주세요.")
        isCheckTokenExpire(res.status)
        return
      }

      if (res.status == 3) {
        showErrorMsg(res.MSG_TXT)
        return
      }

      if (res.new_account.MSG_YN == "Y") {
        showSuccessMsg(res.new_account.MSG_TXT);
      }

      if (res.change_acct.LINK_ACC_YN == "Y") {
        showSuccessMsg("금일 고객님께서 입금하실 계좌가 기존계좌에서 새롭게 변경되었습니다. 꼭 문자메세지를 확인하시고 변경된 계좌로 입금해주시기 바랍니다.");
      }

      if (res.virtual_account.MSG_YN == 'Y') {
        showSuccessMsg("통합계좌 발급시스템을 이용합니다. 사용법을 읽어보시고 이용해주세요.");
        setIsDepositVirtual(true)
      } else {
        setIsDepoBank(true)
        console.log("res.SMS_Result.status = ", res.SMS_Result.status)
        if (res.SMS_Result.status == "0") {
          showSuccessMsg("입력하신 핸드폰으로 입금계좌를 전송하였습니다. 계좌번호가 문자로 발송되지 않을 경우 콜센터로 연락 바랍니다.");
        } else {
          showSuccessMsg(`SMS 서버 점검 관계로 문자 전송이 지연되고 있습니다. 아래 계좌로 입금하여 주시기 바랍니다. ${res.SMS_Result.msg}`);
        }
      }

    } catch (err) {
      console.log(err)
      showErrorMsg(err)
    }
  }

  const MessageModal = () => {
    return (
      <Modal
        title={modalType == "error" ? "error" : "success"}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <div className="flex flex-col items-center justify-center px-6 py-6">
          {modalType == "error" ? <p className="text-red-700">{msgModal}</p> : <p className="text-black">{msgModal}</p>}
        </div>
      </Modal>
    )
  }


  useEffect(() => {
    setIsLoading(true)
    getGameList()
    setIsLoading(false)
  }, [])

  if (isDepoBank) {
    return <>
      <Bank />
      <MessageModal />
    </>
  } else {
    return (

      <div>
        <div className="text-2xl">회원가입</div>
        <p className="mt-2 text-sm">
          - 신속한 충전을 위해서는 올바른 입금정보를 입력해 주셔야 합니다.
        </p>
        <p className="text-sm">
          - 입금확인 즉시 신청하신 아이디로 게임머니를 충전해드립니다.
        </p>
        <p className="mt-2 text-sm">
          회원님들의 안전과 보안을 위해{" "}
          <span className="text-red-700">입금계좌는 수시변경 될수</span>있습니다.
        </p>
        <p className="text-sm">
          입금신청 후{" "}
          <span className="text-red-700">
            {" "}
            문자로 현재 회원님의 입금계좌가 발송
          </span>
          되니 꼭!!. <span className="text-red-700"> 확인 후 입금</span> 해주시기
          바랍니다.{" "}
          <span className="text-red-700">
            {" "}
            이전계좌입금시 불이익을 받을수 있습니다.
          </span>
        </p>
        <p className="mt-2 text-sm">
          -
          <span className="text-red-700">
            {" "}
            에볼루션 / 아시안 / 드림 / WM Live / 마이크로 / 프라그마틱 / 드윈 /
            보타 / 통합슬롯
          </span>
          을 이용해주시는 회원분께서는 통합월렛으로 신청바랍니다.
        </p>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.labelWrap}>신청게임</div>
            <div className={styles.inputWrap}>
              <Select value={gameCode} options={games} onSelect={setGameCode} placeholder="게임을 선택" />
              <p>입금 신청하실 게임을 선택해주세요</p>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelWrap}>핸드폰번호</div>
            <div className={styles.inputWrap}>
              <div className={styles.phone}>010 - 4344 - 8556</div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelWrap}>금액</div>
            <div className={styles.inputWrap}>
              <InputSelect
                placeholder="금액을 입력해주세요"
                value={amount}
                onValueChange={setAmount}
                options={[{ name: "오만원", value: "50000" }, { name: "십만 원", value: "100000" }, { name: "삼십만원", value: "300000" }, { name: "오십만원", value: "500000" }, { name: "백만원", value: "1000000" }]}

              />
              <p>* 입금 최소 금액은 5만원입니다.</p>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelWrap}>입금자명</div>
            <div className={styles.inputWrap}>
              <TextInput value={accName} disabled={true} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelWrap}>남기고 싶은말</div>
            <div className={styles.inputWrap}>
              <TextArea value={comment} handleChange={setComment} />
              <p>* 보편적으로 23:50 ~ 00:30, 휴일 다음 첫 영업일 새벽에는 계좌이체가 지원되지 않습니다.</p>
              <p>* 위 시간 이외 씨티은행, 농협, 우체국은 추가적 점검시간이 따로 있으니 유념하시기 바랍니다</p>
            </div>
          </div>
        </div>
        <div className={styles.submitWrap}>
          <SubmitBtn label="입금하기" onSubmit={onSubmit} width="200px" />
        </div>
        <Modal
          title="입금신청안내"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="flex flex-col items-center justify-center px-6 py-6">
            <p className="text-red-700">에볼루션 / 아시안 / 드림 / WM Live / 마이크로 / 프라그마틱 / 드윈 / 보타 / 통합슬롯 </p>
            <p className="text-black"> 을 이용해주시는 회원분께서는 통합월렛으로 신청바랍니다. </p>
          </div>
        </Modal>
        <MessageModal />

        <Loading isLoading={isLoading} onClose={() => setIsLoading(false)} />
      </div>
    );
  }
}

export default DepositWallet

