import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    component: LoginPageComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
];
