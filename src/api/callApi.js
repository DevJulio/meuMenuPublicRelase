import axios from "axios";

import { apiAuth, membershipApi, paymentApi } from "../config";
import moment from "moment";

const tokenKey = "token_access";

const INITIAL_DATE = new Date(2000, 1, 1);

/**
 * Pega intervalo de data inicial e final para filtros
 * @param {any} objectDateFilter Objeto de data
 */
const getStartEndDate = async (objectDateFilter) => {
  let start_date = INITIAL_DATE;
  let end_date = moment().add(1, "day").toDate();

  // Se não tiver data, criar data de hoje
  if (Object.keys(objectDateFilter).length === 0) {
    return { start_date, end_date };
  }

  start_date = new Date();
  start_date.setHours(0, 0, 0, 0);

  if (objectDateFilter["isDate"] === true) {
    const startDate = objectDateFilter["value"][0];
    start_date.setDate(startDate.getDate());
    start_date.setFullYear(startDate.getFullYear());
    start_date.setMonth(startDate.getMonth());

    const endDate = objectDateFilter["value"][1];
    const parsedDate = moment(endDate).add(1, "days").toDate();

    end_date.setDate(parsedDate.getDate());
    end_date.setFullYear(parsedDate.getFullYear());
    end_date.setMonth(parsedDate.getMonth());

  } else if (objectDateFilter["isDate"] === false) {
    start_date.setDate(start_date.getDate() - objectDateFilter["value"]);
  }

  return { start_date, end_date };
};

const getProjectsUser = async () => {
  const result = await axios.get(
    membershipApi + `/projects/user?slug=${localStorage.getItem("slug")}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return result?.data;
};

const getUserProject = async (projectId, user_id) => {
  const params = {};
  if (user_id) {
    params.userId = user_id;
  }
  const response = await axios.get(
    membershipApi + "/projects/user/" + projectId,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params,
    }
  );
  return response?.data;
};

const createCheckIn = async (data) => {
  const response = await axios.post(membershipApi + "/checkin", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

const getOneCheckIn = async (checkinId) => {
  const response = await axios.get(membershipApi + "/checkin/" + checkinId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

const getCheckIns = async (supporter_id) => {
  const response = await axios.get(
    membershipApi + "/checkin/user/" + supporter_id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};

const getAllCheckIns = async (projectId, objectDateFilter, currentPage) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);
  let dict_filter = {};

  dict_filter["start_date"] = start_date.toJSON().split("T")[0];
  dict_filter["end_date"] = end_date.toJSON().split("T")[0];

  // Se receber -1 da função, busca todos os dados sem paginação
  if (currentPage !== -1) {
    dict_filter["page"] = currentPage;
  } else {
    dict_filter["no_page"] = "";
  }

  dict_filter["groupBy"] = "DESC";
  dict_filter["size"] = 20;

  const response = await axios.get(
    membershipApi + "/checkin/project/" + projectId,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: dict_filter,
    }
  );
  return response?.data;
};

const getAllCheckInsCollaborator = async (
  projectId,
  collaboratorId,
  currentPage
) => {
  const params = {
    collaboratorId,
    page: currentPage,
    groupBy: "DESC",
    size: 20,
  };
  // Se receber -1 da função, busca todos os dados sem paginação
  if (currentPage === -1) {
    params.page = "";
  }
  const response = await axios.get(
    membershipApi + "/checkin/collaborador/" + projectId,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params,
    }
  );
  return response?.data;
};

const getAllStaffMembers = async (
  project_id,
  objectDateFilter,
  currentPage
) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);

  let dict_filter = {};

  dict_filter["start_date"] = start_date.toJSON().split("T")[0];
  dict_filter["end_date"] = end_date.toJSON().split("T")[0];
  dict_filter["subscription__projeto__id"] = project_id;
  dict_filter["size"] = 20;

  // Se receber -1 da função, busca todos os dados sem paginação
  if (currentPage !== -1) {
    dict_filter["page"] = currentPage;
  } else {
    dict_filter["no_page"] = "";
  }

  dict_filter["groupBy"] = "DESC";

  const result = await axios.get(
    membershipApi + `/projects/collaborators/` + project_id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: dict_filter,
    }
  );
  return result?.data;
};

const deleteCollaborator = async (id) => {
  const response = await axios.delete(
    membershipApi + "/projects/collaborator/" + id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};

const createCollaborator = async (id, admin, finance, projectId, position) => {
  const data = {
    userId: id,
    projectId: projectId,
    position,
    isAdmin: admin === "true",
    isFinance: finance === "true",
  };

  const response = await axios.post(
    membershipApi + "/projects/collaborator",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};

/**
 * Atualiza os dados do colaborador
 * @param {any} data Dados do colaborador
 */
const updateCollaborator = async (data) => {
  const parsed = {
    id: data?.id,
    userId: data?.userId,
    projectId: data?.projectId,
    position: data?.position,
    isAdmin: data?.isAdmin && "true",
    isFinance: data?.isFinance && "true",
  };

  const response = await axios.put(
    membershipApi + "/projects/collaborator",
    parsed,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};

const findUserEmail = async (email) => {
  const result = await axios.get(
    apiAuth +
    "/users/email/" +
    email +
    `?projectId=${localStorage.getItem("id_project")}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return result;
};

const getAllProjects = async (
  project_id,
  objectDateFilter,
  searchContent,
  currentPage,
  selectedFiltersState
) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);

  let dict_filter = {};

  dict_filter["start_date"] = start_date.toJSON().split("T")[0];
  dict_filter["end_date"] = end_date.toJSON().split("T")[0];
  dict_filter["search"] = searchContent;

  // Se receber -1 da função, busca todos os dados sem paginação
  if (currentPage !== -1) {
    dict_filter["page"] = currentPage;
  } else {
    dict_filter["no_page"] = "";
  }

  dict_filter["groupBy"] = "DESC";
  dict_filter["size"] = 20;

  // Adiciona os filtros para as querys
  selectedFiltersState.forEach((f) => {
    dict_filter[f.key] = f.value;
  });

  const result = await axios.get(membershipApi + `/projects`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
    params: dict_filter,
  });
  return result;
};

