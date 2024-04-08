import { FormProvider, useForm } from 'react-hook-form';
import { Heading, Stack, Container, Box, Button, useToast } from '@chakra-ui/react';
import { Citizen, CitizenFields } from '../../citizens';
import { usePostPromotion } from '../hooks/usePostPromotion';
import { PromoterBadge } from '../../promoters';
import { useParams } from 'react-router-dom';
import { AddressFields } from '../../citizens/components/AddressFields';

export const CreatePromotion = () => {
  const form = useForm<Citizen>({
    mode: 'onBlur',
  });
  const toast = useToast();
  const mutation = usePostPromotion({
    onSuccess: (data) => {
      toast({
        id: 'promotion',
        title: data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        id: 'promotion',
        title: 'Error',
        description: error.response?.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: Citizen) => {
    mutation.mutate({
      promoterId: promoterId ?? '',
      ...data,
    });
  };

  const { promoterId } = useParams();

  return (
    <Container mt={10}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack>
            <Heading> Registrar convencido </Heading>
            <Box>
              <PromoterBadge promoterId={promoterId ?? ''} />
            </Box>

            <CitizenFields />
            <AddressFields />
            <Box mt={8} display="flex" justifyContent={'center'}>
              <Button size={'lg'} colorScheme="teal" isLoading={mutation.isPending} type="submit">
                Registrar promovido
              </Button>
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
};
