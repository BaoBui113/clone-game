import axiosClient from "../../utils/axiosClient";

const depositApi = {
  getGameList(data: {
    token?: string;
    host?: string;
  }) {
    const url = `/exchange/deposit`;
    return axiosClient.post(url, data);
  },

  getCouponList(data: {
    token?: string;
    mtype?: string;
    use_yn?: string
    host?: string;
  }) {
    const url = `/code/coupon`;
    return axiosClient.post(url, data);
  },

  deposit(data:{
    token?: string;
    acc_name?: string;
    amount?: string
    comment?: string;
    gamecode?: string;
    userip?: string;
    cno?: string;
    host?: string;

  }){
    const url = `/exchange/depositproc`;
    return axiosClient.post(url, data);
  },

};

export default depositApi;
