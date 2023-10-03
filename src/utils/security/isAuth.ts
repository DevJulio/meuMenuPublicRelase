import CryptoJS from "crypto-js";
import { isAuth } from "./isCrypto";

export function encryptToAuth(data: string) {
  let lvl;
  lvl = CryptoJS.RC4.encrypt(data, process.env.REACT_APP_HASHKEY!);
  return lvl.toString();
}

export function decryptToAuth(hash: string | null) {
  if (hash) {
    let lvl;
    lvl = CryptoJS.RC4.decrypt(hash, process.env.REACT_APP_HASHKEY!);
    let dec = lvl.toString(CryptoJS.enc.Utf8);
    return dec;
  } else {
    return "";
  }
}
export const getToken = () => {
  if (isAuth()!.userType === "admin") {
    return JSON.parse(decryptToAuth(localStorage.getItem("@meumenu/user"))).token.accessToken;
  } else {
    return JSON.parse(decryptToAuth(localStorage.getItem("@meumenu/j"))).token.accessToken;
  }
};
