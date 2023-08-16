import { AxiosError } from "axios";
import { api } from "../api";
import { message } from "antd";

export class CompanyService {

    static async setCompany(data: any) {
        console.log(data);
        try {
            const res = await api.post('/companies/create/', data, {
                // headers: {
                //     Authorization: `Bearer ${await genericToken()}`,
                // },
            });
            return res;
        } catch (error) {
            console.log(error, (error as AxiosError).message);
            message.error("Verifique os dados cadastrados e tente novamente");
            return false
        }
    }
    static async GetCompany(cod: string) {
        try {
            const res = await api.get('/companys/company', {
                params: {
                    cod_company: cod
                },
                headers: {
                    //"Authorization": `Bearer ${await genericToken()}`
                },
            });
            if (res) {
                return res.data
            }
        } catch (error) {
            message.error((error as AxiosError).message);
        }
    }
    static async GetStaff(cod: string) {
        try {
            const res = await api.get('/companys/staff', {
                params: {
                    cod_company: cod
                },
                headers: {
                    //"Authorization": `Bearer ${await genericToken()}`
                },
            });
            if (res) {
                return res.data
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
                return res.data
            }
        } catch (error) {
            message.error((error as AxiosError).message);
        }
    }
}