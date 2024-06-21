import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  validationMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register = () => {
    this.authService
      .register(this.email, this.password)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage =
            error.error.message || 'An unexpected error occurred';
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (data) => {
          this.validationMessage = data.message;
          setInterval(() => {
            this.router.navigate(['auth/login']);
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  };
}
