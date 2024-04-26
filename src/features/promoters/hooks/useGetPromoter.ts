import { I24ServiceResponse } from '../../../interface';
import { httpClient } from '../../../libs';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { Citizen } from '../../citizens';
import { validateTokenExists } from '../../../utils/tokenHelpers';

type Data = {
  id: string;
  citizenId: string;
  promotionGoal: number;
  weeklyCost: number;
  tag: string;
  Citizen: Citizen;
};
type ServerResponse = I24ServiceResponse<Data>;
type AxiosModifiedResponse = AxiosResponse<ServerResponse>;
type Error = AxiosError<{ message: string }>;

const selector = (response: AxiosModifiedResponse) => {
  return response.data;
};

const getPromoter = async (promoterId: string) => {
  const response = await httpClient.get<ServerResponse>(`/promoters/${promoterId}/`);
  return selector(response);
};

const tenMinutes = 600000;

export const useGetPromoter = (
  promoterId: string,
  options?: Omit<UseQueryOptions<ServerResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['promoter', promoterId],
    queryFn: () => getPromoter(promoterId),
    staleTime: tenMinutes,
    enabled: validateTokenExists() && options?.enabled,
    ...options,
  });
};
