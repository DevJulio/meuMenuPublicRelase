import { message } from "antd";
import { api } from "../api";
import { AxiosError } from "axios";
import { isAuth } from "../../utils/security/isCrypto";
import { getToken } from "../../utils/security/isAuth";

export class TabsService {
  static async getMyTabs(isOpen: boolean) {
    const codCompany = isAuth().codCompany;
    try {
      const res = await api.get(`/tabs/my-tabs/${isOpen}`, {
        params: {
          codCompany,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res) {
        return res.data;
      }
    } catch (error) {
      console.log(error, " getMyTabs", (error as AxiosError).message);
      message.error("Verifique os dados cadastrados e tente novamente");
      return false;
    }
  }
  static async updateTabs(data: any) {
    try {
      const res = await api.put(`/utils/put-sub/${isAuth().codCompany}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log(res);
      if (res) {
        return res.data;
      }
    } catch (error) {
      console.log(error, " updateTabs", (error as AxiosError).message);
      message.error("Verifique os dados enviados e tente novamente");
    }
  }
}
