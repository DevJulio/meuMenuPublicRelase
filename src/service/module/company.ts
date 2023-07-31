import { AxiosError } from "axios";
import { api } from "../api";
import { message } from "antd";

export class CompanyService {
    constructor() {

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
}