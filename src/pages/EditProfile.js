import React, { useState } from 'react';
import HttpService from '../components/HttpService';
import UploadImageToDB from '../components/ImageUpload.js';
import { useNavigate } from 'react-router-dom'; 
import authManagerInstance from '../components/AuthManager';
import EditProfileForm from '../components/EditProfileForm.js';

const httpService = new HttpService();

function EditProfilePage() {
  const [imageId, setImageId] = useState(null);
  
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

      const response = await httpService.put(url, authData, token);
      console.log(response);

      navigate('/');


    } catch (error) {
      console.error('Error completing profile:', error);
    }
  };

  const handleImageUpload = (imageId) => {
    setImageId(imageId);
  };

  return (
    <>
      <UploadImageToDB onImageUpload={handleImageUpload} imageId={imageId}   />
      <EditProfileForm onSubmit={handleSubmit} />
    </>
  );
}

export default EditProfilePage;
