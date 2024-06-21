import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http
      .post('http://localhost:5000/auth/register', {
        email,
        password,
      })
      .pipe(
        tap((data: any) => {
          localStorage.setItem('JWT_TOKEN', data.token);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:5000/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((data: any) => {
          localStorage.setItem('JWT_TOKEN', data.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('JWT_TOKEN');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('JWT_TOKEN');
  }

  // getToken(): string | null {
  //   return localStorage.getItem('JWT_TOKEN');
  // }
}
