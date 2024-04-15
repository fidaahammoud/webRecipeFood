import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Added Link import
import classes from '../css/ChefInfo.module.css';
import verificationIcon from "../images/Verification-Logo.png";
import authManagerInstance from '../components/AuthManager';
import HttpService from '../components/HttpService';

function ChefInfo({ chef }) {
  const API_HOST = process.env.REACT_APP_API_URL;
  const loggedInUserId = authManagerInstance.getUserId();
  const token = authManagerInstance.getAuthToken();

  const [totalFollowers, setTotalFollowers] = useState(chef.totalFollowers);
  const [isFollowed, setIsFollowed] = useState(chef.isFollowed);
  const [followStatus, setFollowStatus] = useState(isFollowed ? 'Unfollow' : 'Follow');

  const handleFollowPress = async () => {
    try {
      const httpService = new HttpService();
      const response = await httpService.put(`${API_HOST}/api/updateStatusFollow/${loggedInUserId}/${chef.id}`, null, token);
      
      setTotalFollowers(response.totalFollowers);
      setIsFollowed(!isFollowed);
      setFollowStatus(isFollowed ? 'Follow' : 'Unfollow');
      
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

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
          <p className={classes.totalFollowers}>{totalFollowers}</p>
        </div>
        <div>
          {loggedInUserId !== chef.id && (
            <button onClick={handleFollowPress} className={classes.followButton}>
              {followStatus}
            </button>
          )}
        </div>
        <div className={classes.editProfile}>
          {loggedInUserId == chef.id && (
            <Link to={`/editProfile/${chef.id}`} > 
              <button className={classes.editProfileButton}>
                Edit Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChefInfo;
