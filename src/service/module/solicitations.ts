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
            return await api.get('/ademiro/getSolicitations');
        } catch (error) {
            console.log(error, (error as AxiosError).message);
            message.error("Não autorizado");
        }
    }

}