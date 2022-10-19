import axios from 'axios';
import { AuthKey } from 'Core/Utils/Enum';
import { AppUrl } from 'Config';
import { Redirect } from 'react-router-dom';


const refreshing = null;

const setToken = async (credentials) => {
  // Cleanup old token
  await localStorage.removeItem(AuthKey.ACCESS_TOKEN_KEY);
  await localStorage.setItem(AuthKey.ACCESS_TOKEN_KEY, credentials.accessToken);
  await localStorage.setItem(AuthKey.REFRESH_TOKEN_KEY, credentials.refreshToken);

  // We can force the expires time for testing purposes
  const expiresIn = parseInt(credentials.expiresIn);
  const refreshExpiresIn = parseInt(credentials.refreshExpiresIn);

  //Calculate the expires time for access token and refresh token
  const currentTime = new Date().getTime();
  const tokenExpiry = new Date(currentTime + expiresIn * 1000).getTime();
  const refreshTokenExpiry = new Date(currentTime + refreshExpiresIn * 1000).getTime();

  await localStorage.setItem(AuthKey.ACCESS_TOKEN_EXPIRY_KEY, tokenExpiry.toString());
  await localStorage.setItem(AuthKey.REFRESH_TOKEN_EXPIRY_KEY, refreshTokenExpiry.toString());
};

const getNewToken = async () => {
  const { data: credentials } = await axios.post(
    `${AppUrl.API_URL}/<refresh-token>`,
    {
      refreshToken: getRefreshToken(),
    }
  );

  setToken(credentials);
};

const getToken = async () => {
  const currentToken = await localStorage.getItem(AuthKey.ACCESS_TOKEN_KEY);
  if (!currentToken) {
    return null;
  }

  const tokenExpiry = await localStorage.getItem(AuthKey.ACCESS_TOKEN_EXPIRY_KEY);
  const currentTime = new Date().getTime();

  if (tokenExpiry > currentTime) {
    // Return valid access token
    return currentToken;
  }

  const refreshTokenExpiry = await localStorage.getItem(AuthKey.REFRESH_TOKEN_EXPIRY_KEY);
  if (refreshTokenExpiry > currentTime) {
    // Refresh token valid, refreshing token..
    if (!refreshing) {
      refreshing = getNewToken();
    }

    await refreshing;
    refreshing = null;

    return await localStorage.getItem(AuthKey.ACCESS_TOKEN_KEY);
  }

  return null;
};

const getRefreshToken = async () => {
  return await localStorage.getItem(AuthKey.REFRESH_TOKEN_KEY);
};

const logout = async ({ name, params }) => {
  await localStorage.removeItem(AuthKey.ACCESS_TOKEN_KEY);
  await localStorage.removeItem(AuthKey.REFRESH_TOKEN_KEY);
	<Redirect to="/login" />
};

export { setToken, getNewToken, getToken, getRefreshToken, logout };
