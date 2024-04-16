import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../libs';
import { I24ServiceResponse } from '../../../interface';
import { AxiosError, AxiosResponse } from 'axios';
import { Filters, PromoterProgress } from '../interface';
import { validateTokenExists } from '../../../utils/tokenHelpers';

type ServerResponse = I24ServiceResponse<PromoterProgress[]>;
type AxiosModifiedResponse = AxiosResponse<ServerResponse>;
type Error = AxiosError<{ message: string }>;

const selector = (data: AxiosModifiedResponse) => {
  return data.data;
};

const getPromotersProgress = async (filters: Filters) => {
  const queryString = new URLSearchParams(filters).toString();
  const response = await httpClient.get<ServerResponse>(`promoters/progress?${queryString}`);
  return selector(response);
};

export const useGetPromotersProgress = (
  filters: Filters,
  options?: Omit<UseQueryOptions<ServerResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['promotersProgress', filters],
    queryFn: () => getPromotersProgress(filters),
    staleTime: Infinity,
    enabled: validateTokenExists(),
    ...options,
  });
};
