import React, { useState } from 'react';
import AdditionalDetailsForm from '../components/AdditionalDetailsForm';
import HttpService from '../components/HttpService';
import { getAuthToken, getUserId } from '../components/auth.js';
import UploadImageToDB from '../components/ImageUpload.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const httpService = new HttpService();

function CompleteAuthPage() {
  const [imageId, setImageId] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = async (formData) => {
    const token = getAuthToken();
    const userId = getUserId();
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
      console.log("API COMPLETE PROFILE: " + `${API_HOST}/completeProfile/${userId}`);
      const url = `${API_HOST}/completeProfile/${userId}`;

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
      <UploadImageToDB onImageUpload={handleImageUpload} />
      <AdditionalDetailsForm onSubmit={handleSubmit} />
    </>
  );
}

export default CompleteAuthPage;
