import React from 'react';
import { Form, Link } from 'react-router-dom'; 
import classes from '../css/AdditionalDetailsForm.module.css';

function AdditionalDetailsForm({ onSubmit }) { 
  const handleSubmit = event => {
    event.preventDefault(); 
    const form = event.target; 
    const formData = new FormData(form); 
    onSubmit(formData);
  };

  return (
    <>
      <Form method='post' className={classes.form} onSubmit={handleSubmit}> 
      <div className={classes.formBackground}>
        <h1>Provide Additional Details</h1>
        <p>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" name="username" required />
        </p>
        <p>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" required />
        </p>
        <p>
          <label htmlFor="bio">About Me</label>
          <input id="bio" type="text" name="bio"  />
        </p>
        <div className={classes.actions}>
          <Link to="/auth">Back to Login</Link>
          <button type="submit">Register</button>
        </div>
        </div>
      </Form>
    </>
  );
}

export default AdditionalDetailsForm;
