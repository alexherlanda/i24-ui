import { I24ServiceResponse } from '../../../interface';
import { httpClient } from '../../../libs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Promotion } from '../interface';

type RawResponse = AxiosResponse<I24ServiceResponse<Promotion>>;
type Error = AxiosError<{ message: string }>;

type Response = I24ServiceResponse<Promotion>;

const selector = (response: RawResponse): Response => {
  return response.data;
};

const patchPromotion = async (payload: Payload) => {
  const response = await httpClient.patch(`promotions/${payload.id}`, payload);
  return selector(response);
};

type Payload = {
  id: string;
  promoterId?: string;
  promotedPersonId?: string;
  promotionDate?: string;
  status?: string;
};

export const usePatchPromotion = (options: UseMutationOptions<Response, Error, Payload>) => {
  return useMutation({
    mutationFn: (payload) => patchPromotion(payload),
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
