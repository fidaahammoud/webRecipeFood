import React, { useState, useEffect } from 'react';
import { Form, useParams, useNavigate } from 'react-router-dom'; 
import classes from '../css/AddRecipeForm.module.css';
import CategoryFetcher from './CategoryFetcher';
import DietaryFetcher from './DietaryFetcher';
import authManagerInstance from '../components/AuthManager';
import HttpService from '../components/HttpService';

function EditRecipeFormPage({ onSubmit }) { 
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const httpService = new HttpService();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [localSteps, setLocalSteps] = useState(['']);
    const [localIngredients, setLocalIngredients] = useState([{ name: '', unit: '' }]);
    const [preparationTime, setPreparationTime] = useState('');
    const [comments, setComments] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDietary, setSelectedDietary] = useState('');
    const [imageId, setImageId] = useState('');

    useEffect(() => {
        fetchRecipeDetails();
    }, []);

    const fetchRecipeDetails = async () => {
        const userId = authManagerInstance.getUserId();
        const token = authManagerInstance.getAuthToken();
        const API_HOST = process.env.REACT_APP_API_URL;

        try {
            const response = await httpService.get(`${API_HOST}/api/${userId}/recipes/${recipeId}`, token);
            const recipeData = response;  
            if(userId == response.user.id){
                setTitle(recipeData.title);
                setDescription(recipeData.description);
                setLocalSteps(recipeData.steps.map(step => step.stepDescription));
                setLocalIngredients(recipeData.ingredients.map(ingredient => ({ name: ingredient.ingredientName, unit: ingredient.measurementUnit })));
                setPreparationTime(recipeData.preparationTime.toString());
                setComments(recipeData.comment);
                setSelectedCategory(recipeData.category_id.toString());
                setSelectedDietary(recipeData.dietary_id.toString());
                setImageId(recipeData.image_id.toString());
            }
            else{
                navigate('/error');
            }
          

            console.log("image id: "+recipeData.image_id.toString());
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    const handleIngredientChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...localIngredients];
        list[index][name] = value;
        setLocalIngredients(list);
    };

    const handleStepChange = (index, event) => {
        const list = [...localSteps];
        list[index] = event.target.value;
        setLocalSteps(list);
    };

    const handleAddIngredient = () => {
        setLocalIngredients([...localIngredients, { name: '', unit: '' }]);
    };

    const handleAddStep = () => {
        setLocalSteps([...localSteps, '']);
    };

    const handleDeleteIngredient = index => {
        if (localIngredients.length > 1) {
            const list = [...localIngredients];
            list.splice(index, 1);
            setLocalIngredients(list);
        }
    };

    const handleDeleteStep = index => {
        if (localSteps.length > 1) {
            const list = [...localSteps];
            list.splice(index, 1);
            setLocalSteps(list);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        onSubmit(formData, localSteps,localIngredients,imageId);
    };

    return (
        <>
            <Form method='post' className={classes.form} onSubmit={handleSubmit}>
                <h1>Edit Recipe</h1>
                <div>
                    <label htmlFor="title">Title</label>
                    <input 
                        id="title" 
                        type="text" 
                        name="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input 
                        id="description" 
                        type="text" 
                        name="description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="preparationTime">Preparation Time</label>
                    <input 
                        id="preparationTime" 
                        type='number' 
                        name="preparationTime" 
                        value={preparationTime}
                        onChange={(e) => setPreparationTime(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input 
                        id="comment" 
                        type='text' 
                        name="comment" 
                        value={comments}
                        onChange={(e) => setComments(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select 
                        id="category" 
                        name="category" 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)} 
                        required
                    >
                        <option value="">Select a category</option>
                        <CategoryFetcher/>
                    </select>
                </div>
                <div>
                    <label htmlFor="dietary">Dietary</label>
                    <select 
                        id="dietary" 
                        name="dietary" 
                        value={selectedDietary}
                        onChange={(e) => setSelectedDietary(e.target.value)} 
                        required
                    >
                        <option value="">Select a Dietary</option>
                        <DietaryFetcher/>
                    </select>
                </div>
                {/* Ingredients */}
                {localIngredients.map((ingredient, index) => (
                    <div key={index} className={classes.inputRow}>
                        <input
                            type="text"
                            name="name"
                            value={ingredient.name}
                            onChange={e => handleIngredientChange(index, e)}
                            placeholder="Ingredient"
                            required
                        />
                        <input
                            type="text"
                            name="unit"
                            value={ingredient.unit}
                            onChange={e => handleIngredientChange(index, e)}
                            placeholder="Unit of Measurement"
                            required
                        />
                        {localIngredients.length > 1 && (
                            <button type="button" onClick={() => handleDeleteIngredient(index)}>Delete</button>
                        )}
                        {index === localIngredients.length - 1 && (
                            <button type="button" onClick={handleAddIngredient}>+</button>
                        )}
                    </div>
                ))}
                {/* Steps */}
                {localSteps.map((step, index) => (
                    <div key={index} className={classes.inputRow}>
                        <textarea
                            name={`step${index + 1}`} 
                            value={step}
                            onChange={e => handleStepChange(index, e)}
                            placeholder={`Step ${index + 1}`}
                            required
                        />
                        {localSteps.length > 1 && (
                            <button type="button" onClick={() => handleDeleteStep(index)}>Delete</button>
                        )}
                        {index === localSteps.length - 1 && (
                            <button type="button" onClick={handleAddStep}>+</button>
                        )}
                    </div>
                ))}
                <div className={classes.actions}>
                    <button type="submit">Save</button>
                    <button type="button">Cancel</button>
                </div>
            </Form>
        </>
    );
}

export default EditRecipeFormPage;
