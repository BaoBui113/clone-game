export interface WithdrawHistoryType {
    list?:{
        CHG_DT?: string;
        GAMENAME?: string;
        IO_AMOUNT?: string;
        RGST_DT?: string;
        SYS_NM: string;
    }[],
    status?:string
}


export const TYPES:{value:string,label:string}[] = [
    {value:"I",label:"입금"},
    {value:"O",label:"출금"},
]