import { User } from "@/types/user";
import axiosClient from "../../utils/axiosClient";

const userApi = {
  


    login(data: User) {
        const url = `/user/login`;
        return axiosClient.post(url, data)
    },
    idcheck(data: {
        userid?: string;
        host?: string;
    }) {
        const url = `/user/idcheck`;
        return axiosClient.post(url, data);
    },
    join(data: {
        host?: string;
    }) {
        const url = `/user/join`;
        return axiosClient.post(url, data);
    },

    joinInsert(data: {
        name?: string;
        hp_no?: string;
        dnm_cd?: string;
        recommendId?: string;
        idagent?: string;
        level_cd?: string;
        userid?: string;
        password?: string;
        bnk_cd?: string;
        mbnk_nm?: string;
        mbnk_no?: string;
        fs_yn?: string;
        host?: string;
        fs_no?: string;
        sms_cert_hp?: string;
        auth_status?: string;
        userip?: string;
    }) {
        const url = `/user/joininsert`;
        return axiosClient.post(url, data);
    },

    sendOtp(data: {
        telnum?: string;
        host?: string;
    }) {
        const url = `/user/smsNumSend`;
        return axiosClient.post(url, data);
    },

    verifyOtp(data: {
        telnum?: string;
        certType?: string;
        certNum?: string;
        host?: string;
    }) {
        const url = `/user/smsNumCheck`;
        return axiosClient.post(url, data);
    },

    checkBank(data: {
        mbnk_no?: string;
        bnk_cd?: string;
        host?: string;
    }) {
        const url = `/user/bankcheck`;
        return axiosClient.post(url, data);
    },

    getMyPage(data: { token?: string, host?: string }) {
        const url = `/user/mypage`;
        return axiosClient.post(url, data)
    },
    
    updatePassword(data: {
        token?: string;
        host?: string;
        old_password: string;
        new_password: string;
        userip: string;
      }) {
        const url = `/user/mypagePwUpdate`;
        return axiosClient.post(url, data);
      },

}

export default userApi;

