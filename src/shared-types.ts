export type CreatePromoterPayload = {
  name: string;
  firstSurname: string;
  secondSurname: string;
  electorKey: string;
  phoneNumber: string;
  electoralSectionId: number;
  postalCode: string;
  tag: string;
  weeklyCost: number;
  promotionGoal: number;
};

//(PATCH) promoters/id
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

export type ReadPromoterResponse = {
  weeklyCost: number;
  promotionGoal: number;
  tag: string;
  citizenId: string;

  Citizen: {
    id: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
    hasVoted: boolean;
    electoralSectionId: number;
    electorKey: string;
    User?: {
      isActive: boolean;
    };
    Address: {
      phoneNumber: number;
    };
  };
};

export type Role = 'admin' | 'promoter';

//POST users/
export type CreateUserPayload = {
  username: string;
  role: Role;
  password?: string;
  citizenId: string;
};

export type CreateUserResponse = {
  username: string;
  password?: string;
};
