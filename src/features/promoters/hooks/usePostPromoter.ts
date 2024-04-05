import { I24ServiceResponse } from '../../../interface';
import { httpClient } from '../../../libs';
import { useMutation } from '@tanstack/react-query';
import { Promoter } from '../interface';
import { AxiosResponse } from 'axios';

type CreatePromoterPayload = {
  name: string;
  firstSurname: string;
  secondSurname: string;
  electorKey: string;
  electoralSectionId: string;
  promotionGoal: string;
};

const selector = (response: AxiosResponse<I24ServiceResponse<Promoter>, unknown>) => {
  return response.data;
};

const createPromoter = async (payload: CreatePromoterPayload) => {
  const response = await httpClient.post<I24ServiceResponse<Promoter>>('promoters/', payload);
  return selector(response);
};

export const usePostPromoter = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: (payload: CreatePromoterPayload) => createPromoter(payload),
    onSuccess: onSuccess,
  });
};
