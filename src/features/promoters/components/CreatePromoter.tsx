import { FormProvider, useForm } from 'react-hook-form';
import { usePostPromoter } from '../hooks/usePostPromoter';
import { Promoter } from '../interface';
import { PromoterForm } from './PromoterForm';
import { Heading, Stack, Container, Box, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

export const CreatePromoter = () => {
  const mutation = usePostPromoter({
    onSuccess: (data) => {
      toast({
        title: data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      form.reset();
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
  const onSubmit = (data: Promoter) => {
    mutation.mutate(data);
  };

  const form = useForm<Promoter>();
  const toast = useToast();

  return (
    <Container mt={10}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack>
            <Heading> Crear Promotor </Heading>
            <PromoterForm />
            <Box mt={5} display="flex" justifyContent={'center'}>
              <Button size={'lg'} colorScheme="teal" isLoading={mutation.isPending} type="submit">
                Registrar Promotor
              </Button>
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
};
