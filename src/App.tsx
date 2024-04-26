import {
  CreatePromotion,
  PromotionsByPromoters,
  PromotionsByPromoter,
} from './features/promotions/';
import { CreatePromoter } from './features/promoters';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './constants';
import { LoginDrawer } from './features/login/components/LoginDrawer';
import { useGetProfile } from './global/hooks/useGetProfile';
import { UpdatePromoter } from './features/promoters/components/UpdatePromoter';

function App() {
  const profile = useGetProfile();
  const createRouterPayload = [
    {
      path: routes.promoterProfile,
      element: <PromotionsByPromoter />,
    },
    {
      path: routes.createPromotion,
      element: <CreatePromotion />,
    },
  ];

  if (profile?.role === 'admin') {
    createRouterPayload.push(
      {
        path: routes.createPromoter,
        element: <CreatePromoter />,
      },
      {
        path: routes.updatePromoter,
        element: <UpdatePromoter />,
      },
      {
        path: routes.home,
        element: <PromotionsByPromoters />,
      },
    );
  }
  const router = createBrowserRouter(createRouterPayload);

  return (
    <>
      <LoginDrawer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
