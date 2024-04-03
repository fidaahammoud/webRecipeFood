import classes from '../css/RecipeItem.module.css';

function RecipeItem({ recipe }) {
    return (
      <article className={classes.recipe}>
        <img src={`http://192.168.56.10:80/laravel/storage/${recipe.images.image}`} alt={recipe.title} className={classes.recipeImage} />
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
      </article>
    );
  }

export default RecipeItem;
