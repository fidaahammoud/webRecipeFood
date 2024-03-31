import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';


import CategoryItem from '../components/CategoryItem';

function CategoryDetailPage() {
    
  const { category } = useRouteLoaderData('category-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={category}>
          {(loadedCategoryRecipe) => <CategoryItem category={loadedCategoryRecipe} />}
        </Await>
      </Suspense>
    </>
  );
}

export default CategoryDetailPage;

async function loadCategory(id) {
  const response = await fetch("http://192.168.56.10:80/laravel/api/categories/" + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected recipe.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}



export async function loader({ request, params }) {
    const id = params.categoryId;
  
    return defer({
      category: await loadCategory(id),
    });
  }
  


