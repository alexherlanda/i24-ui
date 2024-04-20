import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  Box,
  Select,
} from '@chakra-ui/react';
import { CitizenFields } from '../../citizens';
import { useFormContext } from 'react-hook-form';
import { Promoter } from '../interface';
import { AddressFields } from '../../citizens/components/AddressFields';
import { tags } from '../constants';

export const PromoterForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Promoter>();
  // <option key={id} value={id}>{`${id} ${alias}`}</option>
  return (
    <>
      <CitizenFields />
      <AddressFields />

      <Box mt={2}>
        <FormControl isRequired isInvalid={!!errors.tag} mt={4}>
          <FormLabel htmlFor="electoralSectionId">Etiqueta</FormLabel>
          <Select placeholder="Seleccione una seccion" id="tag" {...register('tag')}>
            {tags.map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </Select>
          <FormErrorMessage>{errors.tag && errors.tag.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.weeklyCost} mt={4}>
          <FormLabel htmlFor="weeklyCost">Costo semanal</FormLabel>
          <NumberInput>
            <NumberInputField
              id="weeklyCost"
              {...register('weeklyCost', {
                required: 'Este campo es requerido',
                valueAsNumber: true,
              })}
            />
          </NumberInput>
          <FormErrorMessage>{errors.weeklyCost && errors.weeklyCost.message}</FormErrorMessage>
        </FormControl>

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
