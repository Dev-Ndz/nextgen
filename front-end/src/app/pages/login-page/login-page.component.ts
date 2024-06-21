import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { CarousselComponent } from '../../components/caroussel/caroussel.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent, CarousselComponent, RouterOutlet],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
