import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../libs';
import { ElectoralSection } from '../interface';
import { I24ServiceResponse } from '../../../interface';
import { AxiosError, AxiosResponse } from 'axios';

type ServerResponse = I24ServiceResponse<ElectoralSection[]>;
type AxiosModifiedResponse = AxiosResponse<ServerResponse>;
type Error = AxiosError<{ message: string }>;

const selector = (data: AxiosModifiedResponse) => {
  return data.data;
};

const getSections = async () => {
  const response = await httpClient.get<ServerResponse>('sections');
  return selector(response);
};

export const useElectoralSections = (
  options: Omit<UseQueryOptions<ServerResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['sections'],
    queryFn: () => getSections(),
    staleTime: Infinity,
    ...options,
  });
};
