import React, { useState,useEffect } from 'react';
import { Form, Link } from 'react-router-dom'; 
import classes from '../css/AdditionalDetailsForm.module.css';
import authManagerInstance from '../components/AuthManager';
import HttpService from '../components/HttpService';

function EditProfileForm({ onSubmit }) { 
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [imageId, setImageId] = useState('');

  const httpService = new HttpService();


  useEffect(() => {
    fetchProfileDetails();
}, []);

const fetchProfileDetails = async () => {
    const userId = authManagerInstance.getUserId();
    const token = authManagerInstance.getAuthToken();
    const API_HOST = process.env.REACT_APP_API_URL;

    try {
        const response = await httpService.get(`${API_HOST}/api/users/${userId}/${userId}`, token);
        setUsername(response.username);
        setFullName(response.name);
        setAboutMe(response.bio);
        setImageId(response.image_id.toString());

        console.log(response);

        console.log("image id: "+response.image_id.toString());

    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
};



  const handleSubmit = event => {
    event.preventDefault(); 
    const form = event.target; 
    const formData = new FormData(form); 
    onSubmit(formData,imageId);
  };

  return (
    <>
      <Form method='post' className={classes.form} onSubmit={handleSubmit}> 
        <h1>Edit profile details</h1>
        <p>
          <label htmlFor="username">Username</label>
          <input 
          id="username" 
          type="text" 
          name="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />
        </p>
        <p>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" value={fullName}  onChange={(e) => setFullName(e.target.value)} required />
        </p>
        <p>
          <label htmlFor="bio">About Me</label>
          <input id="bio" type="text" name="bio" value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
        </p>
        <div className={classes.actions}>
          <button type="submit">Done</button>
        </div>
      </Form>
    </>
  );
}

export default EditProfileForm;
