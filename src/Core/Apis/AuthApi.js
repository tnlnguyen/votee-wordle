import { AxiosInstance } from 'Core/Apis/ApiClient';

const authenticate = async (data) => {
	const response = await AxiosInstance.post('/v1/authenticate',data);
	return response.data;
}

export {
	authenticate,
}