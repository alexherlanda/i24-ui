import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Box,
  Text,
  Flex,
  IconButton,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { CiMenuKebab } from 'react-icons/ci';
import { VscWorkspaceTrusted, VscWorkspaceUntrusted } from 'react-icons/vsc';
import { usePatchPromotion } from '../hooks/usePatchPromotion';
import { useQueryClient } from '@tanstack/react-query';
type Props = {
  id: string;
  name: string;
  phoneNumber: string;
  status: string;
};

export const PromotedItem = ({ id, name, phoneNumber, status }: Props) => {
  const getIcon = () => {
    if (status === 'VERIFIED') {
      return VscWorkspaceTrusted;
    }
    if (status === 'REJECTED') {
      return VscWorkspaceUntrusted;
    }
  };
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = usePatchPromotion({
    onSuccess: (data) => {
      toast({ status: 'success', title: data.message });
      queryClient.refetchQueries({ queryKey: ['promotions'] });
    },
  });

  const handleStatusChange = (value: string | string[]) => {
    mutation.mutate({
      id: id,
      status: Array.isArray(value) ? value[0] : value,
    });
  };

  return (
    <Flex justify="space-between" align="center" p="4" borderBottom="1px" borderColor="gray.200">
      <Flex alignItems={'center'} justifyContent={'center'}>
        <Box>
          <Text fontWeight="bold">{name.toUpperCase()}</Text>
          <Text>{phoneNumber}</Text>
        </Box>
        <Box ml={5}>
          <Icon fontSize={22} as={getIcon()} />
        </Box>
      </Flex>

      <Flex align="center">
        <Menu>
          <MenuButton as={IconButton} icon={<CiMenuKebab />} variant="outline" />
          <MenuList>
            <MenuOptionGroup
              onChange={handleStatusChange}
              defaultValue={status}
              title="Status"
              type="radio"
            >
              <MenuItemOption value="VERIFIED">Verificado</MenuItemOption>
              <MenuItemOption value="UNVERIFIED">Sin Verificar</MenuItemOption>
              <MenuItemOption value="REJECTED">Invalidado</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
