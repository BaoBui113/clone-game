export interface User {
  userid?: string;
  password?: string;
  userip?: string;
  host?: string;
  u_device?: string;
  u_os?: string;
  u_browser?: string;
  fp?: string;
}

export interface UserRepo {
  status?: string;
  MEM_ID?: string;
  MEM_LID?: string;
  token?: string;
  TEST_ID_YN?: string;
  HP_NO?: string;
  GAME_ALIAS?: string;
  LEVEL_CD?: string;
  LEVEL_NAME?: string;
}


export interface AccountInfo{
  BANK_LIST?:{
    BANK_CD?:string;
    BANK_NM?:string;
  }[],
  LAST_BANK_INFO:{
    ACC_NAME?:string;
    BANK_CD?:string;
    BANK_NO?:string;
  }
  MEM_INFO:{
    IN_ID?:string
  }[]
  SMS_AUTH_INFO:{
    BUTTON_YN?:string;
    SMS_AUTH_YN?:string;
  }[]
  status:[]

}