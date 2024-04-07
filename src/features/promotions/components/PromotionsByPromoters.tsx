import React from 'react';
import { Container, Flex, Heading, Spinner, Button, Text } from '@chakra-ui/react';
import { useGetPromotersProgress } from '../../promoters/hooks/useGetPromoterProgress';
import { PromoterProgressList } from '../../promoters/components/PromoterProgressList';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants';

export const PromotionsByPromoters: React.FC = () => {
  const promotersProgress = useGetPromotersProgress();

  return (
    <Container>
      <Heading> Progreso </Heading>
      <Text> Avance por promotor </Text>
      <Flex justifyContent={'flex-end'}>
        <Link to={routes.createPromoter}>
          {' '}
          <Button> Crear nuevo promotor </Button>
        </Link>
      </Flex>
      {promotersProgress.isSuccess ? (
        <PromoterProgressList dataSource={promotersProgress.data.data} />
      ) : null}
      {promotersProgress.isLoading ? <Spinner /> : null}
    </Container>
  );
};

export default PromotionsByPromoters;
