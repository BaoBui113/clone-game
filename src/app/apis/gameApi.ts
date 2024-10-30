import axiosClient from "../../utils/axiosClient";

const gameApi = {
  getCheck(data: { token: string; host?: string; game_title: string }) {
    const url = `/game/game_check`;
    return axiosClient.post(url, data);
  },
  getGameStartNew(data: {
    token?: string;
    host?: string;
    width: number;
    height: number;
    game_title?: string;
    vendor?: string;
    os?: string;    
    game_id?: string;
    userip?:string;
  }) {
    const url = `/game/game_start_new`;
    return axiosClient.post(url, data);
  },
  getSlotGames(data: {
    token?: string;
    host?: string;
    width: number;
    height: number;
    game_title?: string;
  }) {
    const url = `/game/slot_games_popup`;
    return axiosClient.post(url, data);
  },
  getMiniGames(data: {
    token?: string;
    host?: string;
    game_title?: string;
    userip?:string
  }) {
    const url = `/game/mini_start`;
    return axiosClient.post(url, data);
  },
  goAllbet(data: {
    token?: string;
    host?: string;
    game_title?: string;
    userip?:string
  }) {
    const url = `/game/allbet_start`;
    return axiosClient.post(url, data);
  },
};

export default gameApi;
