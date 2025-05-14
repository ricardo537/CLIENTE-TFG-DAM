import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginDTO } from '@dto/loginDTO';

@Component({
  selector: 'app-login-user',
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
  providers: [AuthService]
})
export class LoginUserComponent {
  loginForm: FormGroup;
  message: string = "";

  constructor(private builder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public login(): void {
    const login: LoginDTO|string = LoginDTO.fromJSON(this.loginForm.value);

    if (typeof login === "string") {
      this.message = login;
    } else {
      this.authService.login(login).subscribe({
        next: (response : LoginDTO) => {
          sessionStorage.setItem("token", JSON.stringify(response));
          this.router.navigate(['/bolas/dashboard']);
        },
        error: (error) => {
          this.message = "El usuario no existe por favor revise los datos introducidos.";
        }
      })
    }
  }
}
