import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faEdit, faTrash, faThumbsUp } from '@fortawesome/free-solid-svg-icons'; 
import classes from '../css/RecipeItem.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';
import verificationIcon from "../images/Verification-Logo.png";  

const httpService = new HttpService();

function RecipeItem({ recipe }) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const [totalLikes, setTotalLikes] = useState(recipe.totalLikes);

  

  const loggedInUser = authManagerInstance.getUserId();
  const navigate = useNavigate(); 

  const API_HOST = process.env.REACT_APP_API_URL;

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  };

  useEffect(() => {
    displayEditAndDelete();
  },[]);
  const displayEditAndDelete = () => {
    console.log(loggedInUser+" loggedInUser");
    console.log(recipe.user.id+" recipe. user .id");

    if (loggedInUser === recipe.user.id) {
      return (
        <div className={classes.editDelete}>
           <Link to={`/editRecipe/${recipe.id}`} className={classes.creatorLink}>
           <button onClick={() => handleEdit(recipe.id)}><FontAwesomeIcon icon={faEdit} /></button>
           </Link>
           
          <button onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      );
    }
  };

  const handleEdit = (recipeId) => {
    console.log("Editing recipe with ID:", recipeId);
    navigate('editRecipe');

  };

  const handleDelete = async () => {
    console.log("Deleting recipe with ID:", recipe.id);
    const token = authManagerInstance.getAuthToken();;

    const API_HOST = process.env.REACT_APP_API_URL;
    const url = `${API_HOST}/api/recipes/delete/${recipe.id}`;
    console.log(url);
    const httpService = new HttpService();

    const response = await httpService.delete(url,token); 
    console.log(response);
    navigate('/');
  };

  const handleLikePress = async () => {
    const token = authManagerInstance.getAuthToken();;
    const userId = authManagerInstance.getUserId();
    console.log(`${API_HOST}/api/${userId}/${recipe.id}/updateStatusLike`);
    try {
      const httpService = new HttpService();
      const response = await httpService.put(`${API_HOST}/api/${userId}/${recipe.id}/updateStatusLike`, null, token);
      setTotalLikes(response.nbOfLikes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error.message);
    }
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
            <div className={classes.userNameContainer}>
              <h1 className={classes.userName}>{recipe.user.name}</h1>
              {recipe.user.isVerified === 1 && (
                <img
                  src={verificationIcon}
                  alt="Verified"
                  className={classes.verificationLogo}
                />
              )}
            </div>
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

        <div className={classes.recipeActions}>
          <FontAwesomeIcon icon={faThumbsUp} onClick={handleLikePress}  color={isLiked ? 'blue' : 'white'}  className={classes.likeIcon}/>
          <span className={classes.likesCount}>{totalLikes}</span>
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
