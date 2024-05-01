import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Profile } from '../../shared-types';

export const useGetProfile = (): Profile | null => {
  const context = useContext(AppContext);
  return context.profile;
};
