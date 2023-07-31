import CryptoJS from "crypto-js";

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