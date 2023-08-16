import { message } from "antd";
import { api } from "../api";
import { AxiosError } from "axios";
import { UserService } from "./users";
import { decryptToAuth, encryptToAuth } from "../../utils/security/isAuth";
import { CompanyService } from "./company";
import { TLogin } from "../../pages/account/login";
import { TProducts, TProductsOffers } from "../../pages/menu";
import { TTable } from "../../pages/adm/adm/comanda";

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
    offers: boolean;//Atualizar para true quando alguma oferta for cadastrada
    offersText: string;//Título do Banner de ofertas
    hasHappyHour: boolean;//Caso tenha adicionado na tela de edição de cadastros
    happyHourText: string;//Título do Banner do happy hour
    happyHourTextDetail: string;//Texto do modal ao abrir para saber mais sobre o happy hour
    reservation: boolean; //caso true, banner de reservas aparece, alterar para true e defirir as regras.
    reservationText: string; //Título do Banner de reservas
    reservationTextDetail: string;    //Texto do modal ao abrir para saber mais sobre resevas
    reservationContactNumber: string; //número para reservas
    contactEmail: string;//Informações para o meu menu
    contactNumber: string;//Informações para o meu menu
    contactName: string;//Informações para o meu menu
    city: string;
    socialMedia: {
        localization: {
            lat: number,
            lon: number
        }
        instagram: string,
        youtube: string,
        whatsapp: string,
        address: string,
        spotify: string,
    }
}
type TAT = {
    nanoseconds: number
    seconds: number
}
export type TUser = {
    name: string;
    statusCadastro: boolean;
    userType: string;
    uid: string;
    codCompany?: string;
    createdAt?: TAT;
    updatedAt?: TAT;
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
    plan: string;
    address: string;
    adminsUids: [{ uid: string }];
    stafsUids: [{ uid: string }];
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

