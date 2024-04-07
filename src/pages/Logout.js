import { redirect } from 'react-router-dom';
import authManagerInstance from '../components/AuthManager';

export function action() {
  authManagerInstance.logout();
  
  return redirect('/');
}