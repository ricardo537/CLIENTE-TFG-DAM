import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateUserComponent } from "../update-user/update-user.component";
import { CommonModule } from '@angular/common';
import { MediaService } from '../mediaService';
import { HttpClientModule } from '@angular/common/http';
import { LoginDTO } from '@dto/loginDTO';
import { ProfileDTO } from '@dto/profileDTO';
import { AuthService } from '../auth.service';
import { IdDTO } from '@dto/idDTO';

@Component({
  selector: 'app-profile',
  imports: [UpdateUserComponent, CommonModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [MediaService, AuthService]
})
export class ProfileComponent {
  public updateForm: boolean = false;
  public updateImg: boolean = false;
  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  public profile: ProfileDTO = ProfileDTO.getVoid();

  constructor (private router: Router, private mediaService: MediaService, private authService: AuthService) {
    this.authService.getMyId().subscribe({
      next: (response: IdDTO) => {
        console.log(response);
        this.authService.getProfile(response).subscribe({
          next: (prof: ProfileDTO) => {
            console.log(prof);
            this.profile = prof;
          }
        });
      }
    });
  }

  public openSelector() {
    this.inputFile.nativeElement.click();
  }

  public fileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    const session = LoginDTO.getSession();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      this.mediaService.upload(session.email, formData).subscribe({
        next: (response) => {
          window.location.reload();
        }, error: (error) => {
          window.location.reload();
        }
      })
    }
  }

  public logout (): void {
    sessionStorage.removeItem('token');
    this.router.navigate(["/bolas/auth/login"]);
  }

  public changeVisibilityUpdateForm (): void {
    if (this.updateForm) {
      this.updateForm = false;
    } else {
      this.updateForm = true;
    }
  }
}
