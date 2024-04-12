import classes from '../css/ChefInfo.module.css';
import verificationIcon from "../images/Verification-Logo.png";

function ChefInfo({ chef }) {
  const API_HOST = process.env.REACT_APP_API_URL;

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img
          src={`${API_HOST}/storage/${chef.images.image}`}
          alt={chef.username}
          className={classes.image}
        />
        
      </div>
      <div className={classes.details}>
        <div className={classes.name}>
          {chef.name}
          {chef.isVerified === 1 && (
            <img
              src={verificationIcon}
              alt="Verified"
              className={classes.verificationLogo}
            />
          )}
        </div>
        <p className={classes.username}>{chef.username}</p>
        <p className={classes.bio}>{chef.bio}</p>
        <div className={classes.followers}>
          <p className={classes.totalFollowers}>{chef.totalFollowers}</p>
        </div>
      </div>
    </div>
  );
}

export default ChefInfo;
