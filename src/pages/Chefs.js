import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import ChefsList from '../components/ChefsList';


function ChefsPage() {
  const { chefs } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={chefs}>
        {(loadedChefs) => <ChefsList chefs={loadedChefs} />}
      </Await>
    </Suspense>
  );
}

export default ChefsPage;

async function loadChefs() {
  const response = await fetch("http://192.168.56.10:80/laravel/api/users");

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch categories.' },
      {
        status: 500,
      }
    );
  } else {
    const responseData = await response.json();
    return responseData.data;

  }
}

export function loader() {
    return defer({
      chefs: loadChefs(), 
    });
}

  
