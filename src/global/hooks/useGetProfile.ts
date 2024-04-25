import { useContext } from 'react';
import { AppContext } from '../AppContext';

type User = {
  role: string;
};

export const useGetProfile = (): User | null => {
  const { profile: user } = useContext(AppContext);
  return user;
};
