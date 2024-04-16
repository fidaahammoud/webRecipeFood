import { Suspense, useState } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';

import NotificationsList from '../components/NotificationsList';
import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';

const httpService = new HttpService();

function NotificationsPage() {
  const { notifications } = useLoaderData();

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

  const API_HOST = process.env.REACT_APP_API_URL;
  const url = `${API_HOST}/api/notifications`;
  const response = await httpService.get(url, token);
  const updatedNotifications = response.notifications.map(notification => ({
    ...notification,
    isRead: notification.isRead
  }));
  return updatedNotifications;
}

export function loader() {
  return defer({
    notifications: loadNotifications(),
  });
}
