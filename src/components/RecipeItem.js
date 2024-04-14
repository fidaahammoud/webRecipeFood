import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faEdit,faStar, faTrash, faThumbsUp,faPaperPlane, faHeart,faCheck  } from '@fortawesome/free-solid-svg-icons'; 
import classes from '../css/RecipeItem.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';
import verificationIcon from "../images/Verification-Logo.png";  
import { Utils } from './Utils'; 


function RecipeItem({ recipe }) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const [totalLikes, setTotalLikes] = useState(recipe.totalLikes);
  const [averageRating, setAverageRating] = useState(recipe.avrgRating);
  const [userRate, setUserRate] = useState(0);
  const [isRated, setIsRated] = useState(recipe.isRated);
  const [rating, setRating] = useState(recipe.rating);

  const [comments, setComments] = useState(recipe.comments);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);

  
  const { getTimeDifference } = Utils();

  const loggedInUser = authManagerInstance.getUserId();
  const navigate = useNavigate();

  const API_HOST = process.env.REACT_APP_API_URL;
  const token = authManagerInstance.getAuthToken();
  const userId = authManagerInstance.getUserId();

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const data = {
      content: comment
    };

    try {
      const httpService = new HttpService();
      const response = await httpService.post(`${API_HOST}/api/recipes/${recipe.id}/comments`, data, token);
      setComments(response.data.comments);
      setComment('');
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {

    if (isRated) {
      setUserRate(recipe.rating);
    }
    displayEditAndDelete();
  }, []);

  const displayEditAndDelete = () => {
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
    const url = `${API_HOST}/api/recipes/delete/${recipe.id}`;

    try {
      const httpService = new HttpService();
      const response = await httpService.delete(url, token);
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLikePress = async () => {
    try {
      const httpService = new HttpService();
      const response = await httpService.put(`${API_HOST}/api/${userId}/${recipe.id}/updateStatusLike`, null, token);
      setTotalLikes(response.nbOfLikes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRatePress = async () => {
    try {
      const httpService = new HttpService();
      const response = await httpService.put(`${API_HOST}/api/${userId}/${recipe.id}/${userRate}/updateStatusRate`, null, token);
      setAverageRating(response.avrgRating);
      setIsRated(!isRated);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleFavoritePress = async (recipeId) => {
    try {
      const httpService = new HttpService();
      const response = await httpService.put(`${API_HOST}/api/${userId}/${recipe.id}/updateStatusFavorite`, null, token);
      setIsFavorite(!isFavorite);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleStarClick = (rating) => {
    setUserRate(rating);
  };
  
  const getStarIconName = (rating) => {
    if (userRate >= rating) {
      return "gold";
    } else {
      return "grey";
    }
  };
  

  return (
    <article className={classes.recipeContainer}>
      <div className={classes.recipe}>
        {/* User info and image */}
        <Link to={`/chefs/${recipe.user.id}`} className={classes.creatorLink}>
          {/* User info */}
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
        {/* Recipe image */}
        <img
          src={`${API_HOST}/storage/${recipe.images.image}`}
          alt={recipe.title}
          className={classes.recipeImage}
        />
        {/* Display comments */}
        <div className={classes.commentsContainer}>
          <h2>Comments</h2>
          <ul className={classes.commentsList}>
            {comments.map(comment => (
              <li key={comment.id} className={classes.commentItem}>
                <div className={classes.commentUserInfo}>
                  <img
                    src={`${API_HOST}/storage/${comment.user.images.image}`}
                    alt={comment.user.name}
                    className={classes.commentUserImage}
                  />
                  <span className={classes.commentUserName}>{comment.user.name}</span>
                </div>
                <div className={classes.commentcontainer}>
                  <p className={classes.commentContent}>{comment.content}</p>
                  <span className={classes.createdAt}> - {getTimeDifference(comment.created_at)} - </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

         {/* Add comment form */}
         <form onSubmit={handleCommentSubmit} className={classes.commentForm} >
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
              className={classes.commentInput}
            />
            <button type="submit" className={classes.commentButton}>
              {/* send */}
              <FontAwesomeIcon icon={faPaperPlane} onClick={handleCommentChange} color='grey' />

            </button>
          </form>
          {error && <p className={classes.error}>{error}</p>}

      </div>

      {/* Recipe details */}
      <div className={classes.recipeDetails}>
        {/* Recipe title and edit/delete buttons */}
        <div className={classes.recipeTitle}>
          <h1>{recipe.title}</h1>
          {displayEditAndDelete()}
        </div>
        <div className={classes.recipeActions}>
          <div>
            <FontAwesomeIcon icon={faThumbsUp} onClick={handleLikePress} color={isLiked ? 'blue' : 'white'} className={classes.likeIcon}/>
            <span className={classes.likesCount}>{totalLikes}</span>
          </div>

          <div>
            <FontAwesomeIcon icon={faStar} onClick={handleRatePress} color={'gold'} className={classes.rateIcon} />
            <span className={classes.averageRating}>{averageRating}</span>
          </div>

          <div>
            <FontAwesomeIcon icon={faHeart } onClick={handleFavoritePress} color={isFavorite ? 'red' : 'white'} className={classes.favoriteIcon} />
            <span className={classes.favoriteStatus}>
              {isFavorite ? "Remove from favorite" : "Add to favorite"}
            </span>
          </div>

        </div>

        <p>Description : {recipe.description}</p>
        <p>Category: {recipe.category.name}</p>
        <p>Dietary Preference: {recipe.dietary.name}</p>
        <p>Preparation Time : {recipe.preparationTime}</p>
        <p>Chefs comment: {recipe.comment}</p>
        {/* Ingredients */}
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
        {/* Steps */}
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

          <div className={classes.title}>Add your Rate : {userRate}</div>

          <div className={classes.rateIconUserIcon}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <FontAwesomeIcon
                key={rating}
                icon={faStar}
                onClick={() => handleStarClick(rating)}
                color={getStarIconName(rating)}
                className={classes.rateIcon}
              />
            ))}
           <button onClick={handleRatePress} className={classes.submitButton} disabled={userRate <= 0}>
              Submit Rating
            </button>
    
          </div>



      </div>
    </article>
  );
}

export default RecipeItem;
