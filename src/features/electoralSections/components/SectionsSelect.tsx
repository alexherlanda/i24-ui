import { useElectoralSections } from '../hooks/useElectoralSections';
import { FormControl, FormLabel, FormErrorMessage, Select } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type Form = Record<string, string> & { electoralSectionId: string };

type Props = {
  isRequired: boolean;
};

export const SelectionsSelect = ({ isRequired }: Props) => {
  const electoralSectionsQuery = useElectoralSections();
  const {
    register,
    formState: { errors },
  } = useFormContext<Form>();

  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors.electoralSectionId} mt={4}>
      <FormLabel htmlFor="electoralSectionId">Sección electoral</FormLabel>
      <Select
        isDisabled={electoralSectionsQuery.isFetching}
        id="electoralSectionId"
        {...register('electoralSectionId', {
          required: isRequired ? 'Este campo es requerido' : false,
          valueAsNumber: true,
        })}
      >
        <option value={undefined}> </option>
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
