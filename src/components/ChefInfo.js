import classes from '../css/ChefInfo.module.css';


function ChefInfo({ chef }) {


  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img
          src={`http://192.168.56.10:80/laravel/storage/${chef.images.image}`}
          alt={chef.username}
          className={classes.image}
        />
      </div>
      <div className={classes.details}>
        <h1 className={classes.name}>{chef.name}</h1>
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
