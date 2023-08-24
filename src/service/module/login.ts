import { message } from "antd";
import { api } from "../api";
import { AxiosError } from "axios";
import { UserService } from "./users";
import { decryptToAuth, encryptToAuth } from "../../utils/security/isAuth";
import { CompanyService } from "./company";
import { TLogin } from "../../pages/account/login";
import { TProducts, TProductsOffers } from "../../pages/menu";
import { TTable } from "../../pages/adm/adm/comanda";

export type TLatLon = {
  lat: number;
  lng: number;
};
export type TSocialMedia = {
  localization: TLatLon;
  instagram: string;
  youtube: string;
  whatsapp: string;
  address: string;
  spotify: string;
};
export type TMenuFeatures = {
  status: boolean; //Atualizar para true quando existir alguma oferta, reserva ou happy hour
  bannerText: string; //Descrição do modal
  bannerTitle: string; //título do banner
  bannerURL: string; //título do banner
  daysOfWeek?: number[];
  startAt?: string;
  endAt?: string;
  reservationNumber?: string;
};

//Criar tipo happy hour, ofertas e reserva para conter todos os dados de contato, texto, dias e horário
export type TCompanyDetail = {
  icon: string;
  title: string;
  mainColor: string;
  auxColor: string;
  textColor: string;
  fontStyle: string;
  fontStyleAux: string;
  welcome: string;
  banner: string;
  offers: TMenuFeatures;
  reservation: TMenuFeatures;
  happyHour: TMenuFeatures;
  contactEmail: string; //Informações para o meu menu
  contactNumber: string; //Informações para o meu menu
  contactName: string; //Informações para o meu menu
  city: string;
  socialMedia: TSocialMedia;
  hideLogo: boolean;
  hideTitle: boolean;
};
type TAT = {
  nanoseconds: number;
  seconds: number;
};
type TUids = {
  uid: string;
};
export type TUser = {
  name: string;
  statusCadastro: boolean;
  userType: string;
  uid: string;
  docId?: string;
  codCompany?: string;
  createdAt?: TAT;
  updatedAt?: TAT;
  token?: TToken;
};

export type TStaf = {
  name: string;
  statusCadastro: boolean;
  codCompany?: string;
  //implementar log
};

export type TCategory = {
  icon: string;
  label: string;
  color: string;
  bgColor: string;
  auxColor: string;
  fontStyle: string;
  fontColor?: string;
  id?: number;
};

export type TCompany = {
  title: string;
  statusCadastro: boolean;
  isAproved: boolean; //Caso seja false, a solicitação não foi aprovada.
  icon: string;
  plan: string;
  address: string;
  adminsUids: TUids[];
  stafsUids: TUids[];
  details: TCompanyDetail;
  categories: TCategory[];
  menu: TProducts[];
  offers: TProductsOffers[];
  tables: TTable[];
  staff: TStaf[];
  URL: string;
  docId?: string;
  createdAt?: TAT;
  updatedAt?: TAT;
  //sales:
};
export type TToken = {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
};

export const sessionHandler = async (userP: TUser, token: TToken) => {
  message.success("Bem vindo, " + userP.name);
  const user = {
    ...userP,
    token,
  };
  if (user.userType === "admin") {
    const company = await CompanyService.GetCompany(user.codCompany!);
    const adminUser = {
      ...user,
      ...company,
    };
    localStorage.setItem(
      "@meumenu/user",
      encryptToAuth(JSON.stringify(adminUser))
    );
    window.location.replace("/adm/home");
  } else if (user.userType === "admin-j") {
    localStorage.setItem("@meumenu/j", encryptToAuth(JSON.stringify(user)));
    window.location.replace("/j/adm/home");
  } else {
    const staff = await CompanyService.GetStaff(user.codCompany!);
    const staffUser = {
      ...user,
      ...staff,
    };
    localStorage.setItem(
      "@meumenu/staff",
      encryptToAuth(JSON.stringify(staffUser))
    );
    window.location.replace("/staff/home");
  }
};
export const logout = async () => {
  if (window.confirm("Deseja realizar o logout?")) {
    // clearGenericToken();
    try {
      //await api.get('/seguranca/logout', {
      //    params: {
      //        token: isAuth()?.token_empresa,
      //        session: isAuth()?.session
      //    }
      //});
    } catch (e) {}
    localStorage.removeItem("@meumenu/user");
    localStorage.removeItem("@meumenu/config");
    localStorage.removeItem("@meumenu/carrinho");
    window.location.replace("/login");
  }
};

export const getMainToken = () => {
  const tk = localStorage.getItem("@meumenu/maintoken");
  if (tk) {
    return decryptToAuth(tk);
  } else {
    return false;
  }
};

export const setMainToken = (token: string) => {
  localStorage.setItem("@meumenu/maintoken", encryptToAuth(token));
};

export const login = async (data: any) => {
  try {
    const res = await api.post("/login", data, {});
    if (res.status === 200) {
      const token: TToken = res.data.user.stsTokenManager;
      const { uid } = res.data.user;
      const profile: TUser = await UserService.GetUser(uid);
      if (profile.statusCadastro) {
        message.success("Bem vindo!");
        sessionHandler(profile, token);
      } else {
        message.error("Cadastro ainda não aprovado");
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    const errAux = (error as AxiosError).response;
    if (errAux && errAux.data === "Firebase: Error (auth/user-not-found).") {
      message.error("Usuário não encontrado");
    } else if (
      errAux &&
      errAux.data === "Firebase: Error (auth/wrong-password)."
    ) {
      message.error("Credenciais incorretas");
    }
  }
};

export const createUser = async (credencials: TLogin) => {
  try {
    const res = await api.post("/create-login", credencials);
    return res;
  } catch (error) {
    console.log(error, error as AxiosError);
    const errAux = (error as AxiosError).response;
    if (
      errAux &&
      errAux.data === "Firebase: Error (auth/email-already-in-use)."
    ) {
      message.error("Email já em uso");
    } else if (
      errAux &&
      errAux.data ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      message.error("Senha fraca! reviste e tente novamente!");
    } else {
      message.error("Tente novamente mais tarde");
    }
  }
};

export const logoutForce = async () => {
  localStorage.removeItem("@meumenu/user");
  localStorage.removeItem("@meumenu/staff");
  localStorage.removeItem("@meumenu/j");
  localStorage.removeItem("@meumenu/planType");
  localStorage.removeItem("@meumenu/config");
  window.location.replace("/login");
};
