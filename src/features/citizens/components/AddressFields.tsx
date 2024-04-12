import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { AddressForm } from '../interface';

export const AddressFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddressForm>();
  return (
    <Box>
      <FormControl isRequired isInvalid={!!errors.phoneNumber} mt={4}>
        <FormLabel htmlFor="phoneNumber">Telefono</FormLabel>
        <NumberInput>
          <NumberInputField
            id="phoneNumber"
            {...register('phoneNumber', {
              required: 'Este campo es requerido',
              minLength: {
                value: 10,
                message: 'Debe de tener 10 digitos',
              },
              maxLength: {
                value: 10,
                message: 'Debe de tener 10 digitos',
              },
            })}
          />
        </NumberInput>
        <FormErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.postalCode} mt={4}>
        <FormLabel htmlFor="postalCode">Codigo postal</FormLabel>
        <NumberInput>
          <NumberInputField
            id="postalCode"
            {...register('postalCode', {
              required: 'Este campo es requerido',
              minLength: {
                value: 5,
                message: 'Debe de tener 5 digitos',
              },
              maxLength: {
                value: 5,
                message: 'Debe de tener 5 digitos',
              },
            })}
          />
        </NumberInput>
        <FormErrorMessage>{errors.postalCode && errors.postalCode.message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};
