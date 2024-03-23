import { UserDetails } from './UserDetails'; 


export default class UserStorage {
    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    setId(id: string) {
        localStorage.setItem('id', id);
    }

    setUsername(username: string) {
        localStorage.setItem('username', username);
    }

    setName(name: string) {
        localStorage.setItem('name', name);
    }

    setOtherDetails(otherDetails: object) {
        localStorage.setItem('other_details', JSON.stringify(otherDetails));
    }

    setUserDetails(details: UserDetails) {
        this.setToken(details.token);
        this.setId(details.id);
        this.setUsername(details.username);
        this.setName(details.name);
        this.setOtherDetails(details.otherDetails);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getId(): string | null {
        return localStorage.getItem('id');
    }

    getUsername(): string | null {
        return localStorage.getItem('username');
    }

    getName(): string | null {
        return localStorage.getItem('name');
    }

    getOtherDetails(): object | null {
        const otherDetails = localStorage.getItem('other_details');
        return otherDetails ? JSON.parse(otherDetails) : null;
    }
    removeUserDetails() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        localStorage.removeItem('other_details');
    }
}