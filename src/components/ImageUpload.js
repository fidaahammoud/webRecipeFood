import React, { Fragment, useRef, useState } from 'react';
import authManagerInstance from '../components/AuthManager';

const UploadImageToDB = ({ onImageUpload }) => {
  const [image, setImage] = useState();
  const imageRef = useRef();

  const fileSelectHandler = event => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    const token = authManagerInstance.getAuthToken();;
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
      console.log("Data image id : "+data.image_id );
      // Pass the imageId back to the parent component
      onImageUpload(data.image_id);
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
  };

  return (
    <Fragment>
      <div>
        <input type="file" name="image" ref={imageRef} onChange={fileSelectHandler} />
        <br />
        <button onClick={handleSubmit}>Send</button>
      </div>
      <br />
      <img src={image} width={500} />
    </Fragment>
  );
}

export default UploadImageToDB;
