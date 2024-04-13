import React, { Fragment, useRef, useState } from 'react';
import authManagerInstance from '../components/AuthManager';
import classes from '../css/RecipeItem.module.css';

const UploadImageToDB = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef = useRef();

  const fileSelectHandler = event => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = () => {
    const token = authManagerInstance.getAuthToken();
    const userId = authManagerInstance.getUserId();

    const formData = new FormData();
    formData.append("image", image ? image : null);
    
    const API_HOST = process.env.REACT_APP_API_URL;
    const url = `${API_HOST}/api/uploadImageWeb/${userId}`;

    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log("Data image id : "+data.image_id);
      // Pass the imageId back to the parent component
      onImageUpload(data.image_id);
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
  };

  return (
    <div className="upload-container">
      <input type="file" name="image" ref={imageRef} onChange={fileSelectHandler} />
      <br />
      <button onClick={handleSubmit}>Submit image</button>
      <br />
      {imagePreview && <img src={imagePreview} width={500} alt="Preview" />}
    </div>
  );
}

export default UploadImageToDB;