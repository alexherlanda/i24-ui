import React from 'react';
import {
  Container,
  Flex,
  Heading,
  Spinner,
  Button,
  Text,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useGetPromotersProgress } from '../../promoters/hooks/useGetPromoterProgress';
import { PromoterProgressList } from '../../promoters/components/PromoterProgressList';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants';
import PromotionsTotal from './PromotionsGlobalOverview';
import { FaFilter } from 'react-icons/fa';
import { FiltersModal } from './FiltersModal';
import { useForm, FormProvider } from 'react-hook-form';
import { Filters } from '../../promoters/interface';

export const PromotionsByPromoters: React.FC = () => {
  const form = useForm<Filters>({
    mode: 'onBlur',
  });
  const filters = form.watch();

  const promotersProgress = useGetPromotersProgress(filters);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <FormProvider {...form}>
        <FiltersModal onClose={onClose} isOpen={isOpen} />
      </FormProvider>

      <Container mt={8}>
        <Heading> Torre de Vigilancia </Heading>
        <PromotionsTotal />
      </Container>
      <Container mt={8}>
        <Heading size={'lg'}> Detalle del progreso </Heading>
        <Text> Avance por promotor </Text>

        <Flex justifyContent={'space-between'}>
          <IconButton onClick={onOpen} aria-label={'filtrar'} icon={<FaFilter />}></IconButton>
          <Link to={routes.createPromoter}>
            <Button> Crear nuevo </Button>
          </Link>
        </Flex>

        {promotersProgress.isSuccess ? (
          <PromoterProgressList dataSource={promotersProgress.data.data} />
        ) : null}
        {promotersProgress.isLoading ? <Spinner /> : null}
      </Container>
    </>
  );
};

export default PromotionsByPromoters;
