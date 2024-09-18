import axios from "axios";

const createAxiosInstance = (authTokens) => {
  const instance = axios.create({
    baseURL: "http://localhost:8000/api/",
  });

  instance.interceptors.request.use((config) => {
    if (authTokens) {
      config.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    return config;
  });

  return instance;
};

export default createAxiosInstance;
