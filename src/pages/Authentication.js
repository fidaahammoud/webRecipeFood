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
    const username = response.user.username;

    console.log(authToken);
    console.log(userId);

  
    authManagerInstance.login(authToken,userId,username);
    const isAuthenticated = authManagerInstance.getIsAuthenticated();
    console.log(isAuthenticated);


    if (mode === "register") {
      return redirect('/auth/additional-details');
    } 
    else if (mode === "login") {
      return redirect('/');
    }
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}
