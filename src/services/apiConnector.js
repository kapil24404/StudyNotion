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

// import axios from "axios";

// // ✅ create axios instance with baseURL from .env
// export const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,  // e.g., http://localhost:4000/api/v1
// });

// export const apiConnector = (method, url, bodyData, headers, params) => {
//   return axiosInstance({
//     method: method,
//     url: url, // will be appended to baseURL
//     data: bodyData || null,
//     headers: headers || null,
//     params: params || null,
//   });
// };



//test
import axios from "axios";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, 
});

// Main Connector
export const apiConnector = (method, url, bodyData = null, headers = {}, params = null) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    params,
    headers: {
      ...headers, 
      // ❌ DO NOT set Content-Type manually for multipart form data
      ...(bodyData instanceof FormData ? {} : { "Content-Type": "application/json" }),
    },
  });
};
