import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../css/ChefsList.module.css';

function ChefsList({ chefs }) {
  return (
    <div className={classes.chefs}>
        <div className={classes.chefTitle} >
            <h1>Chefs</h1>
        </div>
      <div className={classes.chefContainer}>
        {chefs.map((chef) => (
          <Link to={`/chefs/${chef.id}`} key={chef.id} className={classes.chef}>
          <img src={`http://192.168.56.10:80/laravel/storage/${chef.images.image}`} alt={chef.name} className={classes.chefImage} />
            <span className={classes.chefName}>{chef.name}</span>
            <span className={classes.totalFollowers}>Followers: {chef.totalFollowers}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChefsList;
