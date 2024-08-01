import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin123', role: 'Administrador' },
    { username: 'cliente', password: 'cliente123', role: 'Cliente' }
  ];
  
  private userRoleSubject = new BehaviorSubject<string | null>(this.getUserRole());

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userRoleSubject.next(user.role); // Emitir nuevo rol
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.userRoleSubject.next(null); // Emitir rol nulo
    this.router.navigate(['/login-home-rol']);
  }

  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user ? user.role : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserRoleObservable() {
    return this.userRoleSubject.asObservable();
  }
}
