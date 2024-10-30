import axiosClient from "../../utils/axiosClient";

const exchangeApi = {
  getWithdrawTopList(data: {
    token?: string;
    host?: string;
    list_type: string | number;
    io_type: string | number;
    top: string | number;
  }) {
    const url = `/exchange/withdrawTopList`;
    return axiosClient.post(url, data);
  },

  movePre(data: {
    token?: string;
    host?: string;
  }) {
    const url = `/exchange/move`;
    return axiosClient.post(url, data);
  },

  moveProcess(data: {
    token?: string;
    host?: string;
    s_game_code?: string;
    t_game_code?: string;
    amount?: string;
    user_ip?: string;
  }) {
    const url = `/exchange/moveproc`;
    return axiosClient.post(url, data);
  },

  getWithdrawHistory(data:{
    token?: string;
    host?: string;
    type: string;
  }){
    const url = `/exchange/history`;
    return axiosClient.post(url, data);
  }
};

export default exchangeApi;
