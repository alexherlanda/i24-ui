import { FormProvider, useForm } from 'react-hook-form';
import { PromoterFields } from './PromoterFields';
import { Heading, Stack, Container, Box, Button } from '@chakra-ui/react';

export type PromoterFormValues = {
  name: string;
  firstSurname: string;
  secondSurname: string;
  electorKey: string;
  electoralSectionId: string;
  promotionGoal: string | number;
  weeklyCost: string;
  phoneNumber: string;
  postalCode: string;
  tag: string;
};

type Props = {
  initialValues: PromoterFormValues;
  onSubmit: (values: PromoterFormValues) => void;
  isSaving: boolean;
};

export const PromoterForm = ({ initialValues, onSubmit, isSaving }: Props) => {
  const form = useForm<PromoterFormValues>({
    mode: 'onBlur',
    defaultValues: initialValues,
  });

  const handleSubmit = (data: PromoterFormValues) => {
    onSubmit(data);
  };

  return (
    <Container mt={10}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Stack>
            <Heading> Actualizar Promotor </Heading>
            <PromoterFields />
            <Box mt={5} display="flex" justifyContent={'center'}>
              <Button size={'lg'} colorScheme="teal" isLoading={isSaving} type="submit">
                Guardar cambios
              </Button>
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
};
