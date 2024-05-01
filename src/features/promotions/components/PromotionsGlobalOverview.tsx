import { Box, Text } from '@chakra-ui/react';
import { useGetGlobalOverview } from '../hooks/useGetGlobalOverview';
import { VictoryPie } from 'victory';

const PromotionsTotal = () => {
  const query = useGetGlobalOverview();

  return (
    <>
      <Box mt={4} p={4} boxShadow={'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);'}>
        <Text fontSize="lg" marginBottom="2">
          Global
        </Text>
        {query.isSuccess ? (
          <VictoryPie
            animate={{
              duration: 2000,
            }}
            colorScale={['#000080', '#B0C4DE', '#800020']}
            height={300}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            data={[
              { x: 'VERDADERO', y: query.data.totalVerified },
              { x: 'CAPTURADO', y: query.data.totalUnverified },
              { x: 'FALSO', y: query.data.totalRejected },
            ]}
          />
        ) : null}
      </Box>
    </>
  );
};

export default PromotionsTotal;
