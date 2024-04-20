import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import HttpService from '../components/HttpService'; 
import authManagerInstance from '../components/AuthManager';

const httpService = new HttpService();

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
 // const auth = new Auth();  


  console.log("data");
  try {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'register';

    if (mode !== 'login' && mode !== 'register') {
      throw json({ message: 'Unsupported mode.' }, { status: 422 });
    }

    const data = await request.formData();

    const authData = {
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('confirmPassword'),
    };
    const API_HOST = process.env.REACT_APP_API_URL;
    const url = API_HOST +"/api/" + mode;
    console.log("URL : "+ url);

    const response = await httpService.authentication(url, authData, null);
   
    const authToken = response.access_token;
    const userId = response.user.id;
    const username = response.user.username || null;

    const isNotificationActive = response.user.isNotificationActive === 1; 
    console.log("toto: "+isNotificationActive);

    if (mode === "register") {
      authManagerInstance.register(authToken,userId);
      authManagerInstance.setNotificationStatus(true);
      return redirect('/auth/additional-details');
    } 
    else if (mode === "login") {
      authManagerInstance.login(authToken,userId,username);
      authManagerInstance.setNotificationStatus(isNotificationActive);

      console.log("isNotificationActive");
      console.log("titi: "+authManagerInstance.getNotificationStatus());

      return redirect('/');
    }
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}
