import { httpClient } from '../../../libs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { I24ServiceResponse } from '../../../interface';

type AuthData = {
  token: string;
  user: {
    id: string;
    role: string;
  };
};

type AxiosModifiedResponse = AxiosResponse<I24ServiceResponse<AuthData>>;
type Error = AxiosError<{ message: string }>;
type Payload = { username: string; password: string };
type Response = I24ServiceResponse<AuthData>;

const selector = (response: AxiosModifiedResponse): Response => {
  return response.data;
};

const login = async (payload: Payload) => {
  const response: AxiosModifiedResponse = await httpClient.post('auth/login', payload);
  const token = response.data.data.token;
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
  return selector(response);
};

export const usePostLogin = (options?: UseMutationOptions<Response, Error, Payload>) => {
  return useMutation({
    mutationFn: (payload) => login(payload),
    ...options,
  });
};
