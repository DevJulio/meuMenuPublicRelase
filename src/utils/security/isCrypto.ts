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

export function isAuth() {
    if (localStorage.getItem('@meumenu/user') === null) {
        console.log("if auth");        
        return null;
    } else {
        console.log("else auth");
        let usrData = localStorage.getItem('@meumenu/user')!;
        let stringjson = decryptToAuth(usrData);
        let obj = JSON.parse(stringjson);
        //let d = new Date();
        // if (!obj.keepSigned) {
        //     // if ((obj.dateToken! !== parseInt(format(d, 'dd'))) || parseInt(format(d, 'HHmm')) > obj.hourExpiration!) {
        //     //     logoutForce();
        //     // }
        // } else {
        //     if (obj.dateToken! !== parseInt(format(d, 'dd'))) {
        //         logoutForce();
        //     }
        // }
        // console.log((obj.hourExpiration !== (parseInt(format(d, 'HHmm')) + 60)))
        // if (obj.hourExpiration !== (parseInt(format(d, 'HHmm')) + 60)) {
        //     obj.hourExpiration = parseInt(format(d, 'HHmm')) + 60;
        //     localStorage.setItem('@slwc/user', encryptToAuth(JSON.stringify(obj)));
        // }
        return obj;
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