import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  email: String = 'email ';

  constructor(private http: HttpClient) {}

  getEmail = () => {
    this.http.get('http://localhost:5000/email').subscribe({
      next: (data: any) => {
        this.email = data.email;
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  ngOnInit() {
    this.getEmail();
  }
}
