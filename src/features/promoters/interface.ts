import { Citizen } from '../citizens/interface';

export type Promoter = Citizen & {
  id: string;
  promotionGoal: string;
  tag: string;
  weeklyCost: number;
};

export type PromoterProgress = {
  id: string;
  label: string;
  goal: number;
  promotions: number;
  progress: number;
  avatarInitials: string;
  weeklyCost: number;
};

export type PromoterProgressResponse = PromoterProgress[];
