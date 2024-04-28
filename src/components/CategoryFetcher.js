import React, { useState, useEffect } from 'react';
import HttpService from '../components/HttpService';

function CategoryFetcher() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const httpService = new HttpService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_HOST = process.env.REACT_APP_API_URL;
        const url = `${API_HOST}/api/categories`;

        const response = await httpService.get(url, null);
        const data = response.data;

        if (data) {
          setCategories(data);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  return (
    <>
      {categories.map(category => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </>
  );
}

export default CategoryFetcher;
