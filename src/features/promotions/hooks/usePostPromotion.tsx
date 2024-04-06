import { I24ServiceResponse } from '../../../interface';
import { httpClient } from '../../../libs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Citizen } from '../../citizens';

type Promotion = {
  id: string;
  promoterId: string;
  promotedPersonId: string;
  hasVoted: true;
  promotionDate: string;
};

type RawResponse = AxiosResponse<I24ServiceResponse<Promotion>>;
type Error = AxiosError<{ message: string }>;
type Payload = Citizen & {
  promoterId: string;
};
type Response = I24ServiceResponse<Promotion>;

const selector = (response: RawResponse): Response => {
  return response.data;
};

const postPromotion = async (payload: Payload) => {
  const response = await httpClient.post('promotions/', payload);
  return selector(response);
};

export const usePostPromotion = (options: UseMutationOptions<Response, Error, Payload>) => {
  return useMutation({
    mutationFn: (payload) => postPromotion(payload),
    ...options,
  });
};
