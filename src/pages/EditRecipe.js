import React, { useState } from 'react';
import EditRecipeFormPage from '../components/EditRecipeForm';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';
import UploadImageToDB from '../components/ImageUpload.js';
import { useNavigate, useParams } from 'react-router-dom';

const httpService = new HttpService();

function EditRecipeDetailsPage() {
    const [imageId, setImageId] = useState(null);
    const [ingredients, setIngredients] = useState([{ name: '', unit: '' }]);
    const [steps, setSteps] = useState(['']);
    const { recipeId } = useParams();

    const navigate = useNavigate();

    const handleSubmit = async (formData, steps, ingredients, imageIdFromForm) => {
        const token = authManagerInstance.getAuthToken();
        const userId = authManagerInstance.getUserId();
    
        try {
            let updatedImageId = imageIdFromForm; 
    
            if (imageId !== null) {
                updatedImageId = imageId; 
            }
    
            console.log("updatedImageId "+updatedImageId);
            const recipeData = {
                title: formData.get('title'),
                description: formData.get('description'),
                preparationTime: formData.get('preparationTime'),
                comment: formData.get('comment'),
                image_id: updatedImageId,
                category_id: formData.get('category'),
                dietary_id: formData.get('dietary'),
                ingredients: ingredients.map(ingredient => ({
                    ingredientName: ingredient.name,
                    measurementUnit: ingredient.unit
                })),
                preparationSteps: steps,
            };
    
            const API_HOST = process.env.REACT_APP_API_URL;
            const url = `${API_HOST}/api/recipes/${recipeId}`;
    
            const response = await httpService.put(url, recipeData, token);
            console.log(response);
            const newRecipeId = response.id;
            console.log("NEW RECIPE ID : " + newRecipeId);
            console.log(response);
            if (response && response.message === 'Recipe details updated successfully' ) {
                navigate('/');
            }
    
        } catch (error) {
            console.error('Error updating a recipe:', error);
        }
    };
    

    const handleImageUpload = (imageId) => {
        setImageId(imageId);
    };

    

    return (
        <>
            <EditRecipeFormPage
                 onSubmit={handleSubmit}
                 ingredients={ingredients}
                 setIngredients={setIngredients}
                 steps={steps}
                 setSteps={setSteps}
                 imageId={imageId}  
            />
            <UploadImageToDB onImageUpload={handleImageUpload} />
        </>
    );
}

export default EditRecipeDetailsPage;
