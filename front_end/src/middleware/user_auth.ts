import UserStorage from './UserStorage'; // replace '../path/to/UserStorage' with the actual path to the UserStorage.ts file
import { userAuth } from '../boot/auth-store';
import { inject } from 'vue'

export default (to: any, from: any, next: any) => {
  const userStorage = new UserStorage();
  const token = userStorage.getToken();

  if (!token) {
    next({ name: 'login' });
  } else {
    next();
  }
}