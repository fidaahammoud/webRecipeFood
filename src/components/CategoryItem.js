import React from 'react';
import { Link } from 'react-router-dom';
import classes from './CategoryItem.module.css';

function CategoryItem({ category }) {
  return (
    <div className={classes.category}>
      <h1>{category.name}</h1>
      <div className={classes.list}>
        {category.recipes.map((recipe) => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id} className={classes.item}>
            <div className={classes.creatorContainer}>
              <img src={`http://192.168.56.10:80/laravel/storage/${recipe.user.images.image}`} alt={recipe.user.name} className={classes.creatorImage} />
              <span className={classes.creatorName}>{recipe.user.name}</span>
            </div>
            <img src={`http://192.168.56.10:80/laravel/storage/${recipe.images.image}`} alt={recipe.title} className={classes.recipeImage} />
            <div className={classes.titleContainer}>
              <h2 className={classes.recipeTitle}>{recipe.title}</h2>
              <span className={classes.categoryName}>{category.name}</span>
            </div>
            <div className={classes.recipeDetails}>
              <div className={classes.likesContainer}>
                <i className={`fa fa-thumbs-o-up ${classes.likesIcon}`} />
                <span className={classes.likesText}>{recipe.totalLikes}</span>
              </div>
              <div className={classes.ratingContainer}>
                <i className={`fa fa-star ${classes.ratingIcon}`} />
                <span className={classes.ratingText}>{recipe.avrgRating}</span>
              </div>
            </div>
            <span className={classes.createdAt}>{recipe.created_at}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryItem;