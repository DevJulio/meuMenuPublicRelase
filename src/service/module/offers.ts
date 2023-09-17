import { message } from "antd";
import { api } from "../api";
import { AxiosError } from "axios";

export class OffersService {
  static async getMyOffers(docId: string) {
    try {
      const res = await api.get("/offers/my-offers", {
        params: {
          docId,
        },
      });
      if (res) {
        return res.data;
      }
    } catch (error) {
      console.log(error, " getMyOffers", (error as AxiosError).message);
      message.error("Verifique os dados cadastrados e tente novamente");
      return false;
    }
  }
  static async updateOffers(docId: string, data: any) {
    try {
      const res = await api.put(`/utils/put-sub/${docId}`, data);
      console.log(res);
      if (res) {
        return res.data;
      }
    } catch (error) {
      console.log(error, " updateOffers", (error as AxiosError).message);
      message.error("Verifique os dados enviados e tente novamente");
    }
  }
}
