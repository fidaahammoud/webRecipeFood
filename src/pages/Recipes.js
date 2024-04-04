import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import RecipesList from '../components/RecipesList';

import HttpService from '../components/HttpService';

const httpService = new HttpService();


function RecipesPage() {
  const { recipes } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={recipes}>
        {(loadedRecipes) => <RecipesList recipes={loadedRecipes} />}
      </Await>
    </Suspense>
  );
}

export default RecipesPage;

async function loadRecipes() {

  const API_HOST = process.env.REACT_APP_API_URL;
  const url = API_HOST+"/recipes?sort=-created_at";
  const response = await httpService.get(url,null);
  return response.data;


  // const response = await fetch("http://192.168.56.10:80/laravel/api/recipes?sort=-created_at");
    
  // if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
  //   throw json(
  //     { message: 'Could not fetch recipes.' },
  //     {
  //       status: 500,
  //     }
  //   );
  // } else {
  //   const responseData = await response.json();
  //   console.log(responseData); 
  //   return responseData.data;

  // }
}

export function loader() {
    return defer({
      recipes: loadRecipes(),
    });
}
  
