import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../css/RecipesList.module.css';
import { faThumbsUp, faSort,faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import { Utils } from './Utils';

function FavoriteRecipesList({ recipes }) {
  const API_HOST = process.env.REACT_APP_API_URL;
  const { getTimeDifference } = Utils();


  return (
    <div className={classes.recipes}>
      <div className={classes.title}>
        <h1>All Recipes</h1>
      </div>
      <div className={classes.list}>
        {recipes.length === 0 ? (
          <div className={classes.noRecipes}>
            <p>There are no recipes!!</p>
          </div>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className={classes.item}>
              <Link to={`/chefs/${recipe.user.id}`} className={classes.creatorLink}>
                <div className={classes.creatorContainer}>
                  <img src={`${API_HOST}/storage/${recipe.user.images.image}`} alt={recipe.user.name} className={classes.creatorImage} />
                  <span className={classes.creatorName}>{recipe.user.name}</span>
                </div>
              </Link>
              <Link to={`/recipes/${recipe.id}`} className={classes.recipeLink}>
                <img src={`${API_HOST}/storage/${recipe.images.image}`} alt={recipe.title} className={classes.recipeImage} />
                <div className={classes.titleContainer}>
                  <h2 className={classes.recipeTitle}>{recipe.title}</h2>
                  <span className={classes.categoryName}>{recipe.category.name}</span>
                </div>
                <div className={classes.recipeDetails}>
                  <div className={classes.likesContainer}>
                    <FontAwesomeIcon icon={faThumbsUp} color={'white'} className={classes.likeIcon} />
                    <span className={classes.likesText}>{recipe.totalLikes}</span>
                  </div>
                  <div className={classes.ratingContainer}>
                    <i className={`fa fa-star ${classes.ratingIcon}`} />
                    <FontAwesomeIcon icon={faStar} color={'gold'} className={classes.rateIcon} />
                    <span className={classes.ratingText}>{recipe.avrgRating}</span>
                  </div>
                </div>
                <span className={classes.createdAt}>{getTimeDifference(recipe.created_at)}</span>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FavoriteRecipesList;
