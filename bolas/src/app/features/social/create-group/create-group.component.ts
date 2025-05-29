import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-create-group',
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css',
  providers: [SocialService]
})
export class CreateGroupComponent {
  public groupData: FormGroup;
  public message: string = "";
  public successMessage: string = "";

  constructor(private builder: FormBuilder, private socialService: SocialService, private router: Router) {
    this.groupData = builder.group({
        name: ['', [Validators.required]]
    })
  }

  public createGroup(): void {
    this.socialService.createGroup(this.groupData.value.name).subscribe({
      next: (response) => {
        this.message = "";
        this.successMessage = "El grupo se creo con éxito.";
        setTimeout(() => {
          this.router.navigate(['/bolas/dashboard/social/groups']);
        }, 1500);
      }, 
      error: (error) => {
          this.message = "Hubo un problema, el grupo no se pudo crear";
      }
    })
  }
  
}
