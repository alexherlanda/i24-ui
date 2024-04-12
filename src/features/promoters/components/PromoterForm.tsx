import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react';
import { CitizenFields } from '../../citizens';
import { useFormContext } from 'react-hook-form';
import { Promoter } from '../interface';
import { AddressFields } from '../../citizens/components/AddressFields';

export const PromoterForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Promoter>();
  return (
    <>
      <CitizenFields />
      <AddressFields />
      <Box mt={2}>
        <FormControl isRequired isInvalid={!!errors.promotionGoal} mt={4}>
          <FormLabel htmlFor="promotionGoal">Meta de promoción</FormLabel>
          <NumberInput>
            <NumberInputField
              id="promotionGoal"
              {...register('promotionGoal', {
                required: 'Este campo es requerido',
                valueAsNumber: true,
              })}
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.promotionGoal && errors.promotionGoal.message}
          </FormErrorMessage>
        </FormControl>
      </Box>
    </>
  );
};
