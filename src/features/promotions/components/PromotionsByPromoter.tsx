import { Heading, Stack, Container, Box, Spinner, Button } from '@chakra-ui/react';
import { PromoterBadge } from '../../promoters';
import { Link, useParams } from 'react-router-dom';
import { useGetPromotionsByPromoter } from '../hooks/useGetPromotionsByPromoter';
import { PromotedItem } from './PromotedItem';
import { routes } from '../../../constants';

export const PromotionsByPromoter = () => {
  const { promoterId } = useParams();
  const query = useGetPromotionsByPromoter({ promoterId: promoterId ?? '' });

  return (
    <Container mt={10}>
      <Stack>
        <Heading> Perfil del Promotor </Heading>
        <Box>
          <PromoterBadge promoterId={promoterId ?? ''} />
        </Box>
        {query.isFetching && <Spinner />}
        {query.isSuccess &&
          query.data.map((promotion) => (
            <PromotedItem
              key={promotion.id}
              id={promotion.id}
              name={`${promotion.Citizens.name} ${promotion.Citizens.firstSurname} ${promotion.Citizens.secondSurname}`}
              phoneNumber={promotion.Citizens.Address?.phoneNumber ?? ''}
              status={promotion.status}
            />
          ))}

        <Button as={Link} to={routes.createPromotion.replace(':promoterId', promoterId ?? '')}>
          Agregar Otro
        </Button>
      </Stack>
    </Container>
  );
};