import { userAuth } from '../boot/auth-store';
import { inject } from 'vue'

export default (to: any, from: any, next: any) => {
  const token = localStorage.getItem('token');

  if (to.name === 'login') {

    next();
  } else if (!token) {

    next({ name: 'login' });
  } else {

    next();
  }
}