import { Suspense } from 'react';
import {
  useRouteLoaderData,
  defer,
  Await,
} from 'react-router-dom';

import ChefInfo from '../components/ChefInfo';
import RecipesList from '../components/RecipesList';

import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';


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
  const token = authManagerInstance.getAuthToken();;
  const userId = authManagerInstance.getUserId();
  console.log(token);
  console.log(userId);

  const API_HOST = process.env.REACT_APP_API_URL;
  const url = `${API_HOST}/api/users/${userId}/${userId}`;
  const response = await httpService.get(url,token);

  console.log("user details : "+response)

  return response;

}

async function loadChefRecipes() {
  const userId = authManagerInstance.getUserId();
  const token = authManagerInstance.getAuthToken();;

  const API_HOST = process.env.REACT_APP_API_URL;
  const url = `${API_HOST}/api/users/${userId}/recipes?sort=-created_at`;
  const response = await httpService.get(url,token);
  return response.data;
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

