import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UpdateDTO } from '@dto/updateDTO';
import { LoginDTO } from '@dto/loginDTO';

@Component({
  selector: 'app-update-user',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
  providers: [AuthService]
})
export class UpdateUserComponent {
  public errorMessage: string = "";
  public goodMessage: string = "";
  updateForm: FormGroup;

  constructor (private builder: FormBuilder, private authService: AuthService) {
    this.updateForm = this.builder.group({
      email: ['', []],
      password: ['', []],
      password_confirm: ['', []],
      name: ['', []],
      description: ['', []],
      gender: ['', []]
    });
  }

  public update(): void {
    const update: UpdateDTO|string = UpdateDTO.fromJSON(this.updateForm.value);
    
    if (typeof update === "string") {
      this.errorMessage = update;
    } else {
      this.authService.update(update).subscribe({
        next: (response: LoginDTO) => {
          this.errorMessage = "";
          this.goodMessage = "Se ha actualizado correctamente";
          LoginDTO.setSession(response);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        error: (error) => {
          this.errorMessage = "No se ha podido actualizar el usuario, el nuevo email ya está en uso.";
        }
      })
    }
  }

}
