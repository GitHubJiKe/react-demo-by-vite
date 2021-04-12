import axios, { AxiosRequestConfig } from "axios";
import Store from "../../Store";

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers["TOKEN"] && Store.token) {
    config.headers["TOKEN"] = Store.token;
  }

  if (!config.timeout) {
    config.timeout = 1000 * 60; // one minute
  }

  return config;
});

// axios.interceptors.response.use((res: AxiosResponse) => {
//   return res;
// });

const http = axios;

export default http;
