// src/ForgotPassword.js
import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import PasswordResetConfirmation from './PasswordResetConfirmation';

const ForgotPassword = ({ setIsForgotPassword , userType }) => {
  const [email, setEmail] = useState('');
  const [isResetSent, setIsResetSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the forgot password endpoint
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userType }), // Send the email to the backend
      });

      const data = await response.json();

      if (response.ok) {
        setIsResetSent(true);
        setSuccessMessage('Reset link sent to your email!');
        setErrorMessage(''); // Clear any previous error messages
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
        setSuccessMessage(''); // Clear any previous success messages
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage(''); // Clear any previous success messages
    }
  };
return isResetSent ? (
  <PasswordResetConfirmation setIsForgotPassword={setIsForgotPassword} />
) : (
  <div className={styles['forgot-password-page']}>
    <div className={styles['forgot-password-card']}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder='Enter Registered Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {successMessage && (
          <p className={styles['success-message']}>{successMessage}</p>
        )}
        {errorMessage && (
          <p className={styles['error-message']}>{errorMessage}</p>
        )}
      <p>
        <button onClick={() => setIsForgotPassword(false)}>Back to Login</button>
      </p>
    </div>
  </div>
);
};

export default ForgotPassword;
