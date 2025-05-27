import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventCreationDTO } from '@dto/eventCreationDTO';
import { EventCreationService } from '../event-creation.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-creation-form',
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule, CommonModule],
  templateUrl: './event-creation-form.component.html',
  styleUrl: './event-creation-form.component.css',
  providers: [EventCreationService]
})
export class EventCreationFormComponent {
  public publishForm: FormGroup;
  public errorMessage: string = "";
  public goodMessage: string = "";

  constructor (private builder: FormBuilder, private service: EventCreationService, private router: Router) {
    this.publishForm = this.builder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      type: ['torneo', [Validators.required]],
      sport: ['futbol', [Validators.required]],
      minParticipants: ['2', [Validators.required]],
      maxParticipants: ['', [Validators.required]],
      price: ['', [Validators.required]],
      gender: ['mixto', [Validators.required]],
      typeParticipant: ['1x1', [Validators.required]]
    })
  }

  public publish(): void {
    const event: EventCreationDTO = EventCreationDTO.fromJSON(this.publishForm.value);
    
    this.service.publish(event).subscribe({
      next: (response: Boolean) => {
        this.errorMessage = "";
        this.goodMessage = "Se ha publicado el evento con éxito";

        setTimeout(() => {
            this.router.navigate(['/bolas/dashboard/event-creation/event-cration-history']);
          }, 1500);
      },
      error: (error) => {
        this.errorMessage = "Rellena todos los campos por favor";
      }
    })
  }
}
