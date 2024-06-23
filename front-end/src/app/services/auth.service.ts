import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http
      .post("https://next-gen-f6acfadecd9e.herokuapp.com/auth/register", {
        email,
        password,
      })
      .pipe(
        tap((data: any) => {
          localStorage.setItem("JWT_TOKEN", data.token);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post("https://next-gen-f6acfadecd9e.herokuapp.com/auth/login", {
        email,
        password,
      })
      .pipe(
        tap((data: any) => {
          localStorage.setItem("JWT_TOKEN", data.token);
        })
      );
  }

  logout(): void {
    console.log("loging out - service");
    localStorage.removeItem("JWT_TOKEN");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("JWT_TOKEN");
  }

  // getToken(): string | null {
  //   return localStorage.getItem('JWT_TOKEN');
  // }
}
