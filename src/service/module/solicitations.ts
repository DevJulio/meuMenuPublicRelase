import { AxiosError } from "axios";
import { api } from "../api";
import { message } from "antd";

export class SolicitationService {
    static async createSolicitation(data: any) {
        try {
            const res = await api.post('/companies/create/', data, {});
            return res;
        } catch (error) {
            console.log(error, (error as AxiosError).message);
            message.error("Verifique os dados cadastrados e tente novamente");
            return false
        }
    }
    static async getSolicitations() {
        try {
            const res = await api.get('/ademiro/getSolicitations');
            console.log(res);
            return res
        } catch (error) {
            console.log(error);
            console.log(error, (error as AxiosError).message);
            return false
        }
    }
    static async updateSolicitations(docId: string, data: any) {
        try {
            const res = await api.put(`/ademiro/putSolicitations/${docId}`, data);
            console.log(res);
            if (res) {
                return res.data
            } else {
                return false
            }
        } catch (error) {
            message.error((error as AxiosError).message);
        }
    }

}