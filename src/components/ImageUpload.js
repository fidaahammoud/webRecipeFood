// React component for uploading image
import React, { useState } from 'react';
import HttpService from '../components/HttpService';


const httpService = new HttpService();
const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(image);
        formData.append('image', image);
        try {
            const response = await httpService.uploadImage(`http://192.168.56.10:80/laravel/api/image/7/image`, formData, "150|lHfLzFMV4kHIp6iGnEDe56XuaxVsL5ffNrFxR9ROde1c692d");

           
            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default ImageUpload;
