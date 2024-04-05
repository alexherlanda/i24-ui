import { FormProvider, useForm } from 'react-hook-form';
import { usePostPromoter } from '../hooks';
import { Promoter } from '../interface';
import { PromoterForm } from './PromoterForm';
import {
  Heading,
  Stack,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

export const CreatePromoter = () => {
  const mutation = usePostPromoter({
    onSuccess: () => {
      toast({
        title: 'Promotor creado.',
        description: 'El promotor se ha creado correctamente.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      form.reset();
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

            {mutation.isError ? (
              <Alert status="error" mt={2}>
                <AlertIcon />
                <AlertTitle>{mutation?.error?.response?.data?.message}</AlertTitle>
              </Alert>
            ) : null}

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
