import React, { useState, useEffect } from 'react';
import classes from '../css/NotificationList.module.css';
import { Utils } from './Utils';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';
import NotificationsPage, { loader } from '../pages/Notifications';

const httpService = new HttpService();

function NotificationsList({ notifications }) {
  const API_HOST = process.env.REACT_APP_API_URL;
  const { getTimeDifference } = Utils();

  const [updatedNotifications, setUpdatedNotifications] = useState(notifications);

  const handleNotificationClick = async (notificationId) => {
    const token = authManagerInstance.getAuthToken();
    const userId = authManagerInstance.getUserId();

    const url = `${API_HOST}/api/updateStatusNotification/${userId}/${notificationId}`;

    const response = await httpService.put(url, null, token);
    console.log(response);
    console.log('Clicked on notification:', notificationId);

    // Update the notification status locally
    const updatedNotifs = updatedNotifications.map(notification => {
      if (notification.id === notificationId) {
        // Toggle the isRead status
        return { ...notification, isRead: !notification.isRead };
      }
      return notification;
    });

    setUpdatedNotifications(updatedNotifs);
  };

  // check for new notifications
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const token = authManagerInstance.getAuthToken();
      const userId = authManagerInstance.getUserId();

      const url = `${API_HOST}/api/notifications`;
      const response = await httpService.get(url, token);
      const newNotifications = response.notifications.map(notification => ({
        ...notification,
        isRead: notification.isRead
      }));

      setUpdatedNotifications(newNotifications);
    }, 5000);

   
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Notifications</h1>
      <div className={classes.scrollView}>
        {updatedNotifications.map((notification, index) => (
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
            {index !== updatedNotifications.length - 1 && <div className={classes.horizontalLine} />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NotificationsList;
