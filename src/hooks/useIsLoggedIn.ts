import { useEffect, useState } from 'react';
import { validateTokenExists } from '../utils/tokenHelpers';

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log('token', token);
    const tokenExists = validateTokenExists();
    setIsLoggedIn(tokenExists);
  }, [token]);

  return isLoggedIn;
};
