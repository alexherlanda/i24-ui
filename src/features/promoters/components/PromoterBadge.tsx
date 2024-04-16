import { Avatar, Text, Flex, Box } from '@chakra-ui/react';
import { useGetPromoter } from '..';

type Props = {
  promoterId: string;
};

export const PromoterBadge = ({ promoterId }: Props) => {
  const query = useGetPromoter(promoterId ?? '', {});
  let name;
  let avatarName = '';
  if (query.isSuccess) {
    const citizen = query.data.data.Citizen;
    name = `${citizen.name} ${citizen.firstSurname} ${citizen.secondSurname}`;
    avatarName = `${citizen.name} ${citizen.firstSurname}`;
  }
  if (query.isError) {
    name = 'Anonimo';
  }
  return (
    <Flex p={4} boxShadow={'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);'} mt={3} mb={3}>
      <Avatar name={avatarName} />
      <Box ml="3">
        <Text fontWeight="bold">{name}</Text>
        <Text fontSize="sm">{`${query.data?.data.Citizen?.Address?.phoneNumber}`}</Text>
      </Box>
    </Flex>
  );
};
