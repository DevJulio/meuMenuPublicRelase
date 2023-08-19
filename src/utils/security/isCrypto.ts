import { TUser, logoutForce } from '../../service/module/login';
import { decryptToAuth } from './isAuth';

export type authPayload = {
    hourExpiration: number,     // hourExpiration: hora expiração token,
    dateToken: number,          // dateTokenExpiration: data vigencia token,
    token_empresa: string,      // token_empresa: token empresa logada,
    session: string,             // sessao de usuário
    id_usuario: number,         // token_usuario: token do usuario logado,
    nome_empresa: string,       // token_usuario: token do usuario logado,
    cod_empresa_logada: number,         // cod_empresa: codigo empresa,
    comp_logo: string,          // comp_logo: logo da empresa
    avatar_url: string,         // token_usuario: token do usuario logado,
    nome: string,               // nome:nome do usuario logado,
    tabelapv: number,
    login: string,              // login: email do usuario logado,
    keepSigned: boolean,        // keepSigned: manter conectado
    admin: boolean,        // keepSigned: manter conectado
    acess: Array<string>,        // acess: permições de acesso
    controls: { [key: string]: any }// controls: permições de controles
}

export type TStafPayload = {

}

export function isAuth(isJ: boolean = false) {
    if (isJ) {
        let usrData = localStorage.getItem('@meumenu/j')!;
        let stringjson = decryptToAuth(usrData);
        let obj = JSON.parse(stringjson) as TUser;
        const { expirationTime } = obj.token!
        if (expirationTime > Date.now()) {
            return obj;
        } else {
            logoutForce()
        }
    } else {
        if (localStorage.getItem('@meumenu/user') === null) {
            return null;
        } else {
            let usrData = localStorage.getItem('@meumenu/user')!;
            let stringjson = decryptToAuth(usrData);
            let obj = JSON.parse(stringjson) as TUser;
            const { expirationTime } = obj.token!
            if (expirationTime > Date.now()) {
                return obj;
            } else {
                logoutForce()
            }
        }
    }
}

export const isStaff = () => {

    if (localStorage.getItem('@meumenu/staff') === null) {
        return null;
    } else {
        let usrData = localStorage.getItem('@meumenu/staff')!;
        let stringjson = decryptToAuth(usrData);
        let obj = JSON.parse(stringjson) as authPayload;
        return obj;
    }

}