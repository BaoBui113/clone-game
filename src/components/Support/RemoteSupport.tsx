import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export const styleBoxSubPage = {
  borderRadius: "4px",
  border: "1.619px solid rgba(255, 255, 255, 0.20)",
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.20) 0.01%, rgba(217, 217, 217, 0.10) 100%)",
  boxShadow:
    "0px 0px 8.095044136047363px -0.8095043897628784px rgba(255, 255, 255, 0.40) inset, 0px 0.8095043897628784px 4.857025623321533px 0px rgba(255, 255, 255, 0.30)",
};
export function RemoteSupport({}: Props) {
  return (
    <div className="flex flex-col text-sm gap-y-4">
      <h2 className="text-xl">1:1원격지원</h2>

      <p className="text-gray-400">
        일대일원격지원 서비스는 게임이용과 관련하여 장애가 발생하는 고객에게
        <br />
        고객지원센터에서 고객님의 PC에 직접 접속해 각종 오류 및 기술적 문제를
        해결함으로써
        <br />
        원활한 게임접속을 도와드리는 기술지원서비스입니다.
      </p>

      <Link
        href="https://download.teamviewer.com/download/TeamViewer_Setup_ko.exe"
        target="_blank"
        className="flex flex-row items-center justify-start w-[200px] gap-5 p-5"
        style={styleBoxSubPage}
      >
        <Image
          width={45}
          height={45}
          src="images/svg/team-viewer.svg"
          alt="img team viewer"
        />
        <div>
          <p>Team Viewer</p>
          <p>팀뷰어 다운로드</p>
        </div>
      </Link>
      <p className="text-gray-400">
        ⊙ 해당 프로그램을 다운로드 설치후,
        <br />
        귀하의 ID 비밀번호를 관리자에게 알려주시면 됩니다.
      </p>

      <p className="text-red-600">
        <span className="">
          ※ 카지노 이용시 게임실행이 안되시거나 사이트 이용시 불편한 점이 있는
          경우에는 24시간 고객센터로 연락주시면 신속히 처리해드립니다.
        </span>
      </p>
    </div>
  );
}
