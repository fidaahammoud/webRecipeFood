import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import DietriesList from '../components/DietariesList';

import HttpService from '../components/HttpService';

const httpService = new HttpService();

function DietariesPage() {
  const { dietaries } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={dietaries}>
        {(loadedDietaries) => <DietriesList dietaries={loadedDietaries} />}
      </Await>
    </Suspense>
  );
}

export default DietariesPage;

async function loadDietaries() {

  const API_HOST = process.env.REACT_APP_API_URL;
  const url = `${API_HOST}/api/dietaries`;
  const response = await httpService.get(url,null);
  console.log(response);
  return response;


}

export function loader() {
    return defer({
      dietaries: loadDietaries(), 
    });
}

  