const getAllSupportersProject = async (
  project_id,
  objectDateFilter,
  searchContent,
  currentPage,
  selectedFiltersState
) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);

  let dict_filter = {};

  dict_filter["start_date"] = start_date.toJSON().split("T")[0];
  dict_filter["end_date"] = end_date.toJSON().split("T")[0];

  dict_filter["search"] = searchContent;

  let status = [];
  let plans = [];

  selectedFiltersState?.forEach((filter) => {
    if (filter.keyPdf === "plans[]") plans.push(filter.value);

    if (filter.keyPdf === "status[]") status.push(filter.value);
  });

  if (status.length === 0) status = ["active", "inactive", "pending", "closed"];

  // Se receber -1 da função, busca todos os dados sem paginação
  if (currentPage !== -1) {
    dict_filter["page"] = currentPage;
  } else {
    dict_filter["no_page"] = "";
  }

  dict_filter["plans"] = plans;
  dict_filter["status"] = status;

  dict_filter["groupBy"] = "DESC";
  dict_filter["size"] = 20;

  const result = await axios.get(
    membershipApi + `/projects/supporters/` + project_id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: dict_filter,
    }
  );
  return result?.data;
};

const postDirectRegistration = async (data) => {
  const response = await axios.post(
    membershipApi + "/direct-registration",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response;
};

const postUserExistsDirectRegistration = async (data) => {
  const response = await axios.post(
    membershipApi + "/direct-registration/user-exists",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response;
};

const getUserByDocument = async (document) => {
  const response = await axios.get(
    apiAuth +
    "/users/document/" +
    document +
    `?projectId=${localStorage.getItem("id_project")}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response;
};

const getTransaction = async (transactionId) => {
  const response = await axios.get(
    paymentApi + "/transactions/info/" + transactionId,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};

const getPaymentData = async (hashId) => {
  const result = await axios.get(paymentApi + "/transactions/" + hashId, {});
  return result;
};

const getStaffInfo = async (staff_id) => {
  const result = await axios.get(
    membershipApi + "/projects/collaborator/" + staff_id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return result?.data;
};

const createSupporter = async (data) => {
  const response = await axios.post(membershipApi + "/users", data);
  return response?.data;
};

const updateSupporter = async (data) => {
  const response = await axios.put(membershipApi + "/users", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

const createSupporterInProject = async (data) => {
  const response = await axios.post(
    membershipApi + "/projects/supporter",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};

const getSupporter = async (supporterId) => {
  const response = await axios.get(
    membershipApi + "/projects/supporter/" + supporterId,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};

const createPlan = async (data) => {
  const response = await axios.post(membershipApi + "/plans", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

const updatePlan = async (planId, data) => {
  const response = await axios.put(membershipApi + "/plans/" + planId, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

const deletePlan = async (planId) => {
  const response = await axios.delete(membershipApi + "/plans/" + planId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

const getPlan = async (planId) => {
  const response = await axios.get(membershipApi + "/plans/" + planId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

const getPlans = async (projectId) => {
  const response = await axios.get(
    membershipApi + "/plans/project/" + projectId
  );
  return response?.data;
};

const getActivePlans = async (projectId) => {
  const response = await axios.get(
    membershipApi + "/plans/active/" + projectId
  );
  return response?.data;
};

const getPlanSupporters = async (planId) => {
  const response = await axios.get(
    membershipApi + "/plans/supporters/" + planId,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};

export const getCard = async (supporterId) => {
  const response = await axios
    .get(membershipApi + "/card/" + supporterId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      responseType: "blob",
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "card.pdf");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};

export const getDependentCard = async (dependentId) => {
  const response = await axios
    .get(membershipApi + "/card/dependents/" + dependentId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      responseType: "blob",
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "dependentCard.pdf");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};

/**
 * Retorna a última transação de status confirmado através do id do support('apoio')
 * @param {string} supporter_id
 * @returns
 */
const getTransactions = async (supporter_id) => {
  const response = await axios.get(
    membershipApi + "/projects/transactions/" + supporter_id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};


/**
 * Atualiza os dados do usuário na última transação realizada de um projeto.
 * @param {string} supporter_id
 * @returns
 */
const updateTransactions = async (id, data) => {
  const response = await axios.put(membershipApi + "/projects/supporters/transaction/updatePlan/" + id, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};




const getValidateProject = async (project_id) => {
  const response = await axios.get(membershipApi + "/projects/" + project_id);
  return response?.data;
};

const getSlugProject = async (slug) => {
  const response = await axios.get(membershipApi + "/projects/slug/" + slug);
  return response?.data;
};

const billingBankingBillet = async (data) => {
  const response = await axios.post(
    paymentApi + "/billing/bankingbillet",
    data
  );
  return response?.data;
};

const billingCreditCard = async (data) => {
  const response = await axios.post(paymentApi + "/billing/creditcard", data);
  return response?.data;
};

const billingPix = async (data) => {
  const response = await axios.post(paymentApi + "/billing/pix", data);
  return response?.data;
};

const getUserProfileData = async () => {
  const result = await axios.get(membershipApi + "/users/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return result?.data;
};

const getMemberDependents = async (supporterId, projectId) => {
  const params = {
    supporterId,
    projectId,
  };
  const response = await axios.get(membershipApi + "/dependents/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
    params,
  });
  return response?.data;
};

const getDependent = async (dependentId) => {
  const response = await axios.get(
    membershipApi + "/dependents/profile/" + dependentId,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};

const createUser = async (data) => {
  const response = await axios.post(membershipApi + "/users", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

const getUserById = async (id) => {
  const response = await axios.get(apiAuth + "/users/" + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

const updateUserProfileData = async (data) => {
  const response = await axios.put(membershipApi + "/users", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

export const saveDependents = async (dependents) => {
  const response = await axios.post(
    membershipApi + "/dependents/",
    dependents,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response?.data;
};

export const updateDependents = async (dependents) => {
  const response = await axios.put(membershipApi + "/dependents/", dependents);
  return response?.data;
};

export const deleteMemberDependents = async (id) => {
  const response = await axios.delete(membershipApi + "/dependents/" + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

export const searchDependent = async (dependent, projectId) => {
  const params = {
    dependent,
    projectId,
  };
  const response = await axios.get(membershipApi + "/dependents/search/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
    params,
  });
  return response?.data;
};

export const getTxtFile = async (valueFormatted, useTxt) => {
  const params = {
    date: valueFormatted,
    useTxt: useTxt,
  };
  const result = await axios.get(
    paymentApi + "/transactions/finance/" + localStorage.getItem("id_project"),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params,
    }
  );
  return result;
};

export const getValidDates = async () => {
  const result = await axios.get(
    paymentApi +
    "/transactions/finance/dates/" +
    localStorage.getItem("id_project"),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return result?.data;
};

/**
 * Retorna informações do usuário logado
 * @returns Informações do usuário logdo
 */
const getLoggedUserInfo = async () => {
  const result = await axios.get(membershipApi + "/users/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });

  return result;
};

/**
 * Adiciona o projeto ao banco
 * @param {any} projectData Informações do projeto a ser adicionado
 * @returns Resultado
 */
const addProject = async (projectData) => {
  const result = await axios.post(membershipApi + "/projects", projectData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return result;
};

/**
 * Edita o projeto no banco
 * @param {any} projectData Informações do projeto a ser adicionado
 * @returns Resultado
 */
const editProject = async (projectData, projectId) => {
  const result = await axios.put(
    membershipApi + `/projects/${projectId}`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return result;
};

/**
 * Edita todos os templates que tiverem com a flag para usar a logo e background default do projeto
 * @param {any} projectData Informações do projeto para atualizar a logo e background dos templates
 * @returns Resultado
 */
const editPayTransactEmailsColorAndLogo = async (projectData) => {
  const result = await axios.post(
    paymentApi + `/transactional-email/update/color-and-logo`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return result;
};

/**
 * Edita todos os templates que tiverem com a flag para usar a logo e background default do projeto
 * @param {any} projectData Informações do projeto para atualizar a logo e background dos templates
 * @returns Resultado
 */
const editAuthTransactEmailsColorAndLogo = async (projectData, projectId) => {
  const result = await axios.post(
    apiAuth + `/transactional-email/update/color-and-logo`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return result;
};

/**
 * Deleta o projeto no banco
 * @param {number} projectId Id do projeto a ser deletado
 * @returns Resultado
 */
const deleteProject = async (editingProjectId) => {
  const result = await axios.delete(
    membershipApi + `/projects/${editingProjectId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return result;
};

/**
 * Salva uma configuração de e-mail transacional no banco
 * @param {number} projectId Id do projeto que terá essa configuração
 * @param {from: string, replyTo: string} emailConfig Nova configuração de email
 * @returns status da requisição
 */
const saveEmailTemplatesConfig = async (emailConfig) => {
  const result = await axios.post(
    membershipApi + `/transactional-email-config`,
    emailConfig,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  await axios.post(paymentApi + `/transactional-email-config`, emailConfig, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });

  await axios.post(apiAuth + `/transactional-email-config`, emailConfig, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });

  return result;
};

/**
 * Salva uma configuração de e-mail transacional no banco
 * @param {number} projectId Id do projeto que terá essa configuração
 * @param {from: string, replyTo: string} emailConfig Nova configuração de email
 * @returns status da requisição
 */
const editEmailTemplatesConfig = async (emailConfig) => {
  const result = await axios.put(
    membershipApi + `/transactional-email-config`,
    emailConfig,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  await axios.put(paymentApi + `/transactional-email-config`, emailConfig, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });

  await axios.put(apiAuth + `/transactional-email-config`, emailConfig, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });

  return result;
};

/**
 * Salva um template de e-mail transacional novo
 * @param {
 * projectId: string,
 * typeTemplate: string,
 * subject: string,
 * useDefaultLogo: boolean,
 * urlLogo: string,
 * backgroundColor: string,
 * urlBackground: string,
 * templateHtml: string
 * } transactionalEmailData
 * @returns status da requisição
 */
const saveTransactionalEmail = async (transactionalEmailData) => {
  const response = await axios.post(
    membershipApi + `/transactional-email`,
    transactionalEmailData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Edita um template de e-mail transacional existente
 * @param {
 * projectId: string,
 * typeTemplate: string,
 * subject: string,
 * useDefaultLogo: boolean,
 * urlLogo: string,
 * backgroundColor: string,
 * urlBackground: string,
 * templateHtml: string
 * } transactionalEmailData
 * @returns status da requisição
 */
const editTransactionalEmail = async (transactionalEmailData) => {
  const response = await axios.put(
    membershipApi + `/transactional-email`,
    transactionalEmailData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Salva um template de e-mail transacional novo
 * @param {
 * projectId: string,
 * typeTemplate: string,
 * subject: string,
 * useDefaultLogo: boolean,
 * urlLogo: string,
 * backgroundColor: string,
 * urlBackground: string,
 * templateHtml: string
 * } transactionalEmailData
 * @returns status da requisição
 */
const savePaymentsTransactionalEmail = async (transactionalEmailData) => {
  const response = await axios.post(
    paymentApi + `/transactional-email`,
    transactionalEmailData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Edita um template de e-mail transacional existente
 * @param {
 * projectId: string,
 * typeTemplate: string,
 * subject: string,
 * useDefaultLogo: boolean,
 * urlLogo: string,
 * backgroundColor: string,
 * urlBackground: string,
 * templateHtml: string
 * } transactionalEmailData
 * @returns status da requisição
 */
const editPaymentsTransactionalEmail = async (transactionalEmailData) => {
  const response = await axios.put(
    paymentApi + `/transactional-email`,
    transactionalEmailData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Salva um template de e-mail transacional novo
 * @param {
 * projectId: string,
 * typeTemplate: string,
 * subject: string,
 * useDefaultLogo: boolean,
 * urlLogo: string,
 * backgroundColor: string,
 * urlBackground: string,
 * templateHtml: string
 * } transactionalEmailData
 * @returns status da requisição
 */
const saveAuthTransactionalEmail = async (transactionalEmailData) => {
  const response = await axios.post(
    apiAuth + `/transactional-email`,
    transactionalEmailData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Edita um template de e-mail transacional existente
 * @param {
 * projectId: string,
 * typeTemplate: string,
 * subject: string,
 * useDefaultLogo: boolean,
 * urlLogo: string,
 * backgroundColor: string,
 * urlBackground: string,
 * templateHtml: string
 * } transactionalEmailData
 * @returns status da requisição
 */
const editAuthTransactionalEmail = async (transactionalEmailData) => {
  const response = await axios.put(
    apiAuth + `/transactional-email`,
    transactionalEmailData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Busca um transactional e-mail no banco
 * @param {string} projectId
 * @param {string} typeTemplate
 * @returns retorna um objeto transactional e-mail
 */
const getTransactionalEmail = async (projectId, typeTemplate) => {
  const response = axios.get(
    membershipApi +
    `/transactional-email/${projectId}?typeTemplate=${typeTemplate}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Busca um transactional e-mail no banco
 * @param {string} projectId
 * @param {string} typeTemplate
 * @returns retorna um objeto transactional e-mail
 */
const getPaymentsTransactionalEmail = async (projectId, typeTemplate) => {
  const response = axios.get(
    paymentApi +
    `/transactional-email/${projectId}?typeTemplate=${typeTemplate}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Busca um transactional e-mail no banco
 * @param {string} projectId
 * @param {string} typeTemplate
 * @returns retorna um objeto transactional e-mail
 */
const getAuthTransactionalEmail = async (projectId, typeTemplate) => {
  const response = axios.get(
    apiAuth + `/transactional-email/${projectId}?typeTemplate=${typeTemplate}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Envia um e-mail de teste para o usuário logado
 * @param {
 * projectId: string,
 * typeTemplate: string,
 * subject: string,
 * useDefaultLogo: boolean,
 * urlLogo: string,
 * backgroundColor: string,
 * urlBackground: string,
 * templateHtml: string
 * } transactionalEmailData
 * @returns status da requisição
 */
const sendTestTransactionalEmail = async (transactionalEmailData) => {
  const response = await axios.post(
    membershipApi + `/transactional-email/send/test-email`,
    transactionalEmailData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Envia um e-mail de teste para o usuário logado
 * @param {
 * projectId: string,
 * typeTemplate: string,
 * subject: string,
 * useDefaultLogo: boolean,
 * urlLogo: string,
 * backgroundColor: string,
 * urlBackground: string,
 * templateHtml: string
 * } transactionalEmailData
 * @returns status da requisição
 */
const sendPaymentsTestTransactionalEmail = async (transactionalEmailData) => {
  const response = await axios.post(
    paymentApi + `/transactional-email/send/test-email`,
    transactionalEmailData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Envia um e-mail de teste para o usuário logado
 * @param {
 * projectId: string,
 * typeTemplate: string,
 * subject: string,
 * useDefaultLogo: boolean,
 * urlLogo: string,
 * backgroundColor: string,
 * urlBackground: string,
 * templateHtml: string
 * } transactionalEmailData
 * @returns status da requisição
 */
const sendAuthTestTransactionalEmail = async (transactionalEmailData) => {
  const response = await axios.post(
    apiAuth + `/transactional-email/send/test-email`,
    transactionalEmailData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return response;
};

/**
 * Retorrna a configuração de e-mail transacional
 * @param {number} projectId Id do projeto que terá essa configuração
 * @returns status da requisição
 */
const getTransactionalEmailConfig = async (projectId) => {
  const result = await axios.get(
    membershipApi + `/transactional-email-config/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );

  return result;
};

/**
 * Checa se token da pessoa é válida ou não
 * @param {string} Email E-mail a ser enviado o token
 */
const sendRecoveryEmail = async (email, projectId) => {
  const result = await axios.get(
    apiAuth + `/users/passwords/recovery/${email}?projectId=${projectId}`
  );

  return result;
};

/**
 * Checa se token da pessoa é válida ou não
 * @param {{id: number, token: string}} user Informações necessárias
 */
const checkPassResetToken = async (user) => {
  const { id, token } = user;

  const result = await axios.get(
    apiAuth + `/users/passwords/validation/${id}`,
    {
      headers: { "X-token": token },
    }
  );

  return result;
};

/**
 * Troca a senha da pessoa depois de todo o processo
 * @param {{userId: number, token: string, newPassword: string}} fullCredentials Todos os dados do usuário que está tentando mudar
 * @returns Status da requisição
 */
const changeUserPassword = async (fullCredentials) => {
  // Retira informação desnecessária do objeto
  const parsed = {
    userId: fullCredentials.userId,
    password: fullCredentials.newPassword,
  };

  const result = await axios.put(apiAuth + "/users/passwords/change", parsed, {
    headers: { "X-token": fullCredentials.token },
  });

  return result;
};

/**
 * Checa se a token é válida ou não
 * @param {string} token A token
 */
const isUserTokenExpired = async (token) => {
  const result = await axios.get(apiAuth + `/auth/validation/check`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};

/**
 * Busca informações de um projeto específico
 * @param {number} projectId Id do projeto
 * @returns Informações do projeto
 */
const getProjectData = async (projectId) => {
  const result = await axios.get(membershipApi + `/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return result;
};

/**
 * Busca as informacoes das transações com base nos filtros passados para a função
 *
 * @param {*} objectDateFilter
 * @param {*} selectedFiltersState
 * @returns
 */
const getReportTransactions = async (
  objectDateFilter,
  selectedFiltersState,
  searchContent,
  currentPage
) => {
  const size = 20;
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);
  const initial = start_date.toJSON().split("T")[0].split("-");
  const final = end_date.toJSON().split("T")[0].split("-");
  let paymentMethods = [];
  let paymentTypes = [];
  let paymentStatus = [];

  selectedFiltersState?.forEach((filter) => {
    if (filter.keyPdf === "payment_methods[]")
      paymentMethods.push(filter.value);
    if (filter.keyPdf === "payment_types[]" && filter.value === "true")
      paymentTypes.push("true");
    if (filter.keyPdf === "payment_types[]" && filter.value === "false")
      paymentTypes.push("false");
    if (filter.keyPdf === "status[]") paymentStatus.push(filter.value);
  });

  if (paymentMethods.length === 0)
    paymentMethods = ["credit_card", "banking_billet", "pix", "direct_payment"];
  if (paymentTypes.length === 0 || paymentTypes.length === 2)
    paymentTypes = ["withoutPaymentTypes"];

  if (paymentStatus.length === 0) paymentStatus = ["CO", "PE", "CA", "VE"];

  const result = await axios.get(paymentApi + `/report/`, {
    params: {
      initialDate: `${initial[2]}/${initial[1]}/${initial[0]}`,
      finalDate: `${final[2]}/${final[1]}/${final[0]}`,
      projectId: localStorage.getItem("id_project"),
      paymentForms: paymentMethods,
      useIR: paymentTypes,
      status: paymentStatus,
      page: currentPage,
      take: size,
      search: searchContent,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return result;
};

/**
 * Gera o download de um relatorio blob em pdf com base nos filtros passados
 *
 * @param {*} objectDateFilter
 * @param {*} selectedFiltersState
 */
const getUrlPdf = async (
  objectDateFilter,
  selectedFiltersState,
  searchContent
) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);
  const initial = start_date.toJSON().split("T")[0].split("-");
  const final = end_date.toJSON().split("T")[0].split("-");
  let paymentMethods = [];
  let paymentTypes = [];
  let paymentStatus = [];

  selectedFiltersState?.forEach((filter) => {
    if (filter.keyPdf === "payment_methods[]")
      paymentMethods.push(filter.value);
    if (filter.keyPdf === "payment_types[]" && filter.value === "true")
      paymentTypes.push("true");
    if (filter.keyPdf === "payment_types[]" && filter.value === "false")
      paymentTypes.push("false");
    if (filter.keyPdf === "status[]") paymentStatus.push(filter.value);
  });

  if (paymentMethods.length === 0)
    paymentMethods = ["credit_card", "banking_billet", "pix", "direct_payment"];
  if (paymentTypes.length === 0 || paymentTypes.length === 2)
    paymentTypes = ["withoutPaymentTypes"];
  if (paymentStatus.length === 0) paymentStatus = ["CO", "PE", "CA"];

  await axios
    .get(paymentApi + `/report/pdf`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: {
        initialDate: `${initial[2]}/${initial[1]}/${initial[0]}`,
        finalDate: `${final[2]}/${final[1]}/${final[0]}`,
        projectId: localStorage.getItem("id_project"),
        paymentForms: paymentMethods,
        useIR: paymentTypes,
        status: paymentStatus,
        search: searchContent,
      },
      responseType: "blob",
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * Gera o download de um arquivo xlsx de acordo com os filtros passados
 *
 * @param {*} objectDateFilter
 * @param {*} selectedFiltersState
 */
const getUrlExcell = async (
  objectDateFilter,
  selectedFiltersState,
  searchContent
) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);
  const initial = start_date.toJSON().split("T")[0].split("-");
  const final = end_date.toJSON().split("T")[0].split("-");
  let paymentMethods = [];
  let paymentTypes = [];
  let paymentStatus = [];

  selectedFiltersState?.forEach((filter) => {
    if (filter.keyPdf === "payment_methods[]")
      paymentMethods.push(filter.value);
    if (filter.keyPdf === "payment_types[]" && filter.value === "true")
      paymentTypes.push("true");
    if (filter.keyPdf === "payment_types[]" && filter.value === "false")
      paymentTypes.push("false");
    if (filter.keyPdf === "status[]") paymentStatus.push(filter.value);
  });

  if (paymentMethods.length === 0)
    paymentMethods = ["credit_card", "banking_billet", "pix", "direct_payment"];
  if (paymentTypes.length === 0 || paymentTypes.length === 2)
    paymentTypes = ["withoutPaymentTypes"];
  if (paymentStatus.length === 0) paymentStatus = ["CO", "PE", "CA"];

  await axios
    .get(paymentApi + `/report/xlsx`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: {
        initialDate: `${initial[2]}/${initial[1]}/${initial[0]}`,
        finalDate: `${final[2]}/${final[1]}/${final[0]}`,
        projectId: localStorage.getItem("id_project"),
        paymentForms: paymentMethods,
        useIR: paymentTypes,
        status: paymentStatus,
        search: searchContent,
      },
      responseType: "blob",
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.xlsx");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * Retorna informações de endereço pelo CEP
 * @param {number} CEP Cep fornecido
 */
const getAddressByCEP = async (CEP) => {
  if (CEP.length !== 9) return;

  const result = await axios.get(
    membershipApi + `/address-manager/cep/${CEP}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return result;
};

/**
 * Pega as informações bancarias de um projeto
 * @param {string} projectId Id do projeto
 * @param {boolean} isIr Filtra a conta bancaria a partir se é ir ou não
 * @returns Resultado
 */
const getBankData = async (projectId, isIr) => {
  const result = await axios.get(
    paymentApi + "/bank-details/" + projectId + `?isIr=${isIr}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return result;
};

/**
 * Pega informações da conta do banco do projeto
 * @param {number} projectId Id do projeto
 * @param {boolean} isIr Se o projeto tem I.R ou não
 * @returns
 */
const getBankDetails = async (projectId, isIr) => {
  const result = await axios.get(
    paymentApi + `/bank-details/${projectId}?isIr=${isIr}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return result;
};

/**
 * Pega informações de saque do projeto
 * @param {number} projectId Id do projeto
 * @param {boolean} isIr Se o projeto tem I.R ou não
 * @param {boolean} isBlocked Se o saldo que estamos pegando é bloqueado ou não
 */
const getWithdrawData = async (projectId, isIr, isBlocked) => {
  const format = "DD/MM/YYYY";
  const dates = {
    startDate: isBlocked
      ? moment(Date.now()).subtract(30, "days").format(format)
      : moment(INITIAL_DATE).format(format),
    endDate: isBlocked
      ? moment(Date.now()).add(1, "days").format(format)
      : moment(Date.now()).subtract(30, "days").format(format),
  };

  const result = await axios.get(
    paymentApi +
    `/withdraw/${projectId}?isIr=${isIr}&startDate=${dates.startDate}&endDate=${dates.endDate}&isBlocked=${isBlocked}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return result;
};

/**
 * Busca as informacoes das transações para a tela de saque
 *
 * @param {boolean} isIr Se o projeto tem I.R
 * @param {boolean} isBlocked Se é bloqueado
 * @param {number} currentPage Página atual
 * @param {any} objectDateFilter Objeto de filtro de data
 */
const getWithdrawTransactions = async (
  isIr,
  isBlocked,
  currentPage,
  objectDateFilter
) => {
  const size = 20;

  // Se object date filter não for undefined
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);

  const initial = start_date.toJSON().split("T")[0].split("-");
  const final = end_date.toJSON().split("T")[0].split("-");

  const result = await axios.get(paymentApi + `/report/finances/`, {
    params: {
      initialDate: `${initial[2]}/${initial[1]}/${initial[0]}`,
      finalDate: `${final[2]}/${final[1]}/${final[0]}`,
      projectId: localStorage.getItem("id_project"),
      paymentForms: ["credit_card", "banking_billet", "pix"],
      useIR: isIr ? "true" : "false",
      isBlocked: isBlocked ? "true" : "false",
      status: ["CO"],
      page: currentPage,
      take: size,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return result;
};

/**
 * Busca as informacoes dos saques para a tela de saque
 *
 * @param {boolean} isIr Se o projeto tem I.R
 * @param {boolean} isBlocked Se é bloqueado ou liberado
 * @param {number} currentPage Página atual
 * @param {any} objectDateFilter Objeto de filtro de data
 * @returns
 */
const getWithdrawWithdrawals = async (isIr, currentPage, objectDateFilter) => {
  const size = 20;

  // Se object date filter não for undefined
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);

  const initial = start_date.toJSON().split("T")[0].split("-");
  const final = end_date.toJSON().split("T")[0].split("-");

  const result = await axios.get(paymentApi + `/withdraw`, {
    params: {
      startDate: `${initial[2]}/${initial[1]}/${initial[0]}`,
      endDate: `${final[2]}/${final[1]}/${final[0]}`,
      projectId: localStorage.getItem("id_project"),
      paymentForms: ["credit_card", "banking_billet", "pix"],
      isIr: isIr ? "true" : "false",
      useIR: [isIr ? "true" : "false"],
      status: ["CO"],
      page: currentPage,
      take: size,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return result;
};

/**
 * Adiciona uma conta bancaria
 * @param {any} bankDetails Informações da conta bancaria a ser adicionada
 * @returns Resultado
 */
const createBankData = async (bankDetails) => {
  const result = await axios.post(paymentApi + "/bank-details/", bankDetails, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return result;
};

/**
 * Atualiza uma conta bancaria
 * @param {string} bankId Id da conta bancaria
 * @param {any} bankDetails Informações da conta bancaria a ser atualizada
 * @returns Resultado
 */
const updateBankData = async (bankId, bankDetails) => {
  const result = await axios.put(
    paymentApi + "/bank-details/" + bankId,
    bankDetails,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return result;
};

/**
 * Procede com a intenção do saque
 * @param {any} data Dados do saque
 */
const proccessWithdraw = async (data) => {
  const response = await axios.post(paymentApi + "/withdraw", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return response?.data;
};

/**
 * Busca as informacoes das transações bloqueadas para a tela
 * @param {any} objectDateFilter Objeto do filtro
 * @param {boolean} isIr Se o projeto tem I.R
 * @param {boolean} isBlocked Se é bloqueado ou liberado
 * @param {number} currentPage Página atual
 * @returns
 */
const getBlockedTransactions = async (
  objectDateFilter,
  isIr,
  isBlocked,
  currentPage
) => {
  const size = 20;

  /*const dates = {
    startDate: isBlocked ? moment(Date.now()).subtract(30, "days").format(format) : moment(new Date('01/01/2015')).format(format),
    endDate: isBlocked ? moment(Date.now()).add(1, "days").format(format) : moment(Date.now()).subtract(30, "days").format(format)
  }*/

  const { start_date, end_date } = await getStartEndDate(objectDateFilter);

  const initial = start_date.toJSON().split("T")[0].split("-");
  const final = end_date.toJSON().split("T")[0].split("-");

  const initialParsed = `${initial[2]}/${initial[1]}/${initial[0]}`;

  const result = await axios.get(paymentApi + `/report/finances`, {
    params: {
      initialDate:
        initialParsed.includes('2000')
          ? moment(Date.now()).subtract(30, "days").format("DD/MM/YYYY")
          : `${initial[2]}/${initial[1]}/${initial[0]}`,
      finalDate: `${final[2]}/${final[1]}/${final[0]}`,
      projectId: localStorage.getItem("id_project"),
      paymentForms: ["credit_card", "banking_billet", "pix"],
      useIR: isIr ? "true" : "false",
      isBlocked: isBlocked ? "true" : "false",
      status: ["CO"],
      page: currentPage,
      take: size,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
  return result;
};

/**
 * Gera o download de um relatorio blob em pdf com base nos filtros passados
 *
 * @param {any} objectDateFilter Objeto do filtro
 * @param {boolean} isIr Se o projeto tem I.R
 * @param {boolean} isBlocked Se é bloqueado ou não
 */
const getUrlPdfWithdraw = async (objectDateFilter, isIr, isBlocked) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);

  const initial = start_date.toJSON().split("T")[0].split("-");
  const final = end_date.toJSON().split("T")[0].split("-");

  await axios
    .get(paymentApi + `/report/finantial/pdf`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: {
        initialDate: `${initial[2]}/${initial[1]}/${initial[0]}`,
        finalDate: `${final[2]}/${final[1]}/${final[0]}`,
        projectId: localStorage.getItem("id_project"),
        paymentForms: ["credit_card", "banking_billet", "pix"],
        useIR: isIr ? "true" : "false",
        isBlocked: isBlocked ? "true" : "false",
        status: ["CO"],
      },
      responseType: "blob",
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * Gera o download de um arquivo xlsx de acordo com os filtros passados
 *
 * @param {any} objectDateFilter Objeto do filtro
 * @param {boolean} isIr Se o projeto tem I.R
 * @param {boolean} isBlocked Se é bloqueado ou não
 */
const getUrlExcellWithdraw = async (objectDateFilter, isIr, isBlocked) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);

  const initial = start_date.toJSON().split("T")[0].split("-");
  const final = end_date.toJSON().split("T")[0].split("-");

  await axios
    .get(paymentApi + `/report/finantial/xlsx`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: {
        initialDate: `${initial[2]}/${initial[1]}/${initial[0]}`,
        finalDate: `${final[2]}/${final[1]}/${final[0]}`,
        projectId: localStorage.getItem("id_project"),
        paymentForms: ["credit_card", "banking_billet", "pix"],
        useIR: isIr ? "true" : "false",
        isBlocked: isBlocked ? "true" : "false",
        status: ["CO"],
      },
      responseType: "blob",
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.xlsx");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * Assinaturas
 * Gera o download de um arquivo xlsx de acordo com os filtros passados
 *
 * @param {any} objectDateFilter Objeto de filtro de data
 * @param {any} selectedFiltersState Array de filtros
 */
const getUrlExcellSubscriptions = async (
  objectDateFilter,
  selectedFiltersState,
  searchContent
) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);
  // const initial = start_date.toJSON().split("T")[0].split("-");
  // const final = end_date.toJSON().split("T")[0].split("-");
  let status = [];
  let plans = [];

  selectedFiltersState?.forEach((filter) => {
    if (filter.keyPdf === "status[]") status.push(filter.value);
    if (filter.keyPdf === "plans[]") plans.push(filter.value);
  });

  if (status.length === 0) status = ["active", "pending", "inactive", "closed"];

  await axios
    .get(membershipApi + `/membership-report/supporters-xlsx`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: {
        start_date: start_date.toJSON().split("T")[0],
        end_date: end_date.toJSON().split("T")[0],
        projectId: localStorage.getItem("id_project"),
        groupBy: "DESC",
        status: status,
        plans: plans,
        search: searchContent,
      },
      responseType: "blob",
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.xlsx");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * Usuários
 * Gera o download de um arquivo xlsx de acordo com os filtros passados
 *
 * @param {any} objectDateFilter Objeto de filtro de data
 * @param {any} selectedFiltersState Array de filtros
 */
const getUrlExcellUsers = async (
  objectDateFilter,
  selectedFiltersState,
  searchContent
) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);
  // const initial = start_date.toJSON().split("T")[0].split("-");
  // const final = end_date.toJSON().split("T")[0].split("-");
  let status = [];
  let plans = [];

  selectedFiltersState?.forEach((filter) => {
    if (filter.keyPdf === "status[]") status.push(filter.value);
    if (filter.keyPdf === "plans[]") plans.push(filter.value);
  });

  if (status.length === 0) status = ["active", "pending", "inactive", "closed"];

  await axios
    .get(membershipApi + `/membership-report/users-xlsx`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: {
        start_date: start_date.toJSON().split("T")[0],
        end_date: end_date.toJSON().split("T")[0],
        projectId: localStorage.getItem("id_project"),
        groupBy: "DESC",
        //status: status,
        //plans: plans,
        search: searchContent,
      },
      responseType: "blob",
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.xlsx");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * Usuários
 * Gera o download de um arquivo PDF de acordo com os filtros passados
 *
 * @param {any} objectDateFilter Objeto de filtro de data
 * @param {any} selectedFiltersState Array de filtros
 */
const getUrlPDFUsers = async (
  objectDateFilter,
  selectedFiltersState,
  searchContent
) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);
  // const initial = start_date.toJSON().split("T")[0].split("-");
  // const final = end_date.toJSON().split("T")[0].split("-");
  let status = [];
  let plans = [];

  selectedFiltersState?.forEach((filter) => {
    if (filter.keyPdf === "status[]") status.push(filter.value);
    if (filter.keyPdf === "plans[]") plans.push(filter.value);
  });

  if (status.length === 0) status = ["active", "pending", "inactive", "closed"];

  await axios
    .get(membershipApi + `/membership-report/users-pdf`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: {
        start_date: start_date.toJSON().split("T")[0],
        end_date: end_date.toJSON().split("T")[0],
        projectId: localStorage.getItem("id_project"),
        groupBy: "DESC",
        //status: status,
        //plans: plans,
        search: searchContent,
      },
      responseType: "blob",
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * Busca todos os emails de newsletter do usuario logado, para este projeto
 *
 * @param {string} projectId id do projeto
 * @returns {Promise<AxiosResponse<any>>}
 */
const getNewsletterEmails = async (projectId) => {
  const response = await axios.get(
    membershipApi + `/news-email?projectId=${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
  return response;
};

/**
 * Envia um email de Newsletter/Atualização
 *
 * @param id id do template de email
 * @param projectId id do projeto
 * @returns {Promise<AxiosResponse<any>>}
 */
const sendNewsletterEmail = async ({ id, projectId }) => {
  return await axios.post(
    membershipApi + `/news-email/send/${id}?projectId=${projectId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
};

/**
 * Duplica um email de Newsletter/Atualização já existente
 *
 * @param {any} email Email a ser duplicado
 * @returns {Promise<AxiosResponse<any>>}
 */
const duplicateNewsletterEmail = async (email) => {
  const { id } = email;
  return await axios.post(
    membershipApi + `/news-email/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
};

/**
 * Deleta um e-mail de Newsletter/Atualização
 *
 * @param {any} email Email a ser duplicado
 * @returns {Promise<AxiosResponse<any>>}
 */
const deleteNewsletterEmail = async (email) => {
  const { id } = email;
  return await axios.delete(membershipApi + `/news-email/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
};

/**
 * Pega informação do último apoio & plano do usuário pelo id
 * @param userId Id do usuário
 */
const getLastSupport = async (userId, projectId) => {
  return await axios.get(
    membershipApi + `/projects/transactions/last-support/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: {
        projectId: projectId,
      },
    }
  );
};

/**
 * Busca um email de newsletter pelo id
 *
 * @param {string} emailId Id do email de newsletter
 */
const getNewsletterEmail = async (emailId) => {
  return axios.get(membershipApi + `/news-email/${emailId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
};

/**
 * Deleta o anexo de um email de newsletter pelo id do anexo
 *
 * @param {string} id Id do anexo do email de newsletter
 */
const deleteNewsletterEmailAttachment = async (id) => {
  return axios.delete(
    membershipApi + `/news-email/news-email-attachment/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    }
  );
};

/**
 * Salva um email de Newsletter/Atualização
 *
 * @param emailData Email de Newsletter a ser salvo
 * @returns {Promise<AxiosResponse<any>>}
 */
const saveNewsletterEmail = async (emailData) => {
  delete emailData.id;
  return await axios.post(membershipApi + `/news-email`, emailData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
};

/**
 * Atualiza um email de Newsletter/Atualização
 *
 * @param emailData Email de Newsletter a ser atualizado
 * @returns {Promise<AxiosResponse<any>>}
 */
const updateNewsletterEmail = async (emailData) => {
  const id = emailData.get("id");
  return await axios.put(membershipApi + `/news-email/${id}`, emailData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    },
  });
};

/**
 * Obtém todos os usuários de um determinado projeto
 * @param {number} project_id Id do projeto
 * @param {any} objectDateFilter Objeto de filtro de data
 * @param {any} searchContent Conteúdo de busca
 * @param {number} currentPage Pagina atual
 * @param {any} selectedFiltersState Estado dos filtros selecionados
 */
const getAllUsersProject = async (
  project_id,
  objectDateFilter,
  searchContent,
  currentPage,
  selectedFiltersState
) => {
  const { start_date, end_date } = await getStartEndDate(objectDateFilter);

  let dict_filter = {};

  dict_filter["start_date"] = start_date.toJSON().split("T")[0];
  dict_filter["end_date"] = end_date.toJSON().split("T")[0];

  dict_filter["search"] = searchContent;

  /*let status = [];

  selectedFiltersState?.forEach((filter) => {
    if (filter.keyPdf === "status[]") status.push(filter.value);
  });*/

  //if (status.length === 0) status = ["active", "inactive", "pending", "closed"];

  // Se receber -1 da função, busca todos os dados sem paginação
  if (currentPage !== -1) {
    dict_filter["page"] = currentPage;
  } else {
    dict_filter["no_page"] = "";
  }

  //dict_filter["status"] = status;

  dict_filter["groupBy"] = "DESC";
  dict_filter["size"] = 20;

  const result = await axios.get(
    membershipApi + `/projects/users/` + project_id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
      params: dict_filter,
    }
  );
  return result?.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  postDirectRegistration,
  postUserExistsDirectRegistration,
  getTransaction,
  getUserByDocument,
  getReportTransactions,
  createCheckIn,
  getOneCheckIn,
  getCheckIns,
  getAllCheckIns,
  getAllCheckInsCollaborator,
  getAllStaffMembers,
  getStaffInfo,
  createPlan,
  updatePlan,
  deletePlan,
  getPlan,
  getPlans,
  getActivePlans,
  getPlanSupporters,
  getCard,
  getDependentCard,
  getTransactions,
  updateTransactions,
  getUserProfileData,
  updateUserProfileData,
  getMemberDependents,
  getValidateProject,
  getPaymentData,
  getTxtFile,
  getValidDates,
  getAllSupportersProject,
  getProjectsUser,
  getUserProject,
  deleteMemberDependents,
  getDependent,
  searchDependent,
  billingBankingBillet,
  billingCreditCard,
  billingPix,
  createSupporter,
  getSupporter,
  sendRecoveryEmail,
  checkPassResetToken,
  changeUserPassword,
  deleteCollaborator,
  createCollaborator,
  createUser,
  findUserEmail,
  getLoggedUserInfo,
  getAllProjects,
  addProject,
  getUserById,
  getProjectData,
  editProject,
  deleteProject,
  createSupporterInProject,
  getSlugProject,
  getUrlPdf,
  getUrlExcell,
  getAddressByCEP,
  getBankData,
  createBankData,
  updateBankData,
  isUserTokenExpired,
  getBankDetails,
  getWithdrawData,
  getWithdrawTransactions,
  proccessWithdraw,
  getBlockedTransactions,
  getWithdrawWithdrawals,
  getTransactionalEmailConfig,
  saveEmailTemplatesConfig,
  editEmailTemplatesConfig,
  saveTransactionalEmail,
  getTransactionalEmail,
  sendTestTransactionalEmail,
  savePaymentsTransactionalEmail,
  sendPaymentsTestTransactionalEmail,
  saveAuthTransactionalEmail,
  sendAuthTestTransactionalEmail,
  getPaymentsTransactionalEmail,
  getAuthTransactionalEmail,
  editPayTransactEmailsColorAndLogo,
  editAuthTransactEmailsColorAndLogo,
  editTransactionalEmail,
  editPaymentsTransactionalEmail,
  editAuthTransactionalEmail,
  getUrlPdfWithdraw,
  getUrlExcellWithdraw,
  getUrlExcellSubscriptions,
  getNewsletterEmails,
  sendNewsletterEmail,
  duplicateNewsletterEmail,
  getNewsletterEmail,
  saveNewsletterEmail,
  updateNewsletterEmail,
  deleteNewsletterEmail,
  deleteNewsletterEmailAttachment,
  getLastSupport,
  updateSupporter,
  getAllUsersProject,
  updateCollaborator,
  getUrlExcellUsers,
  getUrlPDFUsers,
};
