import { useElectoralSections } from '../hooks/useElectoralSections';
import { FormControl, FormLabel, FormErrorMessage, Select } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type Form = Record<string, string> & { electoralSectionId: string };

export const SelectionsSelect = () => {
  const electoralSectionsQuery = useElectoralSections();
  const {
    register,
    formState: { errors },
  } = useFormContext<Form>();

  return (
    <FormControl isRequired isInvalid={!!errors.electoralSectionId} mt={4}>
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
          electoralSectionsQuery.data.data.map(({ id, alias }) => (
            <option key={id} value={id}>{`${id} ${alias}`}</option>
          ))}
      </Select>
      <FormErrorMessage>
        {errors.electoralSectionId && errors.electoralSectionId.message}
      </FormErrorMessage>
    </FormControl>
  );
};
