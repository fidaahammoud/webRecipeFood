import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import CategoriesList from '../components/CategoriesList';


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
  const response = await fetch("http://192.168.56.10:80/laravel/api/categories");
  console.log(response)
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch categories.' },
      {
        status: 500,
      }
    );
  } else {
    const responseData = await response.json();
    console.log(responseData); 
    return responseData.data;

  }
}

export function loader() {
    return defer({
      categories: loadCategories(), 
    });
}

  
