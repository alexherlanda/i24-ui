import { VStack, Container } from '@chakra-ui/react';
import { PromoterProgress } from './PromoterProgress';
import { PromoterProgressResponse } from '../interface';

type Props = {
  dataSource: PromoterProgressResponse;
};

export const PromoterProgressList = ({ dataSource }: Props) => {
  return (
    <Container maxW="container.md" centerContent>
      <VStack mt={5} spacing={4} align="stretch" w="full">
        {dataSource.map((promoter) => (
          <PromoterProgress
            id={promoter.id}
            key={promoter.id}
            label={promoter.label}
            progress={promoter.progress}
            promotions={promoter.promotions}
            goal={promoter.goal}
            avatarInitials={promoter.avatarInitials}
            weeklyCost={Number(promoter.weeklyCost)}
          />
        ))}
      </VStack>
    </Container>
  );
};
