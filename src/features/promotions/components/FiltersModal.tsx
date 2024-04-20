import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import { SelectionsSelect } from '../../electoralSections/components/SectionsSelect';
import { useFormContext } from 'react-hook-form';
import { FiltersForm } from '../interface';
import { tags } from '../../promoters';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const FiltersModal = ({ isOpen, onClose }: Props) => {
  const { reset } = useFormContext();

  const handleRest = () => {
    reset();
    onClose();
  };

  const {
    register,
    formState: { errors },
  } = useFormContext<FiltersForm>();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filtros</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <SelectionsSelect isRequired={false} />

            <FormControl isInvalid={!!errors.tag} mt={4}>
              <FormLabel htmlFor="tag">Etiqueta</FormLabel>
              <Select id="tag" {...register('tag')}>
                <option value={undefined}></option>
                {tags.map((tag) => (
                  <option value={tag} key={tag}>
                    {tag}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.electoralSectionId && errors.electoralSectionId.message}
              </FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handleRest}>
            Borrar filtros
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
