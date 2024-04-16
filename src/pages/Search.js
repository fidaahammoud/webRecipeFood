import { Suspense } from 'react';
import { useRouteLoaderData, json, defer, Await } from 'react-router-dom';

import SearchedRecipes from '../components/SearchedRecipes';

import HttpService from '../components/HttpService';
import { useParams } from 'react-router-dom';

const httpService = new HttpService();


function SearchPage() {
    const { searchTerm } = useParams();
    const { recipes, error } = useRouteLoaderData("search-recipe");
  
   
    return (
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={recipes}>
          {(loadedRecipes) => <SearchedRecipes recipes={loadedRecipes} />}
        </Await>
      </Suspense>
    );
  }

export default SearchPage;

async function loadRecipes(term) {
    try {
      const API_HOST = process.env.REACT_APP_API_URL;
      const url = `${API_HOST}/api/recipes/search`;
      const response = await httpService.post(url, { query: term }, null);
  
      const activeRecipes = response.data.filter(recipe => recipe.isActive === 1);
  
      return activeRecipes;
    } catch (error) {
      throw new Error("Error loading recipes");
    }
  }

  export function loader({ searchTerm }) {
    if (!searchTerm) {
      return defer({ recipes: [] });  
    }
  
    return defer({
      recipes: loadRecipes(searchTerm),
    });
  }
  
