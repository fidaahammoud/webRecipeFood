import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';


import RecipeItem from '../components/RecipeItem';

function RecipeDetailPage() {
    
  const { recipe } = useRouteLoaderData('recipe-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={recipe}>
          {(loadedRecipe) => <RecipeItem recipe={loadedRecipe} />}
        </Await>
      </Suspense>
    </>
  );
}

export default RecipeDetailPage;

async function loadRecipe(id) {
  const response = await fetch("http://192.168.56.10:80/laravel/api/recipes/" + id);

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
    const id = params.recipeId;
  
    return defer({
      recipe: await loadRecipe(id),
    });
  }
  


