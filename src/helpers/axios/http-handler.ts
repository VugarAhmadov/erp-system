import axios from "axios";

const axiosCancelTokenSource = axios.CancelToken.source();
const axiosIsCancel = axios.isCancel;

const defaultRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/DispatcherRest/`,
});

defaultRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("codeum_jwt_token");

    if (token) {
      config.headers = {
        Auth: `Codium ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { defaultRequest, axiosCancelTokenSource, axiosIsCancel };
