import { message } from "antd";
import { api } from "../api";
import { AxiosError } from "axios";

export class CategoryService {
  static async setCategory(data: any) {
    try {
      const res = await api.post("/categories/create", data, {});
      return res;
    } catch (error) {
      console.log(error, " setCategory", (error as AxiosError).message);
      message.error("Verifique os dados cadastrados e tente novamente");
      return false;
    }
  }

  static async getCategories() {
    try {
      const res = await api.get("/categories");
      return res;
    } catch (error) {
      console.log(error, " getCategories", (error as AxiosError).message);
      message.error("Verifique os dados cadastrados e tente novamente");

      return false;
    }
  }

  static async updateCategory(docId: string, data: any) {
    try {
      const res = await api.put(`/categories/put/${docId}`, data);
      if (res) {
        return res.data;
      }
    } catch (error) {
      message.error((error as AxiosError).message);
    }
  }

  static async getCategory(cod: string) {
    try {
      const res = await api.get("/categories/company", {
        params: {
          cod_category: cod,
        },
      });
      if (res) {
        return res.data;
      }
    } catch (error) {
      console.log(error, " getCategory", (error as AxiosError).message);
      message.error("Verifique os dados cadastrados e tente novamente");
      return false;
    }
  }
}