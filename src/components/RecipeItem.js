import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'; // Import the icons you want to use
import classes from '../css/RecipeItem.module.css';

function RecipeItem({ recipe }) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  };

  return (
    <article className={classes.recipeContainer}>
      <div className={classes.recipe}>
        <div className={classes.userInfo}>
          <img
            src={`http://192.168.56.10:80/laravel/storage/${recipe.user.images.image}`}
            alt={recipe.user.name}
            className={classes.userImage}
          />
          <h1 className={classes.userName}>{recipe.user.name}</h1>
        </div>
        <img
          src={`http://192.168.56.10:80/laravel/storage/${recipe.images.image}`}
          alt={recipe.title}
          className={classes.recipeImage}
        />
      </div>
      <div className={classes.recipeDetails}>
        <h1>{recipe.title}</h1>

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
          <ul>
            {recipe.ingredients.map(ingredient => (
              <li key={ingredient.id}>{ingredient.ingredientName} - {ingredient.measurementUnit}</li>
            ))}
          </ul>
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
