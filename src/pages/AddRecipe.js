import React, { useState } from 'react';
import AddRecipeFormPage from '../components/AddRecipeForm';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';

import UploadImageToDB from '../components/ImageUpload.js';
import { useNavigate } from 'react-router-dom'; 

import Toast from '../components/Toast'; 
import 'react-toastify/dist/ReactToastify.css';



const httpService = new HttpService();

function AddRecipeDeatilsPage() {
  const [imageId, setImageId] = useState(null);
  const [ingredients, setIngredients] = useState([{ name: '', unit: '' }]);
  const [steps, setSteps] = useState(['']);
   
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  const navigate = useNavigate(); 
  
  const handleSubmit = async (formData,steps,ingredients) => {
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
      if(response.message === 'success'){
          setToastMessage("Recipe added successfully !");
          setToastType('success');
          setShowToast(true);
          setTimeout(navigateToHome, 1500);
        }
  
      else{
        console.log("else");
        setToastMessage(response.message);
        setToastType('error');
        setShowToast(true);
      }
     

    } catch (error) {
      console.error('Error adding a recipe:', error);
    }
  };

  const handleImageUpload = (imageId) => {
    setImageId(imageId);
  };

  function navigateToHome() {
    navigate('/');
}

  return (
    <>
      <AddRecipeFormPage
        onSubmit={handleSubmit}
        ingredients={ingredients}
        setIngredients={setIngredients}
        steps={steps} 
        
        setSteps={setSteps}
      />
      <UploadImageToDB onImageUpload={handleImageUpload} />

      {showToast && (
      <Toast message={toastMessage} type={toastType} />
    )}


    </>
  );
}

export default AddRecipeDeatilsPage;
