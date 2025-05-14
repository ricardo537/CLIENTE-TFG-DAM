import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RegisterDTO } from '@dto/registerDTO';

@Component({
  selector: 'app-register-user',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
  providers: [AuthService]
})
export class RegisterUserComponent {
  public message: string = "";
  public successMessage: string = "";
  registerForm: FormGroup;

  constructor (private builder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  public register(): void {
    const register: RegisterDTO|string = RegisterDTO.fromJSON(this.registerForm.value);
  
    if (typeof register === "string") {
      this.message = register;
    } else {
      this.authService.register(register).subscribe({
        next: (response: string) => {
          this.message = "";
          this.successMessage = "El email se ha registrado con éxito.";
          setTimeout(() => {
            this.router.navigate(['/bolas/auth/login']);
          }, 1500);
        },
        error: (error) => {
          this.message = "El usuario con ese email ya está registrado, por favor escoja otro email.";
        }
      })
    }
  }
}
