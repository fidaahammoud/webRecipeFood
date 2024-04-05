import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';


import RecipeItem from '../components/RecipeItem';

import HttpService from '../components/HttpService';

const httpService = new HttpService();

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
  
  const API_HOST = process.env.REACT_APP_API_URL;
  const url = API_HOST+"/recipes/"+id;
  const response = await httpService.get(url,null);
  return response;

}



export async function loader({ request, params }) {
    const id = params.recipeId;
  
    return defer({
      recipe: await loadRecipe(id),
    });
  }
  


