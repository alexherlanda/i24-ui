import { CreatePromotion, PromotionsByPromoters } from './features/promotions/';
import { CreatePromoter } from './features/promoters';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './constants';
import { LoginDrawer } from './features/login/components/LoginDrawer';
const router = createBrowserRouter([
  {
    path: routes.createPromotion,
    element: <CreatePromotion />,
  },
  {
    path: routes.createPromoter,
    element: <CreatePromoter />,
  },
  {
    path: routes.home,
    element: <PromotionsByPromoters />,
  },
]);
function App() {
  return (
    <>
      <LoginDrawer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
