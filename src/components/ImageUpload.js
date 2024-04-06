import React, { Fragment, useRef, useState } from 'react';
import { getAuthToken, getUserId } from '../components/auth.js';

const UploadImageToDB = ({ onImageUpload }) => {
  const [image, setImage] = useState();
  const imageRef = useRef();

  const fileSelectHandler = event => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    const token = getAuthToken();
    const userId = getUserId();

    const formData = new FormData();
    formData.append("image", image ? image : null);

    fetch(`http://192.168.56.10/laravel/api/uploadImageWeb/${userId}`, {
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
