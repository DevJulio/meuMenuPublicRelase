import axios from "axios";

import { apiAuth, membershipApi } from "../config";

const tokenKey = "token_access";

/**
 * Método usado para checagem se usuário está logado
 * @returns Retorna true se usuário está logado, e false se estiver deslogado
 */
const isUserLogged = () => {

  return localStorage.getItem(tokenKey) === null ? false : true;
}

/**
 * Método usado para obter informaçõoes do usuário autenticado
 * @returns Retorna informações do usuário autenticado atualmente
 */
const getCurrentUser = async () => {
  try {
    const user = await axios.get(membershipApi + "/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    });
    return user.data;
  } catch (error) {
    return null;
  }
};

/**
 * Método responsável por deslogar o usuário da plataforma
 */
const logout = async () => {
  localStorage.removeItem(tokenKey);
};

/**
 * Método responsável por logar na plataforma
 * @param {string} email O email do cliente
 * @param {string} password Senha do cliente
 * @returns Retorna true se login foi OK, senão retorna um erro
 */
const login = async (email, password, projectId) => {
  const params = new URLSearchParams();
  params.append('email', email);
  params.append('password', password);
  params.append('projectId', projectId || localStorage.getItem('project_id'));

  const token = await axios.post(
    apiAuth + "/auth/login/",
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-Application-ID': process.env.REACT_APP_APPLICATION_ID,
        'X-Application-Key': process.env.REACT_APP_APPLICATION_KEY,
      },
    }
  );
  localStorage.setItem(tokenKey, token.data.access_token);
  const user = await getCurrentUser();

  if (!user) {
    logout();
    // eslint-disable-next-line no-throw-literal
    throw "Usuário não autorizado";
  }
  return true;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  logout,
  login,
  getCurrentUser,
  isUserLogged,
  tokenKey
};
