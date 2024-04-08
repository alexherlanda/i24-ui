import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../libs';
import { I24ServiceResponse } from '../../../interface';
import { AxiosError, AxiosResponse } from 'axios';
import { PromoterProgress } from '../interface';

type ServerResponse = I24ServiceResponse<PromoterProgress[]>;
type AxiosModifiedResponse = AxiosResponse<ServerResponse>;
type Error = AxiosError<{ message: string }>;

const selector = (data: AxiosModifiedResponse) => {
  return data.data;
};

const getPromotersProgress = async () => {
  const response = await httpClient.get<ServerResponse>('promoters/progress', {});
  return selector(response);
};

export const useGetPromotersProgress = (
  options?: Omit<UseQueryOptions<ServerResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['promoters', 'progress'],
    queryFn: () => getPromotersProgress(),
    staleTime: Infinity,
    ...options,
  });
};
