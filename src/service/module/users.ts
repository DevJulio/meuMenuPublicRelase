import { AxiosError } from "axios";
import { api } from "../api";
import { message } from "antd";

export class UserService {
    constructor() {

    }

    static async GetUser(uid:string) {
        try {
            const res = await api.get('/users/user', {
                params: {
                    cod_user: uid
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