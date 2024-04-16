import React from 'react';
import classes from '../css/NotificationList.module.css';
import { Utils } from './Utils';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';
import NotificationsPage, { loader } from '../pages/Notifications';

const httpService = new HttpService();



function NotificationsList({ notifications }) {
  const API_HOST = process.env.REACT_APP_API_URL;
  const { getTimeDifference } = Utils();

  

  const handleNotificationClick = async (notificationId) => {
    const token = authManagerInstance.getAuthToken();
    const userId = authManagerInstance.getUserId();
  
    const API_HOST = process.env.REACT_APP_API_URL;
    const url = `${API_HOST}/api/updateStatusNotification/${userId}/${notificationId}`;
  
    const response = await httpService.put(url, null, token);
    console.log(response);
    console.log('Clicked on notification:', notificationId);

    
     loader();
  };
  

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Notifications</h1>
      <div className={classes.scrollView}>
        {notifications.map((notification, index) => (
          <button 
            key={notification.id}
            onClick={() => handleNotificationClick(notification.id)}
            className={`${classes.notificationButton} ${notification.isRead ? classes.readNotification : classes.unreadNotification}`}
          >
            <div className={classes.notificationContainer}>
              <img src={`${API_HOST}/storage/${notification.source_user.images.image}`} alt="User" className={classes.userImage} />
              <p className={classes.notificationText}>
                {notification.content}
              </p>
            </div>
            {index !== notifications.length - 1 && <div className={classes.horizontalLine} />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NotificationsList;
