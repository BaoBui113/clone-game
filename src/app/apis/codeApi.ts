
import axiosClient from "../../utils/axiosClient";

const codeApi = {
  getLoginMsg(data: { token?: string; host?: string }) {
    const url = `/code/loginMsg`;
    return axiosClient.post(url, data);
  },

  getCoupons(data: { token: string; host?: string ,mtype:string,use_yn:string}) {
    const url = `/code/coupon`;
    return axiosClient.post(url, data);
  },
};

export default codeApi;
