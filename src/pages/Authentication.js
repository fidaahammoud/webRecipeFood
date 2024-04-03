import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  console.log("data");

  try {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'register';

    if (mode !== 'login' && mode !== 'register') {
      throw json({ message: 'Unsupported mode.' }, { status: 422 });
    }

    const data = await request.formData();
    console.log(data);
    const authData = {
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('confirmPassword'),
    };
    console.log(mode);
    const response = await fetch("http://192.168.56.10:80/laravel/api/"+ mode, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData), 
    });
    console.log('API Response:', response);

    const responseData = await response.json();
    console.log('API Response Data:', responseData);

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: 'Could not authenticate user.' }, { status: 500 });
    }

    // Save token to localStorage
    localStorage.setItem('token', responseData.access_token);
    localStorage.setItem('userId', responseData.data.id);

    if (mode === "register") {
      return redirect('/auth/additional-details');
    } else if (mode === "login") {
      return redirect('/');
    }
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}
