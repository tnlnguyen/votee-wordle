import { AxiosInstance } from 'Core/Apis/ApiClient';

const dailyGuess = async (data) => {
  const response = await AxiosInstance.get('/daily', { params: data });
  return response.data;
};

const randomGuess = async (data) => {
  const response = await AxiosInstance.get('/random', { params: data });
  return response.data;
};

const wordGuess = async ({ urlParams, queryParams }) => {
  const response = await AxiosInstance.get(`/word/${urlParams}`, { params: queryParams });
  return response.data;
};
export { dailyGuess, randomGuess, wordGuess };
