import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../css/CategoryItem.module.css';
import { Utils } from './Utils';
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DietaryItem({ dietary }) {
  const API_HOST = process.env.REACT_APP_API_URL;

  const { getTimeDifference } = Utils();


  return (
    <div className={classes.category}>
      <h1>{dietary.name}</h1>
      <div className={classes.list}>
        {dietary.recipes.length === 0 ? (
          <div className={classes.noRecipes}>
            <p>There are no recipes in {dietary.name} dietary!!</p>
          </div>
        ) : (
          dietary.recipes.map((recipe) => (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id} className={classes.item}>
              <div className={classes.creatorContainer}>
                <img src={`${API_HOST}/storage/${recipe.user.images.image}`} alt={recipe.user.name} className={classes.creatorImage} />
                <span className={classes.creatorName}>{recipe.user.name}</span>
              </div>
              <img src={`${API_HOST}/storage/${recipe.images.image}`} alt={recipe.title} className={classes.recipeImage} />
              <div className={classes.titleContainer}>
                <h2 className={classes.recipeTitle}>{recipe.title}</h2>
                <span className={classes.categoryName}>{dietary.name}</span>
              </div>
              <div className={classes.recipeDetails}>
                <div className={classes.likesContainer}>
                <FontAwesomeIcon icon={faThumbsUp} color={'white'} className={classes.likeIcon} />
                  <span className={classes.likesText}>{recipe.totalLikes}</span>
                </div>
                <div className={classes.ratingContainer}>
                <FontAwesomeIcon icon={faStar} color={'gold'} className={classes.rateIcon} />
                <span className={classes.ratingText}>{recipe.avrgRating}</span>
                </div>
              </div>
              <span className={classes.createdAt}>{getTimeDifference(recipe.created_at)}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default DietaryItem;
