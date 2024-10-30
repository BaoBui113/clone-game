interface MainNotifyBoard {
    status?:string;
    list?:{
        NOTICE_SEQ?: string,
        NOTICE_TITLE?: string,
        NOTICE_SORT?: string,
        RGST_DT?: string,
        NOTICE_KIND?: string,
    }[]
}