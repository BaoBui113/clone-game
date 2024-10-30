import axiosClient from "../../utils/axiosClient";

const bbsApi = {
  getMainNotifyBoard(data: {
    token?: string;
    host?: string;
    notice_type: string;
    top: string | number;
  }) {
    const url = `/bbs/mainNoticeBoard`;
    return axiosClient.post(url, data);
  },
  getMainNoticeBoardPaging(data: {
    token?: string;
    host?: string;
    notice_type: string;
    page: number | string;
    list_block: number | string;
  }) {
    const url = `/bbs/mainNoticeBoardPaging`;
    return axiosClient.post(url, data);
  },
  getFaqSel(data: {
    token?: string;
    host?: string;
    notice_kind: string;
    page: number | string;
    list_block: number | string;
  }) {
    const url = `/bbs/faqSel`;
    return axiosClient.post(url, data);
  },
  getNotifySel(data: {
   
    host?: string;
    seq?:string;
  }) {
    const url = `/bbs/noticeSel`;
    return axiosClient.post(url, data);
  },

  getSiteType(data: {
    host?: string;
  }) {
    const url = `/code/sitetype/`;
    return axiosClient.post(url, data);
  },
};

export default bbsApi;
