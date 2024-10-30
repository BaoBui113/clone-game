import React, { useState, useEffect } from "react";
import Dialog from "../../utils/dialog2";
import { Button } from "../../utils/form/Button";
import Modal from "@/components/shared/utils/modal";
import {
  containWhitespace,
  containOnlyLetterAndNum,
  containSpecialWord,
} from "@/libs/helpers/common";
import userApi from "@/app/apis/userApi";
import Select from "../../utils/form/Select";
import CountdownTimer from "./CountdownTimer";
import {
  isAccNum,
  Space_chk,
  isChk,
  kor_eng_chk,
  isNums,
} from "@/libs/helpers/common";
import TextInput from "../../utils/form/TextInput";
import Btn from "@/components/shared/utils/form/Btn";
import { useAuth } from "@/libs/provider/auth-provider";
import Loading from "@/components/shared/utils/loading";

export function JoinMemberFormDialog({ ...props }) {
  const { deviceInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [msgModal, setMsgModal] = useState("")
  const [modalType, setModalType] = useState("error")
  const [showOtpCheck, setShowOtpCheck] = useState(false)
  const [data, setData] = useState(null)
  const [bank, setBank] = useState(null)
  const [banks, setBanks] = useState([])

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [telnum, setTelnum] = useState("");
  const [telnum1, setTelnum1] = useState(null);
  const [telnum2, setTelnum2] = useState("");
  const [telnum3, setTelnum3] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifiedOTP, setIsVerifiedOTP] = useState(false);
  const [bankName, setBankName] = useState("");
  const [bankNo, setBankNo] = useState("");
  const [isVerifiedBank, setIsVerifiedBank] = useState(false);
  const [isVerifiedUserID, setIsVerifiedUserID] = useState(false);
  const [authStatus, setAuthStatus] = useState("");
  const [remainSecOTP, setRemainSecOTP] = useState(0);

  const host = "plus.plusgalaxy.com";

  const dialogStyle = {
    // padding: "0px",
    borderRadius: "4px",
    borderTop: "6px solid var(--yellow-yellow-500, #FFD035)",
    background: "#3C3C3C",
    boxShadow:
      "0px 1px 10px -1px rgba(255, 255, 255, 0.70) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.40)",
  };

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

  const tel_options = [
    { label: "010", value: "010" },
    { label: "011", value: "011" },
    { label: "016", value: "016" },
    { label: "017", value: "017" },
    { label: "018", value: "018" },
    { label: "019", value: "019" },
    { label: "070", value: "070" },
  ];

  const checkID = async () => {
    console.log("checkID", userId);

    if (userId == "" || userId.length < 4 || userId.length > 12) {
      showErrorMsg("회원 아이디는 4자 이상 12자 이하로 입력하세요.");
      return;
    }
    if (containWhitespace(userId)) {
      showErrorMsg("회원 아이디는 공백을 포함 할 수 없습니다.");
      return;
    }
    if (!containOnlyLetterAndNum(userId)) {
      showErrorMsg("회원 아이디는 숫자와 영문자만 가능합니다.");
      return;
    }
    if (containSpecialWord(userId)) {
      showErrorMsg(
        `${userId} 회원아이디는 사용할 수 없습니다. \n\n 다른 회원아이디를 사용하세요!`
      );
      return;
    }
    setIsLoading(true);
    const res = await userApi.idcheck({ userid: userId, host });
    setIsLoading(false);

    console.log("userApi.idcheck", res);

    if (res.detail != 0) {
      showErrorMsg("중복된 아이디입니다.");
      return;
    }
    setIsVerifiedUserID(true);

    showSuccessMsg("사용하실수 있는 아이디입니다.");
  };

  const sendOtp = async () => {
    console.log("sendOtp");

    if (!telnum1 || !telnum2 || !telnum3) {
      showErrorMsg("핸드폰 국번을 입력해 주세요.");
      return;
    }
    console.log("telnum1", telnum1.value);
    console.log("telnum2", telnum2);
    console.log("telnum3", telnum3);

    const telnum = telnum1.value + telnum2 + telnum3;
    setIsLoading(true);
    const res = await userApi.sendOtp({ telnum, host });
    setIsLoading(false);
    console.log("userApi.sendOtp res: ", res);

    if (res.msg.AUTH_STATUS == "N") {
      if (res.msg.SEND_REMAIN_CNT == 0 && res.msg.sms_status == "N") {
        showErrorMsg("인증번호 재전송 가능한 횟수를 초과하였습니다.");
        return;
      } else {
        showErrorMsg("설정값 오류입니다. 고객센터에 문의해주세요.[ERR-03]");
        return
      }
    } else {
      if (res.msg.SMS_AUTH_YN == "M" || res.msg.SMS_AUTH_YN == "C") {
        if (res.msg.SEND_REMAIN_CNT == 0) {
          setShowOtpCheck(true);
          setTelnum(telnum);
        } else {
          // success case here
          setRemainSecOTP(res.msg.REMAIN_SEC);
          setShowOtpCheck(true);
          setTelnum(telnum);
        }

        if (res.msg.SEND_REMAIN_CNT == 0 && res.msg.sms_status == "N") {
          showErrorMsg("인증번호 재전송 가능한 횟수를 초과하였습니다.");
          return;
        } else {
          if (res.msg.sms_customer != "") {
            showSuccessMsg(`인증번호를 전송 하였습니다. 통신사 사정으로 인증 번호 수신이 안된 경우. 재전송 혹은 고객 센터로 연락 주세요. ${res.msg.sms_customer}`);
            return;
          } else {
            showSuccessMsg(`인증번호를 전송 하였습니다. 통신사 사정으로 인증 번호 수신이 안된 경우. 재전송 혹은 고객 센터로 연락 주세요.`);
            return;
          }
        }
      } else if (res.msg.SMS_AUTH_YN == "N") {
        showErrorMsg("SMS 인증을 사용하지 않습니다.");
        return;
      } else if (res.msg.SMS_AUTH_YN == "A") {
        showErrorMsg("입력하신 핸드폰 번호는 사용하실수 없습니다. 다른 핸드폰 번호를 입력하여 주세요.");
        return;
      } else {
        showErrorMsg("인증번호 전송 오류입니다.[ERR-02]");
        return;
      }
    }


  };

  const verifyOtp = async () => {
    if (!otp) {
      showErrorMsg("인증번호를 입력해 주세요.");
      return;
    }
    if (isVerifiedOTP) {
      showSuccessMsg("이미 인증하셨습니다.");
      return;
    }
    const res = await userApi.verifyOtp({
      telnum,
      certType: "R",
      certNum: otp,
      host,
    });
    console.log(res);
    setAuthStatus(res.AUTH_STATUS);
    if (res.AUTH_STATUS == "S") {
      setIsVerifiedOTP(true);
      showSuccessMsg("인증되었습니다.");
    } else if (res.AUTH_STATUS == "F") {
      showErrorMsg("인증번호가 일치하지 않습니다.");
    } else if (res.AUTH_STATUS == "A") {
      showErrorMsg(
        "입력하신 핸드폰 번호는 사용하실수 없습니다.\r\n다른 핸드폰 번호를 입력하여 주세요."
      );
    } else {
      showErrorMsg("인증 오류입니다.");
    }
  };

  const checkBank = async () => {
    if (!bank) {
      showErrorMsg("은행명을 입력해 주세요.");
      return;
    }

    if (bankName == "") {
      showErrorMsg("예금주를 입력해 주세요.");
      return;
    } else {
      if (bankName != name) {
        showErrorMsg("예금주와 이름은 동일해야합니다.");
        return;
      }
    }

    if (bankNo == "") {
      showErrorMsg("계좌번호를 입력해 주세요.");
      return;
    } else {
      if (!isAccNum(bankNo)) {
        showErrorMsg("계좌번호는 숫자만 입력해 주세요.");
      }
    }
    setIsLoading(true);
    const res = await userApi.checkBank({
      bnk_cd: bank.value,
      mbnk_no: bankNo,
      host,
    });
    setIsLoading(false);
    console.log("userApi.checkBank api res:", res);
    switch (res.status) {
      case "0":
        showSuccessMsg("사용하실수 있는 계좌입니다.");
        break;
      case "1":
        showErrorMsg("계좌번호를 입력해주세요.");
        break;
      case "2":
        showErrorMsg("host 오류.");
        break;
      case "3":
        showErrorMsg("중복된 계좌입니다.");
        break;
      case "4":
        showErrorMsg("사용할수 없는 계좌입니다.");
        break;
      default:
        showErrorMsg("알수없는 오류입니다.");
    }

    setIsVerifiedBank(true);
  };

  const isValid = () => {
    if (!userId) {
      showErrorMsg("아이디를 입력해 주세요.");
      return false;
    }
    if (!isVerifiedUserID) {
      showErrorMsg("아이디 중복확인을 해주시기 바랍니다.");
      return false;
    }

    if (password == "" || password.length < 6 || password.length > 12) {
      showErrorMsg("비밀번호는 6자 이상 12자 이하로 입력하세요.");
      return false;
    } else {
      if (Space_chk(password)) {
        showErrorMsg("비밀번호는 공백을 포함 할 수 없습니다.");
        return false;
      } else {
        if (isChk(password)) {
          showErrorMsg("비밀번호는 숫자와 영문자만 가능합니다.");
          return false;
        }
      }
    }

    if (
      confirmPass == "" ||
      confirmPass.length < 6 ||
      confirmPass.length > 12
    ) {
      showErrorMsg("비밀번호 확인은 6자 이상 12자 이하로 입력하세요.");
      return false;
    } else {
      if (Space_chk(confirmPass)) {
        showErrorMsg("비밀번호 확인은 공백을 포함 할 수 없습니다.");
        return false;
      } else {
        if (isChk(confirmPass)) {
          showErrorMsg("비밀번호 확인은 숫자와 영문자만 가능합니다.");
          return false;
        }
      }
    }

    if (password != confirmPass) {
      showErrorMsg(
        "비밀번호와 비밀번호 확인이 일치하지 않습니다. 다시 시도해 주십시요"
      );
      return false;
    }

    if (name == "") {
      showErrorMsg("이름을 입력해 주세요.");
      return false;
    } else {
      if (Space_chk(name)) {
        showErrorMsg("이름은 공백을 포함 할 수 없습니다.");
        return false;
      }
      if (!kor_eng_chk(name)) {
        showErrorMsg("이름은 한글과 영문자만 가능합니다.");
        return false;
      }
    }

    /* 핸드폰 체크 */
    if (
      telnum1 == null ||
      telnum1.value.length < 3 ||
      telnum1.value.length > 4
    ) {
      showErrorMsg("핸드폰 국번을 입력해 주세요.");
      return false;
    } else {
      if (!isNums(telnum1.value)) {
        showErrorMsg("핸드폰 국번은 숫자만을 입력하세요.");
        return false;
      }
    }
    if (telnum2 == "" || telnum2.length < 3 || telnum2.length > 4) {
      showErrorMsg("핸드폰 번호를 입력해 주세요.");
      return false;
    } else {
      if (!isNums(telnum2)) {
        showErrorMsg("핸드폰 번호는 숫자만을 입력하세요.");
        return false;
      }
    }
    if (telnum3 == "" || telnum3.length < 4 || telnum3.length > 4) {
      showErrorMsg("핸드폰 번호를 입력해 주세요.");
      return false;
    } else {
      if (!isNums(telnum3)) {
        showErrorMsg("핸드폰 번호는 숫자만을 입력하세요");
        return false;
      }
    }

    return true;
  };
  const register = async () => {
    if (!isValid()) {
      return;
    }
    console.log("register");
    const telnum = telnum1.value + telnum2 + telnum3;
    const req = {
      name: name,
      hp_no: telnum,
      dnm_cd: data.DMN_CD,
      recommendId: data.RECOMMENDER_ID,
      idagent: data.IDAGENT,
      level_cd: data.LEVEL_CD,
      userid: userId,
      password: password,
      bnk_cd: bank.value,
      mbnk_nm: bankName,
      mbnk_no: bankNo,
      fs_yn: "",
      host: host,
      fs_no: "",
      sms_cert_hp: telnum,
      auth_status: authStatus,
      userip: deviceInfo.userIp,
    };
    console.log(req);
    setIsLoading(true);
    const res = await userApi.joinInsert(req);
    setIsLoading(false);
    console.log(res);

    switch (res.status) {
      case "0":
        showSuccessMsg("성공적으로 등록하다");
        break
      case "1":
        showErrorMsg("오류입니다. 고객센터로 연락주세요![VAL-ERR-01]");
        break;
      case "2":
        showErrorMsg("회원가입에 실패하였습니다.[SET-ERR-01]");
        break;
      case "3":
        showErrorMsg("현재 회원가입이 불가합니다. 가입을 원하는 고객께서는 고객센터로 연락주시기 바랍니다.");
        break;
      case "4":
        showErrorMsg("가입 제한시간이 지났습니다. 다시 가입 신청해 주세요!");
        break;
      case "5":
        showErrorMsg("가입아이디와 추천인 아이디는 동일할 수 없습니다.");
        break;
      case "6":
        showErrorMsg("핸드폰 인증 시간이 초과되었습니다.");
        break;
      case "7":
        showErrorMsg("핸드폰 인증후 가입하실 수 있습니다.");
        break;
      case "8":
        showErrorMsg("인증 받으신 핸드폰 번호와 가입하실려는 핸드폰 번호가 일치하지 않습니다.");
        break;
      case "9":
        showErrorMsg("사용자 등록에 실패하였습니다. 고객센터로 문의하세요![SET-ERR-01]");
        break;
      case "10":
        showErrorMsg(`이미 사용중인 ID입니다.`);
        break;
      case "11":
        showErrorMsg("사용자 등록에 실패하였습니다. 고객센터로 문의하세요!");
        break;
      case "12":
        showErrorMsg("이미 사용중인 계좌정보 입니다. 출금을 위해 마이페이지->고객계좌를 등록해주세요.");
        break;
      default:
        showErrorMsg(`사용자 등록에 실패하였습니다. 고객센터로 문의하세요! [ERR-${res.status}]`);
    }
  };

  const preloadData = async () => {
    const res = await userApi.join({ host });
    console.log("join", res);
    setData(res.data);
    setBanks(
      res.data.BANK_LIST.map((bank) => {
        return { label: bank.bnk_nm, value: bank.bnk_cd };
      })
    );
  };

  useEffect(() => {
    props.isOpen && preloadData();
  }, [props.isOpen]);


  return (
    <>
      <Dialog
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <div className="bg-primary-light p-0 md:p-7 lg:p-10 flex flex-col">

          <div className="mb-5 p-2 sm:p-2 md:p-0 lg:p-0">
            <div className="text-xl text-white lg:text-2xl">회원가입</div>
            <p className="text-sm text-white">
              중복 회원가입 방지를 위한 아이디는 중복확인을 해주십시오.
              회원가입에 필요한 정보를 입력해주세요.
            </p>
            <p className="text-sm text-white">
              회원가입 상담전화: 070-7847-6791
            </p>
          </div>

          <div className="w-full rounded shadow-lg bg-primary p-2 lg:p-7">
            <RowItem label="밴더아이디">
              <div className="text-gray-600">{data?.IDAGENT}</div>
            </RowItem>
            <RowItem label="밴더아이디">
              <div className="flex flex-col sm:flex-row items-start justify-start gap-y-2 gap-x-2">
                <div className="w-full sm:w-4/5">
                  <TextInput
                    placeholder="들어 오세요"
                    value={userId}
                    onValueChange={setUserId}
                  />
                </div>
                <div className="flex items-end flex-grow">
                  <Btn text="이중 점검" onClick={checkID} />
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                * 회원 아이디는 4자 이상 12자 이하로 입력하세요.
              </p>
            </RowItem>
            <RowItem label="비밀번호">
              <div className="w-full sm:w-4/5">
                <TextInput
                  placeholder="들어 오세요"
                  type="password"
                  value={password}
                  onValueChange={setPassword}
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                * 회원 아이디는 4자 이상 12자 이하로 입력하세요.
              </p>
            </RowItem>
            <RowItem label="비밀번호확인">
              <div className="w-full sm:w-4/5">
                <TextInput
                  placeholder="들어 오세요"
                  type="password"
                  value={confirmPass}
                  onValueChange={setConfirmPass}
                />
              </div>
            </RowItem>

            <RowItem label="이름">
              <div className="w-full sm:w-4/5">
                <TextInput
                  placeholder="들어 오세요"
                  value={name}
                  onValueChange={setName}
                />
              </div>
            </RowItem>

            <RowItem label="핸드폰">
              <div className="flex flex-row w-full sm:w-4/5 gap-x-2">
                <div className="w-full">
                  <Select
                    options={tel_options}
                    placeholder="핸드폰"
                    value={telnum1}
                    onSelect={setTelnum1}
                  />
                </div>
                <div className="flex items-center justify-center">-</div>
                <div className="w-full">
                  <TextInput
                    placeholder="들어 오세요"
                    value={telnum2}
                    onValueChange={setTelnum2}
                    maxLength={4}
                  />
                </div>
                <div className="flex items-center justify-center">-</div>
                <div className="w-full">
                  <TextInput
                    placeholder="들어 오세요"
                    type="text"
                    value={telnum3}
                    onValueChange={setTelnum3}
                    maxLength={4}
                  />
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                * 입력된 핸드폰번호로 입금계좌가 전송되오니 정확히 입력하시기
                바랍니다.
              </p>
              <p className="mt-1 text-xs text-warning">
                * 체험머니신청,각종이벤트참여,매월현금쿠폰 수령 및
                보안계좌발급을 위해 반드시 본인의 핸드폰번호를 정확하게
                입력하시기 바랍니다.
              </p>
            </RowItem>

            <RowItem label="핸드폰">
              <div className="flex flex-row items-center gap-x-2">
                <div className="flex flex-row w-full sm:w-4/5 gap-x-2">
                  {showOtpCheck ? (
                    <div className="basis-1/3">
                      <TextInput
                        placeholder="들어 오세요"
                        value={otp}
                        onValueChange={setOtp}
                        maxLength={12}
                      />
                    </div>
                  ) : null}
                  {showOtpCheck ? (
                    <div className="basis-1/3">
                      <Btn text="이중 점검" onClick={verifyOtp} />
                    </div>
                  ) : null}
                  <div className="basis-1/3">
                    <Btn text="이중 점검" onClick={sendOtp} />
                  </div>
                </div>
                {showOtpCheck ? (
                  <CountdownTimer
                    targetDate={new Date().getTime() + remainSecOTP * 1000}
                  />
                ) : null}
              </div>
            </RowItem>

            <RowItem label="출금계좌">
              <div className="flex flex-col sm:flex-row gap-x-2 gap-y-2">
                <div className="flex flex-row w-full sm:w-4/5 gap-x-2">
                  <div className="flex flex-col w-full">
                    <p className="mb-1 text-yellow-300">은행</p>
                    <Select
                      options={banks}
                      placeholder="--선택--"
                      onSelect={setBank}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="mb-1 text-yellow-300">예금주</p>
                    <TextInput
                      placeholder="들어 오세요"
                      value={bankName}
                      onValueChange={setBankName}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="mb-1 text-yellow-300">계좌번호</p>
                    <TextInput
                      placeholder="들어 오세요"
                      value={bankNo}
                      onValueChange={setBankNo}
                    />
                  </div>
                </div>
                <div className="flex items-end flex-grow">
                  <Btn text="이중 점검" onClick={checkBank} />
                </div>
              </div>
            </RowItem>
          </div>
          <Button
            text="가입하기"
            className={
              "mx-auto my-8 w-full flex-row justify-center  border-none bg-warning px-3 py-2 text-center !text-primary lg:w-[400px]"
            }
            onClick={register}
          />
        </div>
      </Dialog>
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
    </>
  );
}

function RowItem({ label, className, children }) {
  return (
    <div
      className={`mb-3 flex flex-col items-start justify-start gap-2 text-sm lg:mb-8 lg:flex-row lg:gap-10 ${className}`}
    >
      <div className="w-full text-warning lg:w-1/5">{label}</div>
      <div className="w-full">{children}</div>
    </div>
  );
}
