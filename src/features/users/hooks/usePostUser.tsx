import { I24ServiceResponse } from '../../../interface';
import { httpClient } from '../../../libs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { CreateUserPayload, CreateUserResponse } from '../../../shared-types';

type RawResponse = AxiosResponse<I24ServiceResponse<CreateUserResponse>>;
type Error = AxiosError<{ message: string }>;
type Payload = CreateUserPayload;
type Response = I24ServiceResponse<CreateUserResponse>;

const selector = (response: RawResponse): Response => {
  return response.data;
};

const postPromotion = async (payload: Payload) => {
  const response = await httpClient.post('users/', payload);
  return selector(response);
};

export const usePostUser = (options?: UseMutationOptions<Response, Error, Payload>) => {
  return useMutation({
    mutationFn: (payload) => postPromotion(payload),
    ...options,
  });
};
