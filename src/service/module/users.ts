import { AxiosError } from "axios";
import { api } from "../api";
import { message } from "antd";
//import { genericToken } from "../../utils/utils";
//import { getMainToken } from "./login";

export class UserService {
    //constructor() { }

    static async GetUser(uid: string) {
        try {
            const res = await api.get('/users/user/', {
                params: {
                    uid
                },
                //headers: {
                //    "Authorization": `Bearer ${getMainToken()}`
                //},
            });
            if (res) {
                return res.data
            }
        } catch (error) {
            console.log(error, (error as AxiosError).message);
            message.error("Não autorizado");
        }
    }

    static async setUser(data: any) {
        try {
            const res = await api.post('/users/create', data, {});
            return res;
        } catch (error) {
            console.log(error, (error as AxiosError).message);
            message.error("Não autorizado");
        }
    }
}