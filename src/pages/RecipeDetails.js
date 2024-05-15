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
import authManagerInstance from '../components/AuthManager';

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
  const userId = authManagerInstance.getUserId();
  const token = authManagerInstance.getAuthToken();;
  const API_HOST = process.env.REACT_APP_API_URL;
  const url =   `${API_HOST}/api/${userId}/recipes/${id}`;
  console.log(url);
  const response = await httpService.get(url,token);
  console.log(response.creator_id);
  console.log(userId);

  if(response.isActive === 1  || response.creator_id === parseInt(userId)){
    return response;
  }
  else{
    throw json({ message: 'Recipe not active!' }, { status: 500 });
  }

}



export async function loader({ request, params }) {
    const id = params.recipeId;
  
    return defer({
      recipe: await loadRecipe(id),
    });
  }
  


