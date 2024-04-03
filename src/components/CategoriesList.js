import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../css/CategoriesList.module.css';

function CategoriesList({ categories }) {
  return (
    <div className={classes.categories}>
      <h1>Categories</h1>
      <div className={classes.categoryContainer}>
        {categories.map((category) => (
          <Link to={`/categories/${category.id}`} key={category.id} className={classes.category}>
            <img src={category.categoryImage} alt={category.name} className={classes.categoryImage} />
            <span className={classes.categoryName}>{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesList;
