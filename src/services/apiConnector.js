// import axios from "axios";

// export const axioxInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers, params) => {
//   return axioxInstance({
//     method: `${method}`,
//     url: `${url}`,
//     data: bodyData ? bodyData : null,
//     headers: headers ? headers : null,
//     params: params ? params : null,
//   });
// };

import axios from "axios";

// ✅ create axios instance with baseURL from .env
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,  // e.g., http://localhost:4000/api/v1
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,
    url: url, // will be appended to baseURL
    data: bodyData || null,
    headers: headers || null,
    params: params || null,
  });
};

