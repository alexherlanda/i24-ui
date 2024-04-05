import { Citizen } from '../citizens/interface';

export type Promoter = Citizen & {
  promotionGoal: string;
};
