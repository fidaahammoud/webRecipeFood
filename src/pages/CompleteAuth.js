import { redirect } from 'react-router-dom'; // Import redirect function
import AdditionalDetailsForm from '../components/AdditionalDetailsForm';
import HttpService from '../components/HttpService';
import { getAuthToken, getUserId } from '../components/auth.js';

const httpService = new HttpService();

function CompleteAuthPage() {
  return <AdditionalDetailsForm />;
}

export default CompleteAuthPage;

export async function action({ request }) {
//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');

    const token = getAuthToken();
    const userId = getUserId();
    console.log(token);
    console.log(userId);
  try {
    const data = await request.formData();
    // Extract username, name, and bio from form data
    const username = data.get('username');
    const name = data.get('name');
    const bio = data.get('bio');

    // Get the selected image file from the form data
    const image = data.get('profileImage');

    // Create a FormData object and append the image
    const formData = new FormData();
    formData.append('image', image); // Use 'profileImage' as key
    // formData.append('image', {
    //   uri: selectedImage.uri,
    //   name: 'profile_image.jpg',
    //   type: 'image/jpg',
    // });

    // Upload the image
    const imageUploadResponse = await httpService.uploadImage(`http://192.168.56.10:80/laravel/api/image/${userId}/image`, formData, token);
    const imageId = imageUploadResponse.image_id;

    // Complete profile
    const authData = { username, name, bio, image_id: imageId };
    const API_HOST = process.env.REACT_APP_API_URL;
    const url = `${API_HOST}/completeProfile/${userId}`;
  
    const response = await httpService.put(url, authData, token);
  
    return redirect('/');
  
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}
