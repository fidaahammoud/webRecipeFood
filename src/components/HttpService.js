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

      const responseBody = await response.json();

      if (!response.ok) {
        console.log(response.status);
        if (response.status === 401 || response.status === 422) {
          throw json({ message: responseBody.message });
            
        } else {
          throw json({ message: 'Something went wrong!' }, { status: 500 });
        }
      }
      return responseBody;
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
  
        // if (response.status === 401 || response.status === 422) {
        //   throw json({ message: responseBody.message });
            
        // } else {
        //   throw json({ message: 'Something went wrong!' }, { status: 500 });
        // }
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

      // if (!response.ok) {
      //   console.log('Response status:', response.status);
      //   console.log('Response body:', responseBody);
      //   console.log(responseBody.message);
      //   console.log("toto");
      //   if (response.status === 422) {
      //    // throw json({ message: responseBody.message });
            
      //   } else {
      //     throw json({ message: 'Something went wrong!' }, { status: 500 });
      //   }

      // }
      
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
      const responseBody = await response.json();

      if (!response.ok) {
        console.log("error when delete");

        throw json({ message: 'Something went wrong!' }, { status: 500 });
      }
      return responseBody;
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
      console.log(response.json());
      if (!response.ok) {
        throw json({ message: 'Something went wrong!' }, { status: 500 });
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
