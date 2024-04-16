import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import ChefsList from '../components/ChefsList';

import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';

const httpService = new HttpService();

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
  const API_HOST = process.env.REACT_APP_API_URL;
  const url = `${API_HOST}/api/users`;
  
  const loggedInUserId = authManagerInstance.getUserId(); 

  const response = await httpService.get(url, null);
  const filteredChefs = response.data.filter(chef => chef.id !== loggedInUserId);
  return filteredChefs;
}

export function loader() {
  return defer({
    chefs: loadChefs(), 
  });
}
