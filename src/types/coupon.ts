export interface CouponType {
  coupon_list: {
    AMOUNT?: string;
    CDESC?: string;
    CGAMECODE?: string;
    CGAMENAME?: string;
    CNO?: string;
    CREGDT?: string;
    EXP_DATE?: string;
    MIN_DEPOSIT?: string;
    MTYPE?: string;
    U_STATUS?: string;
  }[];
  game_list: {
    GAMECODE?: string;
    GAMENAME?: string;
  }[];
  status?: string;
}
