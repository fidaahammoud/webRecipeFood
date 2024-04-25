import { Suspense, useState } from 'react';
import { useRouteLoaderData, defer, Await } from 'react-router-dom';

import NotificationsList from '../components/NotificationsList';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';

const httpService = new HttpService();

function NotificationsPage() {
  const { notifications } = useRouteLoaderData("my_notifications");

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={notifications}>
        {(loadedNotifications) => (
          <NotificationsList 
            notifications={loadedNotifications} 
          />
        )}
      </Await>
    </Suspense>
  );
}

export default NotificationsPage;

async function loadNotifications() {
  const token = authManagerInstance.getAuthToken();
  const userId = authManagerInstance.getUserId();
  console.log(token);
  console.log(userId);

  const API_HOST = process.env.REACT_APP_API_URL;
  const url = `${API_HOST}/api/notifications/${userId}`;
  const response = await httpService.get(url, token);
  const updatedNotifications = response.notifications.map(notification => ({
    ...notification,
    isRead: notification.isRead
  }));
  return updatedNotifications;
}

export async function loader() {
  const [notifications] = await Promise.all([
    loadNotifications(),
    
  ]);
  return defer({
    notifications,
  });
}
