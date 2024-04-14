import { Box, Progress, Text } from '@chakra-ui/react';
import { useGetGlobalOverview } from '../hooks/useGetGlobalOverview';

const PromotionsTotal = () => {
  const query = useGetGlobalOverview();
  const currentPercentage = query.isSuccess
    ? (query.data?.totalPromotions / query.data?.totalGoals) * 100
    : 0;

  return (
    <Box mt={4} p={4} boxShadow={'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);'}>
      <Text fontSize="lg" marginBottom="2">
        Progreso Global
      </Text>
      <Progress colorScheme="green" size="lg" value={currentPercentage} />
      <Text fontSize="sm" marginTop="2">
        Promociones: {query.data?.totalPromotions} / {query.data?.totalGoals}
      </Text>
    </Box>
  );
};

export default PromotionsTotal;
