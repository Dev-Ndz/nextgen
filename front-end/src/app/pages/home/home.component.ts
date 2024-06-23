import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Button } from "primeng/button";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [Button],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  email: String = "email ";

  constructor(private http: HttpClient, private auth: AuthService) {}

  logout = () => {
    console.log("logging out...");
    this.auth.logout();
    window.location.reload();
  };

  getEmail = () => {
    this.http
      .get("https://next-gen-f6acfadecd9e.herokuapp.com/email")
      .subscribe({
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
function reloadCurrent() {
  throw new Error("Function not implemented.");
}
