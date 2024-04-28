import React, { useRef, useState,useEffect } from 'react';
import authManagerInstance from '../components/AuthManager';
import classes from '../css/UploadImage.module.css';

const UploadImageToDB = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef = useRef();

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
    .then(response => {
      if (!response.ok) {
        //throw new Error('Failed to upload image');
        console.error('Failed to upload image');

      }
      return response.json();
    })
    .then(data => {
      console.log("Data image id : "+data.image_id);
      // Pass the imageId back to the parent component
      onImageUpload(data.image_id);
    })
    .catch(error => {
      console.error('Error uploading image:', error.message);
    });
  };

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

  useEffect(() => {
    if (image) {
      handleSubmit();
    }
  }, [image]);

  return (
    <div className={classes.uploadContainer}>
      <div className={classes.inputContainer}>
        <input type="file" name="image" ref={imageRef} onChange={fileSelectHandler} className={classes.fileInput} />
      </div>
      {imagePreview && (
        <div className={classes.imagePreviewContainer}>
          <img src={imagePreview} className={classes.imagePreview} alt="Preview" />
        </div>
      )}
    </div>
  );
}

export default UploadImageToDB;
