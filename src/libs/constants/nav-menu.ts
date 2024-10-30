import { ArgumentTypeInput } from "../provider/default-provider";

export type MenuTopTypes = {
  title: string;
  subMenus?: {
    title?: string;
    image?: string;
    url?: string;
    argument?: ArgumentTypeInput;
    permission?:boolean;
  }[];
}[];
export const MENU_TOP: MenuTopTypes = [
  {
    title: "라이브카지노",

    subMenus: [
      {
        title: "에볼루션",
        url: "#",
        argument: {
          game_title: "HL",
          os: "pc",
          vendor: "evolution",
          game_id: "evolution_baccarat_sicbo",
        },
      },
      {
        title: "아시아",
        url: "#",
        argument: {
          game_title: "HL",
          os: "pc",
          vendor: "Asia Gaming",
          game_id: "0",
        },
      },
      {
        title: "드림",
        url: "#",
        argument: {
          game_title: "HL",
          os: "pc",
          vendor: "DreamGame",
          game_id: "dgcasino",
        },
      },
      {
        title: "WM Live",
        url: "#",
        argument: {
          game_title: "HL",
          os: "pc",
          vendor: "WM Live",
          game_id: "wmcasino",
        },
      },
      {
        title: "마이크로",
        url: "#",
        argument: {
          game_title: "HL",
          os: "pc",
          vendor: "MicroGaming Plus",
          game_id: "SMG_titaniumLiveGames_MP_Baccarat",
        },
      },
      {
        title: "프라그마틱",
        url: "#",
        argument: {
          game_title: "HL",
          os: "pc",
          vendor: "PragmaticPlay Live",
          game_id: "101",
        },
      },
      {
        title: "올벳",
        url: "#",
        argument: {
          game_title: "C_ALL",
          os: "pc",
          vendor: "",
          game_id: "",
        },
      },
    ],
  },
  {
    title: "호텔카지노",

    subMenus: [
      {
        title: "드윈",
        url: "#",
        argument: {
          game_title: "HL",
          os: "pc",
          vendor: "Dowin",
          game_id: "dowin",
        },
      },
      {
        title: "보타",
        url: "#",
        argument: {
          game_title: "HL",
          os: "pc",
          vendor: "bota",
          game_id: "bota",
        },
      },
    ],
  },
  {
    title: "슬롯",

    subMenus: [
      {
        title: "통합 슬롯",
        url: "#",
        argument: {
          game_title: "slot",
        },
      },
    ],
  },
  {
    title: "미니게임",

    subMenus: [
      {
        title: "미니게임",
        url: "#",
        argument: {
          game_title: "MINI",
        },
      },
    ],
  },
  {
    title: "고객센터",

    subMenus: [
      {
        title: "공지사항",
        url: "?support=true&tag=notify",
      },
      {
        title: "이벤트안내",
        url: "?support=true&tag=event",
      },
      {
        title: "자주 묻는 질문",
        url: "?support=true&tag=faq",
      },
      {
        title: "출금랭킹",
        url: "?support=true&tag=rank-withdraw",
      },
      {
        title: "1:1원격지원",
        url: "?support=true&tag=remote",
      },
      {
        title: "PC안전지킴이",
        url: "?support=true&tag=safe",
      },
      {
        title: "파트너 제휴 문의",
        url: "?support=true&tag=partner",
      },
    ],
  },
  {
    title: "마이 월렛",

    subMenus: [
      {
        title: "입금신청",
        url: "?dialogWallet=true&tag=deposit",
        permission:true,
      },
      {
        title: "출금신청",
        url: "?dialogWallet=true&tag=withdraw",
        permission:true,
      },
      {
        title: "머니이동",
        url: "?dialogWallet=true&tag=transfer",
        permission:true,
      },
      {
        title: "쿠폰내역",
        url: "?dialogWallet=true&tag=coupon",
        permission:true,
      },
      {
        title: "입출금 내역",
        url: "?dialogWallet=true&tag=banking",
        permission:true,
      },
      {
        title: "마이페이지",
        url: "?dialogWallet=true&tag=account",
        permission:true,
      },
    ],
  },
];
