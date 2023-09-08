import { AxiosError } from "axios";
import { api } from "../api";
import { message } from "antd";

export class CompanyService {
  static async setCompany(data: any) {
    console.log(data);
    try {
      const res = await api.post("/companies/create/", data, {
        // headers: {
        //     Authorization: `Bearer ${await genericToken()}`,
        // },
      });
      return res;
    } catch (error) {
      console.log(error, " setCompany", (error as AxiosError).message);
      message.error("Verifique os dados cadastrados e tente novamente");
      return false;
    }
  }
  static async GetCompany(cod: string) {
    try {
      const res = await api.get("/companies/company", {
        params: {
          cod_company: cod,
        },
      });
      if (res) {
        return res.data;
      }
    } catch (error) {
      console.log(error, " GetCompany", (error as AxiosError).message);
      message.error("Verifique os dados cadastrados e tente novamente");
      return false;
    }
  }
  static async GetCompanyByURL(URL: string) {
    try {
      const res = await api.get("/companies/data", {
        params: { URL },
      });
      if (res) {
        return res.data;
      }
    } catch (error) {
      console.log(error, " GetCompany", (error as AxiosError).message);
      message.error("Verifique os dados cadastrados e tente novamente");
      return false;
    }
  }
  static async CheckUrl(URL: string) {
    try {
      const res = await api.get("/companies/url", {
        params: { URL },
      });
      if (res) {
        return res.data;
      }
    } catch (error) {
      console.log(error, " CheckUrl", (error as AxiosError).message);
      return false;
    }
  }
  static async GetStaff(cod: string) {
    try {
      const res = await api.get("/companys/staff", {
        params: {
          cod_company: cod,
        },
        headers: {
          //"Authorization": `Bearer ${await genericToken()}`
        },
      });
      if (res) {
        return res.data;
      }
    } catch (error) {
      message.error((error as AxiosError).message);
    }
  }
  static async updateCompany(docId: string, data: any) {
    try {
      const res = await api.put(`/companies/put/${docId}`, data);
      console.log(res);
      if (res) {
        return res.data;
      }
    } catch (error) {
      message.error((error as AxiosError).message);
    }
  }
  static async setCompanySubCol(data: any) {
    try {
      const res = await api.post("/utils/create-sub", data, {});
      return res;
    } catch (error) {
      console.log(error, " setCompanySubCol", (error as AxiosError).message);
      message.error("Verifique os dados cadastrados e tente novamente");
      return false;
    }
  }
}
