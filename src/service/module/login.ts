import { message } from "antd";
import { api } from "../api";
import { AxiosError } from "axios";
import { UserService } from "./users";
import { encryptToAuth } from "../../utils/security/isAuth";
import { CompanyService } from "./company";
import { TLogin } from "../../pages/account/login";
import { TProducts, TProductsOffers } from "../../pages/menu";
import { TTable } from "../../pages/adm/adm/comanda";



type TSocialMedia = {
    icon: string,
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
    wellcome: string;
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
    socialMedia: {
        instagram: TSocialMedia,
        youtube: TSocialMedia,
        whatsapp: TSocialMedia,
        address: TSocialMedia,
        spotify: TSocialMedia,
    }
}
export type TUser = {
    name: string;
    statusCadastro: boolean;
    userType: string;
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
    name: string;
    address: string;
    adminsUids: [{ uid: string, userDocId: string }];
    stafsUids: [{ uid: string, userDocId: string }];
    details: TCompanyDetail;
    categories: TCategory[];
    menu: TProducts[];
    offers: TProductsOffers[];
    tables: TTable[];
    staff: TStaf[];
    //sales: 
}



export const loginHandler = async (credencials: TLogin, keepsigned: boolean = false) => {

    try {
        const res = await api.post('/login', {}, {
            params: {
                ...credencials
            },
            headers: {
                //  "Authorization": `Bearer ${token}`
            },
        });
        if (res && (res.status === 200 || res.status === 201)) {
            const { data } = res;
            const resemp: TUser = await UserService.GetUser(data.uid);

            const profile = {
                userType: "company",
                displayName: "REM",
                statusCadastro: true
            };
            if (profile.statusCadastro) {
                sessionHandler({ ...resemp });
            } else {
                if (!profile.statusCadastro) {
                    message.error('Cadastro ainda não aprovado');
                }
            }
        } else {
            message.error('Credenciais incorretas');
        }

    } catch (error) {
        if ((error as AxiosError).response && (error as AxiosError).response?.status === 401) {
            message.error('Credenciais incorretas');
        } else {
            console.error(error);
            message.error('Houve um erro ao completar a solicitação');
        }
    }
};

export const sessionHandler = async (user: TUser) => {
    message.success("Bem vindo, " + user.name)
    if (user.userType === "admin") {
        const company = await CompanyService.GetCompany(user.codCompany!)
        const adminUser = {
            ...user,
            ...company
        }
        localStorage.setItem('@meumenu/user', encryptToAuth(JSON.stringify(adminUser)));
        window.location.replace('/adm//home')
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