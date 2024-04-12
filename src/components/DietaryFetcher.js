import React, { useState, useEffect } from 'react';
import HttpService from './HttpService';

function DietaryFetcher() {
  const [dietaries, setDietaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const httpService = new HttpService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_HOST = process.env.REACT_APP_API_URL;
        const url = `${API_HOST}/api/dietaries`;

        const response = await httpService.get(url, null);
        const data = response;

        if (data) {
          setDietaries(data);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {dietaries.map(dietary => (
        <option key={dietary.id} value={dietary.id}>{dietary.name}</option>
      ))}
    </>
  );
}

export default DietaryFetcher;
