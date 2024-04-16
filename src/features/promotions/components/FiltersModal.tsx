import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { SelectionsSelect } from '../../electoralSections/components/SectionsSelect';
import { useFormContext } from 'react-hook-form';

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filtros</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <SelectionsSelect />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handleRest}>
            Borrar filtros
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Aplicar filtros
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
