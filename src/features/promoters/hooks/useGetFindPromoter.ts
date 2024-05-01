import { I24ServiceResponse } from '../../../interface';
import { httpClient } from '../../../libs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { validateTokenExists } from '../../../utils/tokenHelpers';
import { FindUniquePromoterPayload, FindUniquePromoterResponse } from '../../../shared-types';

type ServerResponse = I24ServiceResponse<FindUniquePromoterResponse>;
type AxiosModifiedResponse = AxiosResponse<ServerResponse>;
type Error = AxiosError<{ message: string }>;

const selector = (response: AxiosModifiedResponse) => {
  return response.data;
};

const getPromoter = async (filters: FindUniquePromoterPayload) => {
  const response = await httpClient.get<ServerResponse>(`/promoters/find/unique`, {
    params: filters,
  });
  return selector(response);
};

export const useGetFindPromoter = (
  filters: FindUniquePromoterPayload,
  options?: Omit<UseQueryOptions<ServerResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['promoter', 'find', filters],
    queryFn: () => getPromoter(filters),
    enabled: validateTokenExists() && options?.enabled,
    ...options,
  });
};
