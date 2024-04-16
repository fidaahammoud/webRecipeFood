import React, { useState } from 'react';
import AdditionalDetailsForm from '../components/AdditionalDetailsForm';
import HttpService from '../components/HttpService';
import UploadImageToDB from '../components/ImageUpload.js';
import { useNavigate } from 'react-router-dom'; 
import authManagerInstance from '../components/AuthManager';

import Toast from '../components/Toast'; 
import 'react-toastify/dist/ReactToastify.css';

const httpService = new HttpService();

function CompleteAuthPage() {
  const [imageId, setImageId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


  const navigate = useNavigate(); 

  const handleSubmit = async (formData) => {
    const token = authManagerInstance.getAuthToken();;
    const userId = authManagerInstance.getUserId();

    console.log("Completeauth");
    console.log("token : " + token);
    console.log("user id  : " + userId);

    try {
      const authData = {
        username: formData.get('username'),
        name: formData.get('name'),
        bio: formData.get('bio'),
        image_id: imageId,
      };

      const API_HOST = process.env.REACT_APP_API_URL;
      console.log("API COMPLETE PROFILE: " + `${API_HOST}/api/completeProfile/${userId}`);
      const url = `${API_HOST}/api/completeProfile/${userId}`;

      const response = await httpService.put(url, authData, token);
      console.log(response);


      if (response && response.message === 'success' ) {
        setToastMessage('Profile completed successfully');
        setShowToast(true);
        setTimeout(navigateToHome, 2000);
      }


    } catch (error) {
      console.error('Error completing profile:', error);
    }
  };

  const handleImageUpload = (imageId) => {
    setImageId(imageId);
  };

  function navigateToHome() {
    navigate('/');
}


  return (
    <>
      <UploadImageToDB onImageUpload={handleImageUpload} />
      <AdditionalDetailsForm onSubmit={handleSubmit} />

      {showToast && (
      <Toast message={toastMessage}/>
      )}

    </>
  );
}

export default CompleteAuthPage;
