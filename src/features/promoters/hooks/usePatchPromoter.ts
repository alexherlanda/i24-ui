import { I24ServiceResponse } from '../../../interface';
import { httpClient } from '../../../libs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { Promoter } from '../interface';
import { AxiosError, AxiosResponse } from 'axios';
import { UpdatePromoterPayload } from '../../../../src/shared-types';

type RawResponse = AxiosResponse<I24ServiceResponse<Promoter>>;
type Error = AxiosError<{ message: string }>;
type Payload = UpdatePromoterPayload;
type Response = I24ServiceResponse<Promoter>;

const selector = (response: RawResponse) => {
  return response.data;
};

const postPromoter = async (payload: Payload) => {
  const response = await httpClient.patch<I24ServiceResponse<Promoter>>(
    `promoters/${payload.promoter.id}`,
    payload,
  );
  return selector(response);
};

export const usePatchPromoter = (options: UseMutationOptions<Response, Error, Payload>) => {
  return useMutation({
    mutationFn: (payload) => postPromoter(payload),
    ...options,
  });
};
