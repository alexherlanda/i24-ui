import { HStack, VStack, Avatar, Text, Progress } from '@chakra-ui/react'; // Asegúrate de tener importados los componentes necesarios de Chakra UI
import { Link } from 'react-router-dom';
import { routes } from '../../../constants';

type Props = {
  id: string;
  label: string;
  progress: number;
  promotions: number;
  goal: number;
  avatarInitials: string;
  weeklyCost: number;
};

export const PromoterProgress = ({
  label,
  progress,
  promotions,
  id,
  goal,
  avatarInitials,
  weeklyCost,
}: Props) => {
  return (
    <Link to={routes.createPromotion.replace(':promoterId', id)}>
      <HStack p={4} boxShadow="md" borderRadius="lg" w="full" alignItems="center" spacing={4}>
        <Avatar name={avatarInitials} />
        <VStack align="start" flex={1}>
          <Text fontWeight="bold">{`${label} ${weeklyCost > 0 ? '💵' : ''}`}</Text>
          <Text fontSize="sm">Promociones: {`${promotions}/${goal}`}</Text>{' '}
          <Progress value={progress} size="sm" colorScheme="green" w="full" />
        </VStack>
      </HStack>
    </Link>
  );
};
