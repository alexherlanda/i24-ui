import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../libs';
import { I24ServiceResponse } from '../../../interface';
import { AxiosError, AxiosResponse } from 'axios';
import { validateTokenExists } from '../../../utils/tokenHelpers';
import { GlobalOverview } from '../interface';

type ServerResponse = I24ServiceResponse<GlobalOverview>;
type AxiosModifiedResponse = AxiosResponse<ServerResponse>;
type Error = AxiosError<{ message: string }>;
type Response = GlobalOverview;

const selector = (response: AxiosModifiedResponse) => {
  return response.data.data;
};

const getPromotionsGlobalOverview = async () => {
  const response = await httpClient.get<ServerResponse>('promotions/overview', {});
  return selector(response);
};

export const useGetGlobalOverview = (
  options?: Omit<UseQueryOptions<Response, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['globalOverview'],
    queryFn: () => getPromotionsGlobalOverview(),
    enabled: validateTokenExists(),
    ...options,
  });
};
