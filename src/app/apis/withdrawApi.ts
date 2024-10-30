import axiosClient from "@/utils/axiosClient";

const withdrawApi = {
  getWithDrawData(data: {
    token?: string;
    host?: string;
  }){
    const url = `/exchange/withdraw`;
    return axiosClient.post(url, data);
  },

  checkAccountWithdraw(data: {
    token?: string;
    host?: string;
  }){
    const url = `/exchange/checkHasWithdrawAccnt`;
    return axiosClient.post(url, data);
  },

  checkMoney(data:{
    token?: string;
    host?: string;
    gamecode?: string;
  }){
    const url = `/exchange/money_check`;
    return axiosClient.post(url, data);
  },

  makeWithdraw(data:{
    token?: string;
    bank_no?: string;
    amount?: string
    comment?: string;
    gamecode?: string;
    userip?: string;
    acc_name?: string;
    bank_cd?: string;
    host?: string;
  }){
    const url = `/exchange/withdrawproc`;
    return axiosClient.post(url, data);
  },

};

export default withdrawApi;
