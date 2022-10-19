import axios from 'axios';
import { setToken, getNewToken, getToken, getRefreshToken, logout } from 'Core/Apis/Configs/Auth';
import { AppUrl } from 'Config';
import { HeaderKey } from 'Core/Utils/Enum';

const requestInterceptor = async (config) => {
  const token = await getToken();
  if (!!token) {
    config.headers[HeaderKey.AUTH_HEADER_KEY] = token;
  }

  console.log('API::REQUEST', config);
  return config;
};

const responseInterceptor = async (response) => {
  const { status } = response;
  if (status === 401) {
    console.log('API::ERROR', error?.response);
    logout();
  }

  console.log('API::DONE', { url: response?.request?.responseURL });
  return response;
};

export const buildClient = (config, enableInterceptor = true) => {
  const instance = axios.create(config);

  if (enableInterceptor) {
    instance.interceptors.request.use(requestInterceptor);
    instance.interceptors.response.use(responseInterceptor);
  }

  return instance;
};

export const AxiosInstance = buildClient({ baseURL: AppUrl.API_URL });
