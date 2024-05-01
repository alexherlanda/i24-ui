import { Container, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetPromoter } from '../hooks/useGetPromoter';
import { PromoterForm, PromoterFormValues } from './PromoterForm';
import { useQueryClient } from '@tanstack/react-query';
import { usePatchPromoter } from '../hooks/usePatchPromoter';
import { routes } from '../../../constants';

export const UpdatePromoter = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { promoterId } = useParams();
  const promoterQuery = useGetPromoter(promoterId ?? '');
  const toast = useToast();

  const mutation = usePatchPromoter({
    onSuccess: (data) => {
      toast({
        title: data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate(routes.home);
      queryClient.invalidateQueries({ queryKey: ['promoter', promoterId] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (values: PromoterFormValues) => {
    mutation.mutate({
      promoter: {
        id: promoterId ?? '',
        promotionGoal: Number(values.promotionGoal),
        tag: values.tag,
        weeklyCost: Number(values.weeklyCost),
      },
      citizen: {
        name: values.name,
        firstSurname: values.firstSurname,
        secondSurname: values.secondSurname,
        electorKey: values.electorKey,
        electoralSectionId: Number(values.electoralSectionId),
        address: {
          phoneNumber: values.phoneNumber,
          postalCode: values.postalCode,
        },
      },
    });
  };

  if (promoterQuery.isSuccess) {
    const promoter = promoterQuery.data.data;

    return (
      <Container mt={10}>
        {promoterQuery.isSuccess ? (
          <PromoterForm
            isSaving={false}
            onSubmit={handleSubmit}
            initialValues={{
              name: promoter.Citizen.name,
              firstSurname: promoter.Citizen.firstSurname,
              secondSurname: promoter.Citizen.secondSurname,
              electorKey: promoter.Citizen.electorKey,
              electoralSectionId: String(promoter.Citizen.electoralSectionId),
              promotionGoal: String(promoter.promotionGoal),
              weeklyCost: String(promoter.weeklyCost),
              phoneNumber: String(promoter.Citizen.Address?.phoneNumber ?? ''),
              postalCode: String(promoter.Citizen.Address?.postalCode ?? ''),
              tag: promoter.tag,
            }}
          />
        ) : null}
      </Container>
    );
  }
  return null;
};
