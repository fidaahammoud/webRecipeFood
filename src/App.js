import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from './pages/Error';


import RecipesPage, { loader as recipesLoader } from './pages/Recipes';
import RecipeDetailPage, { loader as recipeDeatailsLoader } from './pages/RecipeDetails';

import CategoriesPage, { loader as categoriesLoader } from './pages/Categories';
import CategoryDetailPage, { loader as categoryDetailsLoader } from './pages/CategoryDetail';


import HomePage from './pages/Home';
import RootLayout from './pages/Root';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true, element: <HomePage /> 
      },

      {
        path: 'recipes',
        element: <RecipesPage />,
        loader: recipesLoader,
      },
      
      {
        path: 'recipes/:recipeId',
        id: 'recipe-detail',
        element: <RecipeDetailPage />,
        loader: recipeDeatailsLoader,
      },

      {
        path: 'categories',
        element: <CategoriesPage />,
        loader: categoriesLoader,
      },

      {
        path: 'categories/:categoryId',
        id: 'category-detail',
        element: <CategoryDetailPage />,
        loader: categoryDetailsLoader,
      }
      
     
      

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;