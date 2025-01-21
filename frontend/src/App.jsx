import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import ManageSpots from './components/ManageSpots/ManageSpots';
import HomeSpots from './components/HomeSpots/HomeSpots';
import SpotDetails from './components/SpotDetails/SpotDetails'; 
import UpdateSpotForm from './components/ManageSpots/UpdateSpotForm';
import CreateSpotForm from './components/CreateSpot/CreateSpotForm'; // Import the new CreateSpotForm component
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
        element: <HomeSpots />, 
      },
      {
        path: '/spots/:id',
        element: <SpotDetails />, 
      },
      {
        path: '/spots/new',
        element: <CreateSpotForm />, // New route for creating a spot
      },
      {
        path: "/manage-spots",
        element: <ManageSpots />, // New route for Manage Spots page
      },
      {
        path: "/spots/:spotId/edit",
        element: <UpdateSpotForm />, // New route for edit Spots page
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
