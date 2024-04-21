import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../css/ChefsList.module.css';
import verificationIcon from "../images/Verification-Logo.png";

function ChefsList({ chefs }) {
  const API_HOST = process.env.REACT_APP_API_URL;

  
  return (
    <div className={classes.chefs}>
        <div className={classes.chefTitle} >
            <h1>Chefs</h1>
        </div>
      <div className={classes.chefContainer}>
        {chefs.map((chef) => (
          <Link to={`/chefs/${chef.id}`} key={chef.id} className={classes.chef}>
          <img src={`${API_HOST}/storage/${chef.images.image}`} alt={chef.name} className={classes.chefImage} />
            <div className={classes.chefName}>{chef.name}
            {chef.isVerified === 1 && (
            <img
              src={verificationIcon}
              alt="Verified"
              className={classes.verificationLogo}
            />
          )}
          </div>
            <span className={classes.totalFollowers}>Followers: {chef.totalFollowers}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChefsList;
