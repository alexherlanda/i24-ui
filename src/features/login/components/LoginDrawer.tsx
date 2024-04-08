import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent } from '@chakra-ui/react';
import { LoginForm } from './LoginForm';
import { useState } from 'react';

export const LoginDrawer = () => {
  const accessToken = localStorage.getItem('access');

  const token = localStorage.getItem('token');

  const [drawerIsOpen, setDrawerIsOpen] = useState(!token);

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  const handleClose = () => {
    if (accessToken) {
      setDrawerIsOpen(false);
    }
  };

  return (
    <>
      <Drawer isOpen={drawerIsOpen} placement="right" onClose={handleClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader as="h2" mt={2}>
            Inicia sesion
          </DrawerHeader>

          <DrawerBody>
            <LoginForm closeDrawer={closeDrawer} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
