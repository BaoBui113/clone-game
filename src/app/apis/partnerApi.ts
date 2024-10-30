import axiosClient from "../../utils/axiosClient";

const partnerApi = {
  checkPartner(data: { token: string; host?: string }) {
    const url = `/partner/view`;
    return axiosClient.post(url, data);
  },
  registerPartner(data: {
    token: string;
    host: string;
    content: string;
    contract: string;
  }) {
    const url = `/partner/inquryproc`;
    return axiosClient.post(url, data);
  },
};

export default partnerApi;
