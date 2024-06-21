import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login = () => {
    this.authService
      .login(this.email, this.password)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage =
            error.error.message || 'An unexpected error occurred';
          return throwError(() => error);
        })
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
      });
  };
}
