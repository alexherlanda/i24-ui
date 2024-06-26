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
import { useGetProfile } from '../../../global/hooks/useGetProfile';
type Props = {
  id: string;
  name: string;
  phoneNumber: string;
  status: string;
  index: number;
};

export const PromotedItem = ({ id, name, phoneNumber, status, index }: Props) => {
  const profile = useGetProfile();
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
        <Text mr={2}> {index + 1}</Text>
        <Icon fontSize={22} as={getIcon()} mr={2} />
        <Box>
          <Text textOverflow={'clip'} fontWeight="bold">
            {name.toUpperCase()}
          </Text>

          <Flex>
            <Text>
              <a href={`tal:${phoneNumber}`}>{phoneNumber}</a>
            </Text>
          </Flex>
        </Box>
      </Flex>

      {profile?.role === 'admin' && (
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
                <MenuItemOption value="UNREACHABLE">No localizable</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Flex>
  );
};
