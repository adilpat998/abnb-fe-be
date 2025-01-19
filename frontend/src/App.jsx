import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomeSpots from './components/HomeSpots/HomeSpots';
import SpotDetails from './components/SpotDetails/SpotDetails'; // Import SpotDetails component
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(187, 0, 0))",
        minHeight: "100vh",
        padding: "0",
        margin: "0",
      }}
    >
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomeSpots />, // Render HomeSpots on the home page
      },
      {
        path: '/spots/:id',
        element: <SpotDetails />, // Render SpotDetails when visiting /spots/:id
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
