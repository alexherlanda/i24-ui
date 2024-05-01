import { Heading, Stack, Container, Box, Spinner, Button, useToast } from '@chakra-ui/react';
import { PromoterBadge, useGetPromoter } from '../../promoters';
import { Link, useParams } from 'react-router-dom';
import { useGetPromotionsByPromoter } from '../hooks/useGetPromotionsByPromoter';
import { PromotedItem } from './PromotedItem';
import { routes } from '../../../constants';
import { useGetProfile } from '../../../global/hooks/useGetProfile';
import { usePostUser } from '../../users/hooks/usePostUser';

export const PromotionsByPromoter = () => {
  const { promoterId } = useParams();
  const promotionsQuery = useGetPromotionsByPromoter({ promoterId: promoterId ?? '' });
  const promoterQuery = useGetPromoter(promoterId ?? '');
  const profile = useGetProfile();
  const toast = useToast();
  const postUserMutation = usePostUser({
    onSuccess: async (data) => {
      await navigator.clipboard.writeText(
        `usuario: ${data.data.username} 
        contraseña: ${data.data.password}`,
      );
      toast({
        title: 'Constraseña copiada en el portapapeles',
        status: 'success',
        isClosable: true,
      });
    },
  });

  const handleOnGenerateProfile = () => {
    if (promoterQuery.isSuccess) {
      const promoter = promoterQuery.data.data;

      postUserMutation.mutate({
        username: String(promoter.Citizen.Address.phoneNumber),
        role: 'promoter',
        citizenId: promoter.Citizen.id,
      });
    }
  };
  const isAdmin = profile?.role === 'admin';

  return (
    <Container mt={10}>
      <Stack>
        <Heading> Perfil del Promotor </Heading>
        <Box>
          <PromoterBadge promoterId={promoterId ?? ''} />
        </Box>
        {promoterQuery.isSuccess && !promoterQuery.data.data.Citizen.User?.isActive && isAdmin ? (
          <Button onClick={handleOnGenerateProfile} isLoading={postUserMutation.isPending}>
            Generar usuario a este perfil{' '}
          </Button>
        ) : null}

        <section>
          <Heading mt={4} size={'md'}>
            {' '}
            Personas promovidas{' '}
          </Heading>

          <Button
            mt={2}
            as={Link}
            to={routes.createPromotion.replace(':promoterId', promoterId ?? '')}
            width={'100%'}
          >
            Agregar nueva promocion
          </Button>

          {promotionsQuery.isFetching && <Spinner />}
          {promotionsQuery.isSuccess &&
            promotionsQuery.data.map((promotion, index) => (
              <PromotedItem
                index={index}
                key={promotion.id}
                id={promotion.id}
                name={`${promotion.Citizens.firstSurname} ${promotion.Citizens.secondSurname}  ${promotion.Citizens.name}`}
                phoneNumber={promotion.Citizens.Address?.phoneNumber ?? ''}
                status={promotion.status}
              />
            ))}
        </section>
      </Stack>
    </Container>
  );
};
