import { AxiosError } from "axios";
import { api } from "../api";
import { message } from "antd";
import { genericToken } from "../../utils/utils";
import { getMainToken } from "./login";

export class UserService {
    //constructor() { }

    static async GetUser(uid: string) {
        try {
            const res = await api.get('/users/user/', {
                params: {
                    uid
                },
                headers: {
                    "Authorization": `Bearer ${getMainToken()}`
                },
            });
            if (res) {
                return res.data
            }
        } catch (error) {
            console.log(error);
            message.error((error as AxiosError).message + "kkkkkkkkkkkkkk");
        }
    }

    static async setUser(data: any) {
        try {
            const res = await api.post('/users/user/', data, {
                headers: {
                    Authorization: `Bearer ${await genericToken()}`,
                },
            });
            return res;
        } catch (error) {
            console.log(error);
            message.error((error as AxiosError).message + "kkkkkkkkkkkkkk");
        }
    }
}