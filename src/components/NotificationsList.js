import React, { useState, useEffect } from 'react';
import classes from '../css/NotificationList.module.css';
import { Utils } from './Utils';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';
import Switch from 'react-switch';

function NotificationsList({ notifications }) {
  const API_HOST = process.env.REACT_APP_API_URL;
  const httpService = new HttpService();
  const token = authManagerInstance.getAuthToken();
  const userId = authManagerInstance.getUserId();

  const { getTimeDifference } = Utils();

  const [updatedNotifications, setUpdatedNotifications] = useState(notifications);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(authManagerInstance.getNotificationStatus());

  const toggleNotification = async () => {
    try {
      const response = await httpService.put(`${API_HOST}/api/updateIsActiveNotification/${userId}`, null, token);
      setIsNotificationEnabled(!isNotificationEnabled);
      authManagerInstance.setNotificationStatus(!isNotificationEnabled);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNotificationClick = async (notificationId) => {
    const url = `${API_HOST}/api/updateStatusNotification/${userId}/${notificationId}`;
    const response = await httpService.put(url, null, token);
    const updatedNotifs = updatedNotifications.map(notification => {
      if (notification.id === notificationId) {
        return { ...notification, isRead: !notification.isRead };
      }
      return notification;
    });
    setUpdatedNotifications(updatedNotifs);
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await httpService.get(`${API_HOST}/api/notifications/${userId}`, token);
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
      
      {/* Switcher Component */}
      <div className={classes.switcherContainer}>
       
        <Switch 
          trackcolor ={{ false: "#767577", true: "#81b0ff" }}
          thumbcolor={isNotificationEnabled ? "#f5dd4b" : "#f4f3f4"}
          onChange={toggleNotification}
          checked={isNotificationEnabled}
        />
      </div>

      {isNotificationEnabled && (
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
              <span className={classes.createdAt}>{getTimeDifference(notification.created_at)}</span>
              {index !== updatedNotifications.length - 1 && <div className={classes.horizontalLine} />}
            </button>
          ))}
        </div>
      )}

      {!isNotificationEnabled && (
        <div className={classes.disabledMessage}>
          Notifications are disabled.
        </div>
      )}
    </div>
  );
}

export default NotificationsList;
