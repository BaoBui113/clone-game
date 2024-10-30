
export interface GameType {
    title: string;
    img: string;
    subTitle?: string;
    release?: boolean;
    argument?: {
      game_title?: string;
      os?: string; // case game title HL
      vendor?: string; // case game title HL
      game_id?: string;
      width?: number; // case game title is slot
      height?: number; // case game title is slot
    };
  }
  
  export const GAME_LIST: {
    tab: string;
    listGame: GameType[];
  }[] = [
    {
      tab: "Live",
      listGame: [
        {
          title: "에볼루션 게이밍",
          img: "/images/game/game-01.jpg",
          subTitle: "Evolution gaming",
          release: true,
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "evolution",
            game_id: "evolution_baccarat_sicbo",
          },
        },
        {
          title: "아시안 게이밍",
          img: "/images/game/game-02.jpg",
          subTitle: "Asian gaming",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "Asia Gaming",
            game_id: "0",
          },
        },
        {
          title: "드림 게이밍",
          img: "/images/game/game-03.jpg",
          subTitle: "Dream gaming",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "DreamGame",
            game_id: "dgcasino",
          },
        },
        {
          title: "WM Live",
          img: "/images/game/game-04.jpg",
          subTitle: "WM Live",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "WM Live",
            game_id: "wmcasino",
          },
        },
        {
          title: "마이크로 게이밍",
          img: "/images/game/game-05.jpg",
          subTitle: "Micro gaming",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "MicroGaming Plus",
            game_id: "SMG_titaniumLiveGames_MP_Baccarat",
          },
        },
        {
          title: "프라그마틱 게이밍",
          img: "/images/game/game-06.jpg",
          subTitle: "Pragmatic Play gaming",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "PragmaticPlay Live",
            game_id: "101",
          },
        },
        {
          title: "올벳 게이밍",
          img: "/images/game/game-07.jpg",
          subTitle: "Allbet gaming",
          release: true,
  
          argument: { game_title: "C_ALL", os: "pc", vendor: "", game_id: "C_ALL" },
        },
        {
          title: "봄베이",
          img: "/images/game/game-08.jpg",
          subTitle: "Bombay",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "onetouch-live",
            game_id: "49047",
          },
        },
        {
          title: "7 모조스",
          img: "/images/game/game-09.jpg",
          subTitle: "7 MOJOS",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "mojos",
            game_id: "30516",
          },
        },
        {
          title: "비보",
          img: "/images/game/game-10.jpg",
          subTitle: "VIVO",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "vivo",
            game_id: "vivo_lobby",
          },
        },
        {
          title: "에즈기",
          img: "/images/game/game-11.jpg",
          subTitle: "ezugi",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "ezugi",
            game_id: "ezugi_blackjack",
          },
        },
      ],
    },
    {
      tab: "Hotel",
      listGame: [
        {
          title: "드윈",
          img: "/images/game/game-12.jpg",
          subTitle: "Dowin",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "Dowin",
            game_id: "dowin",
          },
        },
        {
          title: "보타",
          img: "/images/game/game-15.jpg",
          subTitle: "Bota",
          release: true,
  
          argument: {
            game_title: "HL",
            os: "pc",
            vendor: "bota",
            game_id: "bota",
          },
        },
        {
          title: "게임준비중...",
          img: "/images/game/default-coming-soon.jpg",
          subTitle: "Coming soon..",
          release: false,
        },
        {
          title: "게임준비중...",
          img: "/images/game/default-coming-soon.jpg",
          subTitle: "Coming soon..",
          release: false,
        },
      ],
    },
    {
      tab: "Slot",
      listGame: [
        {
          title: "통합 슬롯",
          img: "/images/game/game-13.jpg",
          subTitle: "Total Slot",
          release: true,
  
          argument: { game_title: "slot", width: 1280, height: 820 },
        },
        {
          title: "게임준비중...",
          img: "/images/game/default-coming-soon.jpg",
          subTitle: "Coming soon..",
          release: false,
        },
        {
          title: "게임준비중...",
          img: "/images/game/default-coming-soon.jpg",
          subTitle: "Coming soon..",
          release: false,
        },
        {
          title: "게임준비중...",
          img: "/images/game/default-coming-soon.jpg",
          subTitle: "Coming soon..",
          release: false,
        },
      ],
    },
    {
      tab: "Mini",
      listGame: [
        {
          title: "미니게임",
          img: "/images/game/game-14.jpg",
          subTitle: "Mini game",
          release: true,
          argument:{game_title:"MINI"}
        },
        {
          title: "게임준비중...",
          img: "/images/game/default-coming-soon.jpg",
          subTitle: "Coming soon..",
          release: false,
        },
        {
          title: "게임준비중...",
          img: "/images/game/default-coming-soon.jpg",
          subTitle: "Coming soon..",
          release: false,
        },
        {
          title: "게임준비중...",
          img: "/images/game/default-coming-soon.jpg",
          subTitle: "Coming soon..",
          release: false,
        },
      ],
    },
  ];
  