import { Citizen } from '../citizens';

export type GlobalOverview = {
  totalPromotions: number;
  totalGoals: number;
};

export type Promotion = {
  id: string;
  promoterId: string;
  promotedPersonId: string;
  promotionDate: string;
  status: string;
  Citizens: Citizen;
};

export type PromotionsByPromotionsResponse = Promotion[];

export type FiltersForm = {
  electoralSectionId?: string;
  tag?: string;
};
