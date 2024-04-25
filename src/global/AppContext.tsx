import React, { createContext, ReactNode } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

interface User {
  id: string;
  role: string;
}

interface AppState {
  profile: User | null;
  setProfile: (user: User | null) => void;
}

const defaultAppState: AppState = {
  profile: null,
  setProfile: () => {},
};

export const AppContext = createContext<AppState>(defaultAppState);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [profile, setProfile] = useLocalStorage<User | null>('profile', null);

  const value = {
    profile,
    setProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
