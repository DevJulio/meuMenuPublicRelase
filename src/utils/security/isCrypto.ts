import { TCategory } from "../../components/category";
import { TProducts } from "../../pages/menu";
import { CategoryService } from "../../service/module/categories";
import { CompanyService } from "../../service/module/company";
import { FoodsService } from "../../service/module/foods";
import { TUser, logoutForce } from "../../service/module/login";
import { decryptToAuth, encryptToAuth } from "./isAuth";

export type authPayload = {
  hourExpiration: number; // hourExpiration: hora expiração token,
  dateToken: number; // dateTokenExpiration: data vigencia token,
  token_empresa: string; // token_empresa: token empresa logada,
  session: string; // sessao de usuário
  id_usuario: number; // token_usuario: token do usuario logado,
  nome_empresa: string; // token_usuario: token do usuario logado,
  cod_empresa_logada: number; // cod_empresa: codigo empresa,
  comp_logo: string; // comp_logo: logo da empresa
  avatar_url: string; // token_usuario: token do usuario logado,
  nome: string; // nome:nome do usuario logado,
  tabelapv: number;
  login: string; // login: email do usuario logado,
  keepSigned: boolean; // keepSigned: manter conectado
  admin: boolean; // keepSigned: manter conectado
  acess: Array<string>; // acess: permições de acesso
  controls: { [key: string]: any }; // controls: permições de controles
};

export type TStafPayload = {};

export function isAuth(isJ: boolean = false) {
  if (isJ) {
    let usrData = localStorage.getItem("@meumenu/j")!;
    let stringjson = decryptToAuth(usrData);
    let obj = JSON.parse(stringjson);
    const { expirationTime } = obj.token!;
    if (expirationTime > Date.now()) {
      return obj;
    } else {
      logoutForce();
    }
  } else {
    if (localStorage.getItem("@meumenu/user") === null) {
      return null;
    } else {
      let usrData = localStorage.getItem("@meumenu/user")!;
      let stringjson = decryptToAuth(usrData);
      let obj = JSON.parse(stringjson);
      const { expirationTime } = obj.token!;
      if (expirationTime > Date.now()) {
        return obj;
      } else {
        logoutForce();
      }
    }
  }
}

export const isStaff = () => {
  if (localStorage.getItem("@meumenu/staff") === null) {
    return null;
  } else {
    let usrData = localStorage.getItem("@meumenu/staff")!;
    let stringjson = decryptToAuth(usrData);
    let obj = JSON.parse(stringjson) as authPayload;
    return obj;
  }
};
const myCompanyCheck = async () => {
  const menuVersion = localStorage.getItem("@meumenu/menu-version");
  if (menuVersion === "false") {
    return false;
  } else {
    return true;
  }
};
const fetch = async (setFoods: Function, setCategories: Function) => {
  try {
    const usr = isAuth();
    const categoryAndFood: any = await Promise.all([
      await CategoryService.getMyCategories(usr.codCompany!),
      await FoodsService.getMyFoods(usr.codCompany!),
    ])
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error(error);
      });
    if (categoryAndFood[0].length) {
      localStorage.setItem(
        "@meumenu/myCategories",
        encryptToAuth(JSON.stringify(categoryAndFood[0]))
      );
      setCategories(categoryAndFood[0] as TCategory[]);
    }
    if (categoryAndFood[1].length) {
      localStorage.setItem(
        "@meumenu/myFoods",
        encryptToAuth(JSON.stringify(categoryAndFood[1]))
      );
      setFoods(categoryAndFood[1] as TProducts[]);
    }
    localStorage.setItem("@meumenu/menu-version", "false");
  } catch (error) {
    console.log(error);
  }
};
export const myCompany = async (
  setFoods: Function,
  setCategories: Function
) => {
  await fetch(setFoods, setCategories);
  //se a resposta for true a versão do banco é mais atual que a local, fazer fetch.
  // se atualizar cardápio, atualizar apenas a versão do menu no localstorage, se atualizar a empresa, atualizar todo o localstorage da empre
  //if (await myCompanyCheck()) {
  //  await fetch(setFoods, setCategories);
  //} else {
  //  const foods = JSON.parse(
  //    decryptToAuth(localStorage.getItem("@meumenu/myFoods"))
  //  );
  //  const categories = JSON.parse(
  //    decryptToAuth(localStorage.getItem("@meumenu/myCategories"))
  //  );

  //  setFoods(foods as TProducts[]);
  //  setCategories(categories as TCategory[]);
  //}
};
