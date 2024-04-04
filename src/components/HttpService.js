import React, { Component } from 'react';
import { json, redirect } from 'react-router-dom';

class HttpService extends Component {
  async get(url, token) {
    try {
      const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new json('Error try again');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async post(url, data,token) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseBody = await response.json();

      if (!response.ok) {
        console.log('Response status:', response.status);
        console.log('Response body:', responseBody);
  
        if (response.status === 401 || response.status === 422) {
          //ToastAndroid.show(responseBody.message, ToastAndroid.SHORT);
          console.log(responseBody.message);
        } else {
          throw new Error('Network response was not ok');
        }
      }
      return responseBody;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async put(url, data, token) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseBody = await response.json();

      if (!response.ok) {
        console.log('Response status:', response.status);
        console.log('Response body:', responseBody);
  
        if (response.status === 400) {
          // Check if the message field exists in the response body
          const errorMessage = Array.isArray(responseBody.message) ? responseBody.message.join(', ') : responseBody.message;
          // Join multiple error messages if they are in an array
          //ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
          console.log(errorMessage);
        } else {
          throw new Error('Network response was not ok');
        }
      }
      return responseBody;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async delete(url, token) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async uploadImage(url, data, token) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  render() {
    return null; 
  }
}

export default HttpService;
