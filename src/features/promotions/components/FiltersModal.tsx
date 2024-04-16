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

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const FiltersModal = ({ isOpen, onClose }: Props) => {
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
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Aplicar filtros
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
