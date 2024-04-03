import React from 'react';
import { Form, Link ,useNavigation,useActionData} from 'react-router-dom';
import classes from './AdditionalDetailsForm.module.css';

function AdditionalDetailsForm() {
  const params = new URLSearchParams(window.location.search);
  const data = useActionData(); 
  const navigation = useNavigation(); 


  return (
    <>
      <Form method='post'  className={classes.form}>
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
          <input id="bio" type="text" name="bio" required />
        </p>
        <p>
          <label htmlFor="profileImage">Profile Image</label>
          <input id="profileImage" type="file" name="profileImage" accept="image/*" required />
        </p>
        <div className={classes.actions}>
          <Link to="/auth">Back to Login</Link>
          <button type="submit">Register</button>
        </div>
      </Form>
    </>
  );
}

export default AdditionalDetailsForm;
