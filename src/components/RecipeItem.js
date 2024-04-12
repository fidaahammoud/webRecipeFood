import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import classes from '../css/RecipeItem.module.css';
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';

const httpService = new HttpService();

function RecipeItem({ recipe }) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const loggedInUser = authManagerInstance.getUserId();
  const navigate = useNavigate(); 

  const API_HOST = process.env.REACT_APP_API_URL;



  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  };

  const displayEditAndDelete = () => {
    if (loggedInUser === recipe.user.id) {
      return (
        <div className={classes.editDelete}>
          <button onClick={() => handleEdit(recipe.id)}><FontAwesomeIcon icon={faEdit} /></button>
          <button onClick={() => handleDelete(recipe.id)}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      );
    }
  };

  const handleEdit = (recipeId) => {
    console.log("Editing recipe with ID:", recipeId);
  };

  const handleDelete = async (recipeId) => {
    console.log("Deleting recipe with ID:", recipeId);
    const token = authManagerInstance.getAuthToken();;

    const API_HOST = process.env.REACT_APP_API_URL;
    const url = `${API_HOST}/recipes/delete/${recipeId}`;
    await httpService.delete(url,token); 
    navigate('/');


  };

  return (
    <article className={classes.recipeContainer}>
      <div className={classes.recipe}>
        <Link to={`/chefs/${recipe.user.id}`} className={classes.creatorLink}>
          <div className={classes.userInfo}>
            <img
              src={`${API_HOST}/storage/${recipe.user.images.image}`}
              alt={recipe.user.name}
              className={classes.userImage}
            />
            <h1 className={classes.userName}>{recipe.user.name}</h1>
          </div>
        </Link>
        <img
          src={`${API_HOST}/storage/${recipe.images.image}`}
          alt={recipe.title}
          className={classes.recipeImage}
        />
      </div>
      <div className={classes.recipeDetails}>
        <div className={classes.recipeTitle}>
          <h1>{recipe.title}</h1>
          {displayEditAndDelete()}
        </div>

        <p>Description : {recipe.description}</p>
        <p>Category: {recipe.category.name}</p>
        <p>Dietary Preference: {recipe.dietary.name}</p>
        <p>Preparation Time : {recipe.preparationTime}</p>
        <p>Chefs comment: {recipe.comment}</p>

        <div className={classes.sectionHeader}>
          <h2 className={classes.title}>Ingredients</h2>
          <FontAwesomeIcon icon={showIngredients ? faAngleUp : faAngleDown} onClick={toggleIngredients} />
        </div>
        {showIngredients && (
          <ol>
            {recipe.ingredients.map(ingredient => (
              <li key={ingredient.id}>{ingredient.ingredientName} - {ingredient.measurementUnit}</li>
            ))}
          </ol>
        )}

        <div className={classes.sectionHeader}>
          <h2 className={classes.title}>Steps</h2>
          <FontAwesomeIcon icon={showSteps ? faAngleUp : faAngleDown} onClick={toggleSteps} />
        </div>
        {showSteps && (
          <ol>
            {recipe.steps.map(step => (
              <li key={step.id}>{step.stepDescription}</li>
            ))}
          </ol>
        )}
      </div>
    </article>
  );
}

export default RecipeItem;
