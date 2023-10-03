import { getMainToken } from "../service/module/login";
import { isAuth } from "./security/isCrypto";

const configTempToken = '@meumenu/genericToken'

export const clearGenericToken = () => localStorage.removeItem(configTempToken);
export async function genericToken() {
    if (isAuth()) {
        console.log("if");
        clearGenericToken();
        return isAuth();
    } else {
        console.log("else");
        let tempToken = localStorage.getItem(configTempToken);
        if (tempToken) {
            console.log("else if");
            return tempToken
        } else {
            console.log("else else");
            // tempToken = (getMainToken());
            // localStorage.setItem(configTempToken, tempToken);
            // return tempToken as string;
            return ""
        }
    }
}