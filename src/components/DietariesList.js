import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../css/DietariesList.module.css';

function DietriesList({ dietaries }) {
  return (
    <div className={classes.dietaries}>
      <h1>Dietaries</h1>
      <div className={classes.dietaryContainer}>
        {dietaries.map((dietary) => (
          <Link to={`/dietaries/${dietary.id}`} key={dietary.id} className={classes.dietary}>
          <span className={classes.dietaryName} key={dietary.id}>
            {dietary.name}
          </span>
           </Link>
        ))}
      </div>
    </div>
  );
}

export default DietriesList;
