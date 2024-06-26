import { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  const token = useLoaderData(); 

  useEffect(() => {
    if (!token) {
      return;
    }
  }, [token]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
