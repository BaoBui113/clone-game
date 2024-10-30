import Image from "next/image";
import Link from "next/link";
import React from "react";
import { styleBoxSubPage } from "./RemoteSupport";

type Props = {};

export function SafeSupport({}: Props) {
  return (
    <div className="flex flex-col gap-4 h-[300px] lg:h-full overflow-y-auto">
      <h2 className="text-xl">PC안전지킴이</h2>
      <div className="text-[10px] lg:text-sm ">
        <p className="text-gray-200">안녕하세요!</p>
        <p className="text-gray-200">
          최근들어 해킹등으로 인한 개인정보 유출 사례가 급증하고 있어 당사에서는
          본 사이트를 이용하시는 회원님의 정보보호를 위하여 시스템 및
          소프트웨어를 최고 수준의 보안 설비를 갖추어 서비스를 제공하고
          있습니다.
          <br />
          그러나 농협, 현대카드, 네이트 등의 해킹 사례에서 볼 수 있듯 최고
          수준의 설비를 갖추어도 서비스를 이용하는 회원님의 PC가 바이러스에
          감염되었을 경우 개인정보를 보호하기가 매우 어려운 실정입니다.
          <br />
          이에 당사에서는 공인된 바이러스 백신 프로그램을 설치할것을 회원
          여러분께 권유드리는 바입니다.{" "}
        </p>
      </div>
      <h3 className="text-lg">백신프로그램 :</h3>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {LIST_RULES.map((item, idx) => (
          <div key={idx} className="">
            <Link
              href={item.link}
              target="_blank"
              className="flex flex-row items-center justify-start gap-5 p-5 h-[100px] mb-2"
              style={styleBoxSubPage}
            >
              <Image
                width={45}
                height={45}
                src={item.img}
                alt="img team viewer"
              />
              <div>
                <p className="text-sm">{item.title}</p>
                <p className="text-xs">{item.subTitle}</p>
              </div>
            </Link>
            <p className="text-[13px] text-gray-200">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const LIST_RULES = [
  {
    img: "/images/svg/bt_pc01.svg",
    desc: " V3 Lite는 악성코드 진단 및 치료는 물론, 의심 프로그램 실행 차단/웹 보안 등 강력한 PC보안을 제공하는 AhnLab의 대표 무료백신입니다.",
    link: "https://www.ahnlab.com/kr/site/product/productView.do?prodSeq=8&EKAMS=paran.278.659.6.1292995016876.576803&trackingDays=30",
    title: "V3 무료백신",
    subTitle: "다운로드 바로가기",
  },
  {
    img: "/images/svg/spp-rule.svg",
    desc: " 각종 악성코드 및 스파이 웨어,바이러스, 웜, 해킹 등의 외부적 위험 요소로 부터 다양한 기능을 통해 사용자의 PC를 보호하고 치료하는 강력한 백신 프로그램입니다. 지원이 종료되는 Windwos XP는 네이버백신으로 보안을 지켜 주세요.",
    link: "https://www.ncloud.com/product/security/sslVpn",
    title: "네이버 무료백신",
    subTitle: "다운로드 바로가기",
  },
  {
    img: "/images/svg/bt_pc03.svg",
    desc: " 프로그램 삭제 시 남게 되는 폴더나 레지스트리까지도 깨끗하게 삭제해주는 언인스톨러 프로그램입니다.",
    link: "https://www.iobit.com/imf-dl-promo.html",
    title: "IObit  Malwave Fighter Tree",
    subTitle: "다운로드 바로가기",
  },
];
