import React, { useState } from 'react';
import AddRecipeFormPage from '../components/AddRecipeForm';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';

import UploadImageToDB from '../components/ImageUpload.js';
import { useNavigate } from 'react-router-dom'; 

const httpService = new HttpService();

function AddRecipeDeatilsPage() {
  const [imageId, setImageId] = useState(null);
  const [ingredients, setIngredients] = useState([{ name: '', unit: '' }]);
  const [steps, setSteps] = useState(['']);
  const [drinks, setdrinks] = useState([]);
   

  const navigate = useNavigate(); 
  
  const handleSubmit = async (formData,steps) => {
    const token = authManagerInstance.getAuthToken();;
    const userId = authManagerInstance.getUserId();
    console.log("token : " + token);
    console.log("user id  : " + userId);

    try {
      const recipeData = {
        title: formData.get('title'),
        description: formData.get('description'),
        preparationTime: formData.get('preparationTime'),
        comment: formData.get('comment'),
        image_id: imageId,
        category_id: formData.get('category'), 
        dietary_id: formData.get('dietary'), 
        ingredients: ingredients.map(ingredient => ({
          ingredientName: ingredient.name,
          measurementUnit: ingredient.unit
        })),
        preparationSteps: steps,

      };
      console.log(recipeData);

      const API_HOST = process.env.REACT_APP_API_URL;
      console.log("API ADD RECIPE : " + `${API_HOST}/api/recipes`);
      const url = `${API_HOST}/api/recipes`;

      const response = await httpService.post(url, recipeData, token);
      const newRecipeId = response.id;
      console.log("NEW RECIPE ID : "+newRecipeId);
      console.log(response);

      navigate('/');


    } catch (error) {
      console.error('Error adding a recipe:', error);
    }
  };

  const handleImageUpload = (imageId) => {
    setImageId(imageId);
  };

  return (
    <>
      <UploadImageToDB onImageUpload={handleImageUpload} />
      <AddRecipeFormPage
        onSubmit={handleSubmit}
        ingredients={ingredients}
        setIngredients={setIngredients}
        steps={steps} 
        
        setSteps={setSteps}
      />
    </>
  );
}

export default AddRecipeDeatilsPage;
