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
              {loadedRecipes && <RecipesList recipes={loadedRecipes} />} 
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default ChefDetailPage;


async function loadChefInfo(chefId) {
 
  const API_HOST = process.env.REACT_APP_API_URL;
  const url = API_HOST+"/users/"+chefId;

  const response = await httpService.get(url,null);
  return response;

  // const response = await fetch(`http://192.168.56.10:80/laravel/api/users/${chefId}`);
  // if (!response.ok) {
  //   throw json(
  //     { message: 'Could not fetch details for selected chef.' },
  //     { status: 500 }
  //   );
  // }
  // const resData = await response.json();
  // return resData;
}

async function loadChefRecipes(chefId) {
  // Replace with your actual recipe API endpoint URL
  const response = await fetch(`http://192.168.56.10:80/laravel/api/users/${chefId}/recipes`);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch recipes for this chef.' },
      { status: 500 }
    );
  }
  const recipesData = await response.json();
  return recipesData.data;
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

