import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import ChefInfo from '../components/ChefInfo';
import RecipesList from '../components/RecipesList';

import HttpService from '../components/HttpService';
import { getAuthToken, getUserId } from '../components/auth.js';


const httpService = new HttpService();

function MyProfilePage() {
  const { user, recipes } = useRouteLoaderData("myPresonal-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={[user, recipes]}> 
          {([loadedChefInfo, loadedRecipes]) => (
            <>
              <ChefInfo chef={loadedChefInfo} />
              {loadedRecipes && <RecipesList recipes={loadedRecipes} />} 
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default MyProfilePage;


async function loadChefInfo() {
    const token = getAuthToken();
    const userId = getUserId();
    console.log(token);
  const API_HOST = process.env.REACT_APP_API_URL;
  const url = API_HOST+"/users/"+userId;
  const response = await httpService.get(url,token);

  console.log("user details : "+response)

  return response;

}

async function loadChefRecipes() {
    const userId = getUserId();

  const response = await fetch(`http://192.168.56.10:80/laravel/api/users/${userId}/recipes`);
  const recipesData = await response.json();
  console.log("recipesData : "+recipesData)
  return recipesData.data;
}

export async function loader({ request, params }) {

  const [user, recipes] = await Promise.all([
    loadChefInfo(),
    loadChefRecipes(), 
  ]);

  return defer({
    user,
    recipes, 
  });
}

