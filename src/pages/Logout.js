import { redirect } from 'react-router-dom';
import { logout } from '../components/auth.js';

export function action() {
  logout();
  
  return redirect('/');
}