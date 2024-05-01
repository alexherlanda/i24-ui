import React, { createContext, ReactNode } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Profile } from '../shared-types';

interface AppState {
  profile: Profile | null;
  saveProfile: (user: Profile) => void;
}

const defaultAppState: AppState = {
  profile: null,
  saveProfile: () => {},
};

export const AppContext = createContext<AppState>(defaultAppState);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [profile, setProfile] = useLocalStorage<Profile | null>('profile', null);

  const saveProfile = (profile: Profile) => {
    setProfile(profile);
  };

  const value = {
    profile,
    saveProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
