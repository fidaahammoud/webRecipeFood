// import React from 'react';
// import AdditionalDetailsForm from '../components/AdditionalDetailsForm';
// import { redirect } from 'react-router-dom';

// async function submitProfile(formData, userId, token) {
//   try {
//     const response = await fetch(`http://192.168.56.10:80/laravel/api/completeProfile/${userId}`, {
//       method: 'PUT',
//       body: formData, 
//       headers: {
//         'Authorization': `Bearer ${token}`, 
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to complete profile');
//     }

//     return response.json();
//   } catch (error) {
//     console.error('API Request Failed:', error);
//     throw error;
//   }
// }

// async function saveImageToDatabase( userId, token) {
//   try {

//     const formData = new FormData();
//     formData.append('image', {
//       uri: selectedImage.uri,
//       name: 'profile_image.jpg',
//       type: 'image/jpg',
//     });

//     const response = await fetch(`http://192.168.56.10:80/laravel/api/image/${userId}/image`, {
//       method: 'PUT',
//       body: formData, 
//       headers: {
//         'Authorization': `Bearer ${token}`, 
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to complete profile');
    
//     }

//     return response.json();
//   } catch (error) {
//     console.error('API Request Failed:', error);
//     throw error;
//   }
// }

// export async function action({ request }) {
//   try {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     if (!token || !userId) {
//       throw new Error('Token or user ID not found in local storage');
//     }

//     const formData = new FormData();
//     for (const key in request) {
//       formData.append(key, request[key]);
//     }

//     // Submit profile data
//     await submitProfile(formData, userId, token);

//     return redirect('/');
//   } catch (error) {
//     console.error('Action Failed:', error);
//     throw error;
//   }
// }

// function CompleteAuth() {
//   return <AdditionalDetailsForm />;
// }

// export default CompleteAuth;
