import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import ChefInfo from '../components/ChefInfo';
import FavoriteRecipesList from '../components/FavoriteRecipesList';

import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';

const httpService = new HttpService();



function ChefDetailPage() {
  const { chef, recipes } = useRouteLoaderData("chef-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={[chef, recipes]}> 
          {([loadedChefInfo, loadedRecipes]) => (
            <>
              <ChefInfo chef={loadedChefInfo} />
              {loadedRecipes && <FavoriteRecipesList recipes={loadedRecipes} />} 
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default ChefDetailPage;


async function loadChefInfo(chefId) {
 
  const userId = authManagerInstance.getUserId();
  const token = authManagerInstance.getAuthToken();;
  const API_HOST = process.env.REACT_APP_API_URL;
  const url = `${API_HOST}/api/users/${userId}/${chefId}`;
  console.log(url);
  const response = await httpService.get(url,token);
  return response;

}

async function loadChefRecipes(chefId) {



  const userId = authManagerInstance.getUserId();
  const token = authManagerInstance.getAuthToken();;
  const API_HOST = process.env.REACT_APP_API_URL;
  
  const url = `${API_HOST}/api/users/${chefId}/recipes?sort=-created_at`;
  console.log(url);
  const response = await httpService.get(url,token);
  return response.data;
}

export async function loader({ request, params }) {
  const id = params.chefId;

  const [chef, recipes] = await Promise.all([
    loadChefInfo(id),
    loadChefRecipes(id), 
  ]);

  return defer({
    chef,
    recipes, 
  });
}

