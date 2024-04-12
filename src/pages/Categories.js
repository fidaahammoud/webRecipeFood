import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import CategoriesList from '../components/CategoriesList';

import HttpService from '../components/HttpService';

const httpService = new HttpService();

function CategoriesPage() {
  const { categories } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={categories}>
        {(loadedCategories) => <CategoriesList categories={loadedCategories} />}
      </Await>
    </Suspense>
  );
}

export default CategoriesPage;

async function loadCategories() {

  const API_HOST = process.env.REACT_APP_API_URL;
  const url = API_HOST+"/api/categories";
  const response = await httpService.get(url,null);
  return response.data;


}

export function loader() {
    return defer({
      categories: loadCategories(), 
    });
}

  
