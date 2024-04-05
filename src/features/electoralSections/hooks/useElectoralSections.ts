import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../libs';
import { ElectoralSection } from '../interface';
import { AxiosResponse } from 'axios';

interface ApiResponse {
  data: ElectoralSection[];
}

const selector = (data: ApiResponse): ElectoralSection[] => {
  return data.data;
};

const readSections = async () => {
  const response = await httpClient.get<ApiResponse>('sections');
  return selector(response.data);
};

export const useElectoralSections = () => {
  return useQuery({
    queryKey: ['sections'],
    queryFn: readSections,
  });
};
