export type UpdatePromoterPayload = {
  promoter: {
    id: string;
    promotionGoal?: number;
    tag?: string;
    weeklyCost?: number;
  };
  citizen?: {
    name?: string;
    firstSurname?: string;
    secondSurname?: string;
    electorKey?: string;
    electoralSectionId?: number;
    address?: {
      phoneNumber?: string;
      postalCode?: string;
    };
  };
};
