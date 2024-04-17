import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';

import ErrorPage from './pages/Error';


import RecipesPage, { loader as recipesLoader } from './pages/Recipes';
import RecipeDetailPage, { loader as recipeDeatailsLoader } from './pages/RecipeDetails';

import CategoriesPage, { loader as categoriesLoader } from './pages/Categories';
import CategoryDetailPage, { loader as categoryDetailsLoader } from './pages/CategoryDetail';


import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import ChefsPage, { loader as chefsLoader } from './pages/Chefs';
import ChefDetailPage, { loader as chefDetailLoader } from './pages/ChefDetail';
import AuthenticationPage, { action as authAction } from './pages/Authentication';

import CompleteAuthPage from './pages/CompleteAuth';

import MyProfilePage, { loader as profileDetailLoader } from './pages/MyProfile';
import { action as logoutAction } from './pages/Logout';

import AddRecipeDeatilsPage from './pages/AddRecipe';
import EditRecipeDetailsPage from './pages/EditRecipe';
import EditProfilePage from './pages/EditProfile';
import SearchPage , { loader  }from './pages/Search';
import NotificationsPage, { loader as notificationsLoader } from './pages/Notifications';
import SortedRecipesPage, { loader as loadSortedRecipes } from './pages/SortedRecipes';
import FollowingsPage, { loader as loadFollowings } from './pages/Followings';

import authManagerInstance from './components/AuthManager';
const isAuthenticated = authManagerInstance.getIsAuthenticated();

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
        path: 'recipes/sort/:sortingCriteria',
        element: <SortedRecipesPage />,
        loader: loadSortedRecipes,
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
      },
      
      {
        path: 'chefs',
        element: <ChefsPage />,
        loader: chefsLoader,
      },

      {
        path: 'chefs/:chefId',
        id: 'chef-detail',
        element: <ChefDetailPage />,
        loader: chefDetailLoader,
      },

      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction

      },
      {
        path: 'auth/additional-details',
        element: <CompleteAuthPage />,
      },

      {
        path: 'profile',
        id: 'myPresonal-detail',
        element:  <MyProfilePage /> ,
        loader: profileDetailLoader,
      },

      {
        path: 'addRecipe',
        element: <AddRecipeDeatilsPage/>,
      },
      {
        path: 'editRecipe/:recipeId',
        id: 'edit-recipe',
        element: <EditRecipeDetailsPage/>,
      },


      {
        path: 'editProfile/:userId',
        id: 'edit-profile',
        element: <EditProfilePage/>,
      },

      {
        path: 'search/:searchTerm',
        id: 'search-recipe',
        element: <SearchPage/>,
        loader: ({ params }) => loader(params),

      },

      {
        path: 'notifications',
        element: <NotificationsPage />,
        loader: notificationsLoader,
      },


      {
        path: 'followings',
        element: <FollowingsPage />,
        loader: loadFollowings,
      },




      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  useEffect(() => {
    const handleRefresh = () => {
      console.log("Page is refreshing");
      authManagerInstance.refresh();
    };

    window.addEventListener('beforeunload', handleRefresh);

    return () => {
      window.removeEventListener('beforeunload', handleRefresh);
    };
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
