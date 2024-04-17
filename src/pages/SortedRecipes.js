import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import RecipesList from '../components/RecipesList';

import HttpService from '../components/HttpService';

const httpService = new HttpService();


function RecipesPage() {
  const { recipes } = useLoaderData();
  //const { sortingCriteria } = useParams();


  const setSortingCriteria = (criteria) => {
    console.log(`Sorting by: ${criteria}`);
  };

  
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={recipes}>
        {(loadedRecipes) => <RecipesList recipes={loadedRecipes}  setSortingCriteria={setSortingCriteria}/>}
      </Await>
    </Suspense>
  );
}

export default RecipesPage;

async function loadSortedRecipes(sortingCriteria) {
    const API_HOST = process.env.REACT_APP_API_URL;

    let sortOrder;

  switch (sortingCriteria) {
    case 'totalLikes':
      sortOrder = '-totalLikes';
      break;
    case 'avrgRating':
      sortOrder = '-avrgRating';
      break;
    case 'preparationTime':
      sortOrder = '-preparationTime';
      break;
    default:
      sortOrder = '-created_at';
      break;
  }


  console.log(API_HOST);
 

  const url = API_HOST+"/api/recipes?sort="+sortOrder;
  console.log("SORTING URL : ");
  console.log(url);
  const response = await httpService.get(url,null);
  const activeRecipes = response.data.filter(recipe => recipe.isActive === 1);

  return activeRecipes;

}

export function loader({ params }) {
  return defer({
    recipes: loadSortedRecipes(params.sortingCriteria),
  });
}
