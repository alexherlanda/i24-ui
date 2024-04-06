import { CreatePromotion } from './features/promotions/';
import { CreatePromoter } from './features/promoters';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/:promoterId/promote',
    element: <CreatePromotion />,
  },
  {
    path: '/',
    element: <CreatePromoter />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
