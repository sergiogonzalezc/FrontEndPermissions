import { MAxios, MAxiosFormData } from "./config";
import { getEnvVariables } from "../helpers";

export const GetPermissionData = async () => {
  try {
    console.log("init call api Permission List");
    const response = await GetPermissionDataAxxios(null);

    //console.log("data Ok1|!", response);

    if (response.success) {
      // correct load
      const permissionList = response.dataList.map((permissionItem) => ({
        id: permissionItem.id,
        nombreEmpleado: permissionItem.nombreEmpleado,
        apellidoEmpleado: permissionItem.apellidoEmpleado,
        tipoPermisoCode: permissionItem.tipoPermisoCode,
        tipoPermisoDesc: permissionItem.tipoPermisoDesc,
        fechaPermiso: permissionItem.fechaPermiso,
      }));

      console.log("data Ok ", permissionList.length);

      return permissionList;
    } else {
      return {
        ok: false,
        errorMessage: response.message,
        code: response.code,
        status: response.status,
      };
    }
  } catch (error) {
    console.log("error_calling Maxios", error);
    return { ok: false, code: "500", errorMessage: error.message }; // error de llamado a api
  }
};

export const GetPermissionDataAxxios = async (token) => {
  const { VITE_API_URL } = getEnvVariables();

  const endpoint = `${VITE_API_URL}/Permissions/GetPermissions`;

  // const tokenHeader = token ? InjectTokenHeader(token) : {};
  // let formData = new FormData();
  // formData.append("email", email);
  // formData.append("pass", pass);

  return await MAxios()
    //.post(endpoint, formData, tokenHeader)
    .get(endpoint)
    .then((res) => res.data)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Api_error", error.response.data);
        console.log("Api_error", error.response.status);
        console.log("Api_error", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Api_error", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Api Error Axios", error.message);
      }
      console.log(error.config);
    });
};

export const GetPermissionByIdData = async (id) => {
  try {
    console.log("init call api Permission");
    const response = await GetPermissionByIdDataAxxios(null, id);

    if (response.success) {
      // correct load
      console.log("data permission id Ok", id, response.data.length);

      return response.data;
    } else {
      return {
        ok: false,
        errorMessage: response.message,
        code: response.code,
        status: response.status,
      };
    }
  } catch (error) {
    console.log("error_calling Maxios", error);
    return { ok: false, code: "500", errorMessage: error.message }; // error de llamado a api
  }
};

export const GetPermissionByIdDataAxxios = async (token, id) => {
  const { VITE_API_URL } = getEnvVariables();

  const endpoint = `${VITE_API_URL}/Permissions/GetPermissionById?id=${id}`;

  // const tokenHeader = token ? InjectTokenHeader(token) : {};

  return await MAxios()
    //.post(endpoint, formData, tokenHeader)
    .get(endpoint)
    .then((res) => res.data)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Api_error", error.response.data);
        console.log("Api_error", error.response.status);
        console.log("Api_error", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Api_error", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Api Error Axios", error.message);
      }
      console.log(error.config);
    });
};

export const ModifyPermissionData = async (inputData) => {
  try {
    //console.log("init call api Permission by Id", inputData.Id);
    const response = await ModifyPermissionDataAxxios(null, inputData);
    return response;
  } catch (error) {
    console.log("error_calling Maxios", error);
    return { ok: false, code: "500", errorMessage: error.message }; // error de llamado a api
  }
};

export const ModifyPermissionDataAxxios = async (token, inputData) => {
  const { VITE_API_URL } = getEnvVariables();

  const endpoint = `${VITE_API_URL}/Permissions/ModifyPermission`;

  // const tokenHeader = token ? InjectTokenHeader(token) : {};
  // let formData = new FormData();
  // formData.append("id", inputData.Id);
  // formData.append("nombreEmpleado", inputData.NombreEmpleado);
  // formData.append("apellidoEmpleado", inputData.ApellidoEmpleado);
  // formData.append("tipoPermiso", inputData.TipoPermiso);
  // formData.append("fechaPermiso", inputData.FechaPermiso);

  return await MAxios()
    .put(endpoint, inputData)
    .then((res) => res.data)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Api_error", error.response.data);
        console.log("Api_error", error.response.status);
        console.log("Api_error", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Api_error modify", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Api Error Axios modify", error.message);
      }
      console.log(error.config);
    });
};

