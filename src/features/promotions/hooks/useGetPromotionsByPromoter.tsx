import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../libs';
import { I24ServiceResponse } from '../../../interface';
import { AxiosError, AxiosResponse } from 'axios';
import { validateTokenExists } from '../../../utils/tokenHelpers';
import { PromotionsByPromotionsResponse } from '../interface';

type ServerResponse = I24ServiceResponse<PromotionsByPromotionsResponse>;
type AxiosModifiedResponse = AxiosResponse<ServerResponse>;
type Error = AxiosError<{ message: string }>;
type Response = PromotionsByPromotionsResponse;

const selector = (response: AxiosModifiedResponse) => {
  return response.data.data;
};

const getPromotersByPromoter = async (promoterId: string) => {
  const response = await httpClient.get<ServerResponse>(`promotions/promoter/${promoterId}`, {});
  return selector(response);
};

type Filters = {
  promoterId: string;
};

export const useGetPromotionsByPromoter = (
  filters: Filters,
  options?: Omit<UseQueryOptions<Response, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['promotions', filters.promoterId],
    queryFn: () => getPromotersByPromoter(filters.promoterId),
    enabled: validateTokenExists(),
    ...options,
  });
};
