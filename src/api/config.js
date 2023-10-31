import { getEnvVariables } from "../helpers/getEnvVariables";
import axios from "axios";

//** Conf **/

const { VITE_API_URL } = getEnvVariables();

//Token
const sessionToken = "";

//API URL
const baseURL = `${VITE_API_URL}/`;
//TokenHeaders
const baseTokenHeaders = {
  Authorization: `Bearer ${sessionToken}`,
};

//#region "Fetch"

//AppJsonTokenHeaders
const baseFetchJsonTokenHeaders = {
  "Content-Type": "application/json",
  ...baseTokenHeaders,
};

//AppFormDataTokenHeaders
const baseFetchFormDataTokenHeaders = {
  ...baseTokenHeaders,
};

//#endregion "End fetch"

//#region AXIOS

//AxiosHeaderBase
//JSON
const baseAxiosJsonHeaders = {
  headers: {
    ...baseTokenHeaders,
  },
};

const getBaseAxiosJsonHeaders = () => {
  if (sessionToken !== "") {
    return {
      headers: {
        ...baseTokenHeaders,
      },
    };
  } else {
  }
};

//FORMDATA
const baseAxiosFormDataHeaders = {
  headers: {
    ...baseTokenHeaders,
    "Content-Type": "multipart/form-data",
  },
};

const getBaseAxiosFormDataHeaders = () => {
  return {
    headers: {
      ...baseTokenHeaders,
      "Content-Type": "multipart/form-data",
    },
  };
};

//#endregion AXIOS

//** Exports variables **/
export const token = `Bearer ${sessionToken}`;
export const url = baseURL;

//Fetch Headers
export const FetchJsonTokenHeaders = baseFetchJsonTokenHeaders;
export const FetchFormDataTokenHeaders = baseFetchFormDataTokenHeaders;

//Axios Headers
export const AxiosJsonHeaders = baseAxiosJsonHeaders;
export const AxiosFormDataHeaders = baseAxiosFormDataHeaders;

//Only Token Header
export const TokenHeaders = baseTokenHeaders;

//** Exports Functions **/
export const getUrl = (inUrl) => `${baseURL}${inUrl}`;

console.log("baseURL", baseURL);

export const InjectTokenHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const MAxios = () => {
  const axiosCreated = axios.create({
    baseURL,
    ...getBaseAxiosJsonHeaders(),
  });
  return axiosCreated;
};

export const MAxiosFormData = () => {
  const axiosCreated = axios.create({
    baseURL,
    ...getBaseAxiosFormDataHeaders(),
  });
  return axiosCreated;
};

// export const FetchDownloadFile = async (endpoint, data, fileName, token) => {

//   const respuesta = await
//    fetch(url + endpoint, {
//     method: "POST",
//     headers: {
//       Authorization: token,
//     },
//     body: data,
//   })
//   if(respuesta.status === 200){

//     var resp = await respuesta.blob()
//       if (
//         resp.size === 0 ||
//         resp.type === "text/plain" ||
//         resp.type === ""
//       ) {
//         return(false);
//       } else {
//         let url = window.URL.createObjectURL(resp);
//         let a = document.createElement("a");
//         a.href = url;
//         a.download = fileName;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         return(true)
//       }
//     }
// };
