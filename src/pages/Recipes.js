import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import RecipesList from '../components/RecipesList';

import HttpService from '../components/HttpService';

const httpService = new HttpService();


function RecipesPage() {
  const { recipes } = useLoaderData();


  const setSortingCriteria = (criteria) => {
    console.log(`Sorting by: ${criteria}`);
  };

  
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={recipes}>
        {(loadedRecipes) => <RecipesList recipes={loadedRecipes} setSortingCriteria={setSortingCriteria} />
}
      </Await>
    </Suspense>
  );
}

export default RecipesPage;

async function loadRecipes() {

  const API_HOST = process.env.REACT_APP_API_URL;
  console.log(API_HOST);
  const url = API_HOST+"/api/recipes?sort=-created_at";
  console.log(url);
  const response = await httpService.get(url,null);
  const activeRecipes = response.data.filter(recipe => recipe.isActive === 1);

  return activeRecipes;

}

export function loader() {
    return defer({
      recipes: loadRecipes(),
    });
}
  