export const GetAllPermissionTypesData = async () => {
  try {
    const response = await GetAllPermissionTypesDataAxxios(null);

    if (response.success) {
      // correct load
      const permissionListTypes = response.dataList.map((permissionItem) => ({
        id: permissionItem.id,
        descripcion: permissionItem.descripcion,
      }));

      return permissionListTypes;
    } else {
      return {
        ok: false,
        errorMessage: response.message,
        code: response.code,
        status: response.status,
      };
    }
  } catch (error) {
    console.log("error_calling Maxios", error);
    return { ok: false, code: "500", errorMessage: error.message }; // error de llamado a api
  }
};

export const GetAllPermissionTypesDataAxxios = async (token) => {
  const { VITE_API_URL } = getEnvVariables();

  const endpoint = `${VITE_API_URL}/Permissions/GetPermissionTypes`;

  // const tokenHeader = token ? InjectTokenHeader(token) : {};
  //  let formData = new FormData();
  //  formData.append("email", nombreEmpleado);
  //  formData.append("pass", apellidoEmpleado);
  //  formData.append("pass", apellidoEmpleado);
  //  formData.append("pass", apellidoEmpleado);

  return await MAxios()
    .get(endpoint)
    .then((res) => res.data)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Api_error", error.response.data);
        console.log("Api_error", error.response.status);
        console.log("Api_error", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Api_error", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Api Error Axios", error.message);
      }
      console.log(error.config);
    });
};



export const GetAllPermissionTypeByIdData = async (id) => {
  try {
    const responseTypeItem = await GetAllPermissionTypeByIdDataAxxios(null,id);

    if (responseTypeItem.success) {
      // correct load
      return responseTypeItem.data;

    } else {
      return {
        ok: false,
        errorMessage: responseTypeItem.message,
        code: responseTypeItem.code,
        status: responseTypeItem.status,
      };
    }
  } catch (error) {
    console.log("error_calling Maxios", error);
    return { ok: false, code: "500", errorMessage: error.message }; // error de llamado a api
  }
};

export const GetAllPermissionTypeByIdDataAxxios = async (token, id) => {
  const { VITE_API_URL } = getEnvVariables();

  const endpoint = `${VITE_API_URL}/Permissions/GetPermissionTypeById?id=${id}`;

  // const tokenHeader = token ? InjectTokenHeader(token) : {};

  return await MAxios()
    .get(endpoint)
    .then((res) => res.data)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Api_error", error.response.data);
        console.log("Api_error", error.response.status);
        console.log("Api_error", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Api_error", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Api Error Axios", error.message);
      }
      console.log(error.config);
    });
};


export const RequestPermissionData = async ( inputData) => {
  try {
    const response = await RequestPermissionDataAxxios(null,inputData);

    return response;
  } catch (error) {
    console.log("error_calling Maxios", error);
    return { ok: false, code: "500", errorMessage: error.message }; // error de llamado a api
  }
};

export const RequestPermissionDataAxxios = async (token,inputData) => {
  const { VITE_API_URL } = getEnvVariables();

  const endpoint = `${VITE_API_URL}/Permissions/RequestPermission`;

  // const tokenHeader = token ? InjectTokenHeader(token) : {};
  //console.log("inputData Maxios", inputData);
  return await MAxios()
    .post(endpoint, inputData)
    .then((res) => res.data)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Api_error", error.response.data);
        console.log("Api_error", error.response.status);
        console.log("Api_error", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Api_error", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Api Error Axios", error.message);
      }
      console.log(error.config);
    });
};


export const CreateNewPermissionData = async (inputData) => {
  try {    
    const response = await CreateNewPermissionDataAxxios(null, inputData);
    return response;
  } catch (error) {
    console.log("error_calling Maxios", error);
    return { ok: false, code: "500", errorMessage: error.message }; // error de llamado a api
  }
};

export const CreateNewPermissionDataAxxios = async (token, inputData) => {
  const { VITE_API_URL } = getEnvVariables();

  const endpoint = `${VITE_API_URL}/Permissions/InsertNewPermission`;

  // const tokenHeader = token ? InjectTokenHeader(token) : {};

  return await MAxios()
    .post(endpoint, inputData)
    .then((res) => res.data)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Api_error", error.response.data);
        console.log("Api_error", error.response.status);
        console.log("Api_error", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Api_error modify", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Api Error Axios modify", error.message);
      }
      console.log(error.config);
    });
};

const ApiAccessData = {
  GetPermissionData,
  GetPermissionByIdData,
  ModifyPermissionData,
  GetAllPermissionTypesData,
  GetAllPermissionTypeByIdData,
  RequestPermissionData,
  CreateNewPermissionData
};

export default ApiAccessData;
