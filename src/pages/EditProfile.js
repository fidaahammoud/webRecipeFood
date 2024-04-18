import React, { useState } from 'react';
import HttpService from '../components/HttpService';
import UploadImageToDB from '../components/ImageUpload.js';
import { useNavigate } from 'react-router-dom'; 
import authManagerInstance from '../components/AuthManager';
import EditProfileForm from '../components/EditProfileForm.js';
import Toast from '../components/Toast'; 
import 'react-toastify/dist/ReactToastify.css';

const httpService = new HttpService();

function EditProfilePage() {
  const [imageId, setImageId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (formData,imageIDForm) => {
    const token = authManagerInstance.getAuthToken();;
    const userId = authManagerInstance.getUserId();

    console.log("Completeauth");
    console.log("token : " + token);
    console.log("user id  : " + userId);


    let updatedImageId = imageIDForm; 
    
    if (imageId !== null) {
        updatedImageId = imageId; 
    }
    console.log(updatedImageId);

    try {
      const authData = {
        username: formData.get('username'),
        name: formData.get('name'),
        bio: formData.get('bio'),
        image_id: updatedImageId,
      };

      const API_HOST = process.env.REACT_APP_API_URL;
      console.log("API UPDATE PROFILE: " + `${API_HOST}/api/updatePersonalInformation/${userId}`);
      const url = `${API_HOST}/api/updatePersonalInformation/${userId}`;

      const response = await httpService.put(url, authData, token,true);
      if (response && response.message === 'success' ) {
        setToastMessage('Personal information updated successfully');
        setToastType('success');
        setShowToast(true);
        setTimeout(navigateToHome, 2000);
      }
       else {
        setToastMessage(response.message);
        setToastType('error');
        setShowToast(true);
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
      <UploadImageToDB onImageUpload={handleImageUpload} imageId={imageId}   />
      <EditProfileForm onSubmit={handleSubmit} />
      {showToast && (
      <Toast message={toastMessage} type={toastType} />
      )}
    </>
  );
}

export default EditProfilePage;
