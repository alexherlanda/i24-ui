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
import { Redirector } from './features/home/components/Redirector';

function App() {
  const profile = useGetProfile();
  const createRouterPayload = () => {
    if (profile?.role === 'admin') {
      return [
        {
          path: routes.home,
          element: <Redirector />,
        },
        {
          path: routes.createPromotion,
          element: <CreatePromotion />,
        },
        {
          path: routes.createPromoter,
          element: <CreatePromoter />,
        },
        {
          path: routes.updatePromoter,
          element: <UpdatePromoter />,
        },
        {
          path: routes.watchTower,
          element: <PromotionsByPromoters />,
        },
        { path: '*', element: <p> 404 </p> },
      ];
    } else if (profile?.role === 'promoter') {
      return [
        {
          path: routes.home,
          element: <Redirector />,
        },
        {
          path: routes.promoterProfile,
          element: <PromotionsByPromoter />,
        },
        {
          path: routes.createPromotion,
          element: <CreatePromotion />,
        },
        { path: '*', element: <p> 404 </p> },
      ];
    }
    return [{ path: '*', element: <p> 404 </p> }];
  };

  const router = createBrowserRouter(createRouterPayload());

  return (
    <>
      <LoginDrawer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
