import { FormControl, FormLabel, Input, FormErrorMessage, Select, Box } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { ChangeEvent, useEffect } from 'react';

import { useElectoralSections } from '../../electoralSections';
import { Citizen } from '..';

export const CitizenFields = () => {
  const {
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useFormContext<Citizen>();
  const electoralSectionsQuery = useElectoralSections({});

  useEffect(() => {
    setValue('electoralSectionId', getValues('electoralSectionId'));
  }, [electoralSectionsQuery.isSuccess, getValues, setValue]);

  return (
    <Box>
      <FormControl isRequired isInvalid={!!errors.firstSurname} mt={4}>
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

      <FormControl isRequired isInvalid={!!errors.firstSurname} mt={4}>
        <FormLabel htmlFor="secondSurname">Apellido materno</FormLabel>
        <Input
          id="secondSurname"
          {...register('secondSurname', {
            required: 'Este campo es requerido',
          })}
        />
        <FormErrorMessage>{errors.firstSurname && errors.firstSurname.message}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.name} mt={4}>
        <FormLabel htmlFor="name">Nombre(s)</FormLabel>
        <Input
          id="name"
          autoComplete="name"
          {...register('name', { required: 'Este campo es requerido' })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.electorKey} mt={4}>
        <FormLabel htmlFor="electorKey">Clave de elector</FormLabel>
        <Input id="electorKey" {...register('electorKey')} />
        <FormErrorMessage>{errors.electorKey && errors.electorKey.message}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.electoralSectionId} mt={4}>
        <FormLabel htmlFor="electoralSectionId">Sección electoral</FormLabel>
        <Select
          isDisabled={electoralSectionsQuery.isFetching}
          id="electoralSectionId"
          {...register('electoralSectionId', {
            valueAsNumber: true,
            required: 'Este campo es requerido',
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              setValue('electoralSectionId', event.target.value);
            },
            value: getValues('electoralSectionId'),
          })}
          //value={getValues('electoralSectionId')}
        >
          {electoralSectionsQuery.isSuccess &&
            electoralSectionsQuery.data.data.map(({ id, alias }) => (
              <option key={id} value={id}>{`${id} ${alias}`}</option>
            ))}
        </Select>
        <FormErrorMessage>
          {errors.electoralSectionId && errors.electoralSectionId.message}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};
