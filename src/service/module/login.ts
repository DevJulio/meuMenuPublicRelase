import { message } from "antd";
import { api } from "../api";
import { AxiosError } from "axios";
import { UserService } from "./users";
import { decryptToAuth, encryptToAuth } from "../../utils/security/isAuth";
import { CompanyService } from "./company";
import { TLogin } from "../../pages/account/login";
import { TProducts, TProductsOffers } from "../../pages/menu";
import { TTable } from "../../pages/adm/adm/comanda";
import { useNavigate } from "react-router-dom";
import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";

import { firebaseConfig } from "../../config";
import { genericToken } from "../../utils/utils";



const app = firebase.initializeApp(firebaseConfig);

const auth = firebaseAuth.getAuth(app);

type TSocialMedia = {
    link: string
}


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
    offers: boolean;
    hasHappyHour: boolean;
    reservation: boolean;
    reservationTextDetail: string;
    reservationContactNumber: string;
    offersText: string;
    happyHourText: string;
    happyHourTextDetail: string;
    reservationText: string;
    contactEmail: string;
    contactNumber: string;
    contactName: string;
    city: string;
    socialMedia: {
        instagram: string,
        youtube: string,
        whatsapp: string,
        address: string,
        spotify: string,
    }
}
export type TUser = {
    name: string;
    statusCadastro: boolean;
    userType: string;
    uid: string;
    codCompany?: string;
}

export type TStaf = {
    name: string;
    statusCadastro: boolean;
    codCompany?: string;
}

export type TCategory = {
    icon: string;
    label: string;
    color: string;
    bgColor: string;
    auxColor: string;
    fontStyle: string;
    fontColor?: string;
    id?: number;
}

export type TCompany = {
    title: string;
    statusCadastro: boolean;
    icon: string;
    address: string;
    adminsUids: [{ uid: string }];
    stafsUids: [{ uid: string }];
    details: TCompanyDetail;
    categories: TCategory[];
    menu: TProducts[];
    offers: TProductsOffers[];
    tables: TTable[];
    staff: TStaf[];
    //sales: 
}


export const sessionHandler = async (user: TUser) => {
    console.log(user);
    message.success("Bem vindo, " + user.name)
    if (user.userType === "admin") {
        const company = await CompanyService.GetCompany(user.codCompany!)
        const adminUser = {
            ...user,
            ...company
        }
        localStorage.setItem('@meumenu/user', encryptToAuth(JSON.stringify(adminUser)));
        window.location.replace('/adm/home')
    } else if (user.userType === "admin-j") {
        localStorage.setItem('@meumenu/j', encryptToAuth(JSON.stringify(user)));
        window.location.replace('/j/adm/home')
    } else {
        const staff = await CompanyService.GetStaff(user.codCompany!)
        const staffUser = {
            ...user,
            ...staff
        }
        localStorage.setItem('@meumenu/staff', encryptToAuth(JSON.stringify(staffUser)));
        window.location.replace('/staff/home');
    }
};
export const logout = async () => {

    if (window.confirm('Deseja realizar o logout?')) {
        // clearGenericToken();
        try {
            //await api.get('/seguranca/logout', {
            //    params: {
            //        token: isAuth()?.token_empresa,
            //        session: isAuth()?.session
            //    }
            //});
        } catch (e) {
        }
        localStorage.removeItem('@meumenu/user');
        localStorage.removeItem('@meumenu/config');
        localStorage.removeItem('@meumenu/carrinho');
        window.location.replace('/login')
    }
};

export const getMainToken = () => {
    const tk = localStorage.getItem("@meumenu/maintoken")
    if (tk) {
        return decryptToAuth(tk)
    } else {
        return false
    }
}

export const setMainToken = (token: string) => {
    localStorage.setItem('@meumenu/maintoken', encryptToAuth(token));
}
export const createSolicitation = async (credencials: TLogin) => {
    try {

        // let user: any = {};
        // let isNewUser = false;
        // try {
        //     await firebaseAuth.createUserWithEmailAndPassword(auth, credencials.email, credencials.password).then((userCredential: any) => {
        //         console.log(userCredential);
        //         isNewUser = true
        //         // user = userCredential.user;
        //         // setMainToken(userCredential.accessToken)
        //     })
        //
        // } catch (error: any) {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorCode, errorMessage);
        // }
        //
        // if (isNewUser) {
        //     try {
        //         const resemp: any = await UserService.setUser(user.uid);//Request para criar usuário com o UID do recém adicionado ao auth
        //         if (resemp) {
        //             try {
        //                 //criar empresa com o tipo TCompanyDetail
        //             } catch (error) {
        //
        //             }
        //
        //         }
        //     } catch (error) {
        //
        //     }
        //
        // } else {
        //     message.error('Verifique as credenciais e tente novamente');
        // }
        //
    } catch (error) {
        if ((error as AxiosError).response && (error as AxiosError).response?.status === 401) {
            message.error('Verifique as credenciais e tente novamente');
        } else {
            console.error(error);
            message.error('Houve um erro ao completar a solicitação');
        }
    }
};
export const login = async (data: any) => {
    try {
        const res = await api.post('/login', data, {});
        if (res.status === 200) {
            //setar token: res.data.stsTokenManager.accessToken ou .refreshToken
            //.expirationTime: 1691593084602
            const uid = res.data.user.uid
            localStorage.setItem("@meumenu/userId", encryptToAuth(uid));
            const profile: TUser = await UserService.GetUser(uid);
            if (profile.statusCadastro) {
                message.success('Bem vindo!');
                sessionHandler(profile);
            } else {
                message.error('Cadastro ainda não aprovado');
            }
            console.log(profile);
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
        const errAux = (error as AxiosError).response;
        if (errAux && errAux.data === "Firebase: Error (auth/user-not-found).") {
            message.error("Usuário não encontrado");
        } else if (errAux && errAux.data === "Firebase: Error (auth/wrong-password).") {
            message.error('Credenciais incorretas');
        }
    }
}

export const createUser = async (credencials: TLogin) => {
    try {
        const res = await api.post('/create-login', credencials);
        return res;
    } catch (error) {
        console.log(error, (error as AxiosError));
        const errAux = (error as AxiosError).response;
        if (errAux && errAux.data === "Firebase: Error (auth/email-already-in-use).") {
            message.error("Email já em uso");
        } else if (errAux && errAux.data === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
            message.error("Senha fraca! reviste e tente novamente!");
        } else {
            message.error('Tente novamente mais tarde');
        }
    }
}

