import React from 'react';
import { Form, Link, useNavigate,useSearchParams } from 'react-router-dom';
import classes from './AuthForm.module.css';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Implement form data handling and validation (replace with your logic)
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (isLogin) {
      // Login logic (replace with your authentication method)
      console.log('Logging in...', email, password); // Example (replace with actual login)
      navigate('/'); // Assuming '/' is the home page after successful login
    } else {
      // Create account logic (replace with your user creation method)
      const confirmPassword = formData.get('confirmPassword');
      if (password !== confirmPassword) {
        // Handle password mismatch error
        console.error('Passwords do not match');
        return;
      }
      console.log('Creating account...', email, password); // Example (replace with actual account creation)
      navigate('/auth/additional-details'); // Navigate to 'additional-details' after successful account creation
    }
  };

  const buttonText = isLogin ? 'Log in' : 'Continue';

  return (
    <>
      <Form method="post" className={classes.form} onSubmit={handleSubmit}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {!isLogin && (
          <p>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" name="confirmPassword" required />
          </p>
        )}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Log in'}
          </Link>
          <button type="submit">{buttonText}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
