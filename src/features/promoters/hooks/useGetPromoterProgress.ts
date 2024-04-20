import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../libs';
import { I24ServiceResponse } from '../../../interface';
import { AxiosError, AxiosResponse } from 'axios';
import { PromoterProgress } from '../interface';
import { validateTokenExists } from '../../../utils/tokenHelpers';
import { FiltersForm } from '../../promotions/interface';

type ServerResponse = I24ServiceResponse<PromoterProgress[]>;
type AxiosModifiedResponse = AxiosResponse<ServerResponse>;
type Error = AxiosError<{ message: string }>;

const selector = (data: AxiosModifiedResponse) => {
  return data.data;
};

const getPromotersProgress = async (filters: FiltersForm) => {
  const response = await httpClient.get<ServerResponse>(`promoters/progress`, {
    params: filters,
  });
  return selector(response);
};

export const useGetPromotersProgress = (
  filters: FiltersForm,
  options?: Omit<UseQueryOptions<ServerResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['promotersProgress', filters],
    queryFn: () => getPromotersProgress(filters),
    enabled: validateTokenExists(),
    ...options,
  });
};
