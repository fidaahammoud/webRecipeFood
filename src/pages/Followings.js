import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import FollowingsList from '../components/FollowingsList';

import HttpService from '../components/HttpService';
import authManagerInstance from '../components/AuthManager';

const httpService = new HttpService();

function Followings() {
  const { chefs } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={chefs}>
        {(loadedChefs) => <FollowingsList chefs={loadedChefs} />}
      </Await>
    </Suspense>
  );
}

export default Followings;

async function loadChefs() {
  const API_HOST = process.env.REACT_APP_API_URL;
  const loggedInUserId = authManagerInstance.getUserId();
  const token = authManagerInstance.getAuthToken();

  const url =  `${API_HOST}/api/followings/${loggedInUserId}`;
    console.log(url);
  const response = await httpService.get(url, token);
  return response;
}

export function loader() {
  return defer({
    chefs: loadChefs(), 
  });
}
