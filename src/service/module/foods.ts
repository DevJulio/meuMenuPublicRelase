import { message } from "antd";
import { api } from "../api";
import { AxiosError } from "axios";

export class FoodsService {
  static async getMyFoods(docId: string) {
    try {
      const res = await api.get("/foods/my-foods", {
        params: {
          docId,
        },
      });
      if (res) {
        return res.data;
      }
    } catch (error) {
      console.log(error, " getMyFoods", (error as AxiosError).message);
      message.error("Verifique os dados cadastrados e tente novamente");
      return false;
    }
  }
  static async updateFoods(docId: string, data: any) {
    try {
      const res = await api.put(`/utils/put-sub/${docId}`, data);
      console.log(res);
      if (res) {
        return res.data;
      }
    } catch (error) {
      console.log(error, " updateFoods", (error as AxiosError).message);
      message.error("Verifique os dados enviados e tente novamente");
    }
  }
}
