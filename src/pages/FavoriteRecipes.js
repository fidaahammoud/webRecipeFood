import { Suspense } from 'react';
import {
  useRouteLoaderData,
  defer,
  Await,
} from 'react-router-dom';

import ChefInfo from '../components/ChefInfo';
import FavoriteRecipesList from '../components/FavoriteRecipesList';

import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';


const httpService = new HttpService();

function FavoriteRecipesPage() {
  const { user, recipes } = useRouteLoaderData("myfavorite-recipes");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={[user, recipes]}> 
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

export default FavoriteRecipesPage;


async function loadChefInfo() {
  const token = authManagerInstance.getAuthToken();;
  const userId = authManagerInstance.getUserId();
  console.log(token);
  console.log(userId);

  const API_HOST = process.env.REACT_APP_API_URL;
  const url = `${API_HOST}/api/users/${userId}/${userId}`;

  console.log(url);

  const response = await httpService.get(url,token);

  console.log("user details : "+response)

  return response;

}

async function loadFavoriteRecipesRecipes() {
  const userId = authManagerInstance.getUserId();
  const token = authManagerInstance.getAuthToken();;

  const API_HOST = process.env.REACT_APP_API_URL;
  const url = `${API_HOST}/api/users/${userId}/favorites`;
  const response = await httpService.get(url,token);
  console.log(response.data);
  return response.data;
}

export async function loader({ request, params }) {

  const [user, recipes] = await Promise.all([
    loadChefInfo(),
    loadFavoriteRecipesRecipes(), 
  ]);

  return defer({
    user,
    recipes, 
  });
}

