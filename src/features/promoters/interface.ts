import { Citizen } from '../citizens/interface';

export type Promoter = Citizen & {
  promotionGoal: string;
};

export type PromoterProgress = {
  id: string;
  label: string;
  goal: number;
  promotions: number;
  progress: number;
};

export type PromoterProgressResponse = PromoterProgress[];
