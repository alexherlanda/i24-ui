import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useElectoralSections } from '../electoralSections';
import { Citizen } from '.';

export const CitizenFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Citizen>();
  const electoralSectionsQuery = useElectoralSections();
  return (
    <Box>
      <FormControl isInvalid={!!errors.name} mt={4}>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <Input
          id="name"
          autoComplete="name"
          {...register('name', { required: 'Este campo es requerido' })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>

        <FormControl isInvalid={!!errors.firstSurname} mt={4}>
          <FormLabel htmlFor="firstSurname">Apellido paterno</FormLabel>
          <Input
            id="firstSurname"
            autoComplete="firstName"
            {...register('firstSurname', {
              required: 'Este campo es requerido',
            })}
          />
          <FormErrorMessage>{errors.firstSurname && errors.firstSurname.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.firstSurname} mt={4}>
          <FormLabel htmlFor="firstSurname">Apellido materno</FormLabel>
          <Input
            id="secondSurname"
            {...register('secondSurname', {
              required: 'Este campo es requerido',
            })}
          />
          <FormErrorMessage>{errors.firstSurname && errors.firstSurname.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.electorKey} mt={4}>
          <FormLabel htmlFor="electorKey">Clave de elector</FormLabel>
          <Input
            id="electorKey"
            {...register('electorKey', { required: 'Este campo es requerido' })}
          />
          <FormErrorMessage>{errors.electorKey && errors.electorKey.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.electoralSectionId} mt={4}>
          <FormLabel htmlFor="electoralSectionId">Sección electoral</FormLabel>
          <Select
            placeholder="Seleccione una seccion"
            isDisabled={electoralSectionsQuery.isFetching}
            id="electoralSectionId"
            {...register('electoralSectionId', {
              required: 'Este campo es requerido',
              valueAsNumber: true,
            })}
          >
            {electoralSectionsQuery.isSuccess &&
              electoralSectionsQuery.data.map(({ id, alias }) => (
                <option key={id} value={id}>{`${id} ${alias}`}</option>
              ))}
          </Select>
          <FormErrorMessage>
            {errors.electoralSectionId && errors.electoralSectionId.message}
          </FormErrorMessage>
        </FormControl>
      </FormControl>
    </Box>
  );
};
