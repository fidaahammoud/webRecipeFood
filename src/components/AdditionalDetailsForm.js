import React from 'react';
import { Form, Link } from 'react-router-dom'; // Removed unnecessary imports
import classes from '../css/AdditionalDetailsForm.module.css';

function AdditionalDetailsForm({ onSubmit }) { // Accept onSubmit prop
  const handleSubmit = event => {
    event.preventDefault(); // Prevent default form submission behavior
    const form = event.target; // Get reference to the form element
    const formData = new FormData(form); // Create FormData object from the form data
    onSubmit(formData); // Call the onSubmit function passed as prop with form data
  };

  return (
    <>
      <Form method='post' className={classes.form} onSubmit={handleSubmit}> {/* Use onSubmit handler */}
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
        {/* <p>
          <label htmlFor="profileImage">Profile Image</label>
          <input id="profileImage" type="file" name="profileImage" accept="image/*" required />
        </p> */}
        <div className={classes.actions}>
          <Link to="/auth">Back to Login</Link>
          <button type="submit">Register</button>
        </div>
      </Form>
    </>
  );
}

export default AdditionalDetailsForm;
