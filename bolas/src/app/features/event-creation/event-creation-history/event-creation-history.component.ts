import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventDTO } from '@dto/eventDTO';
import { EventCreationService } from '../event-creation.service';
import { FormatData } from 'app/shared/utils/format-data';

@Component({
  selector: 'app-event-creation-history',
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './event-creation-history.component.html',
  styleUrl: './event-creation-history.component.css',
  providers: [EventCreationService]
})
export class EventCreationHistoryComponent {
  public events: EventDTO[] = [];
  public format: FormatData = new FormatData();

  constructor (private service: EventCreationService) {
    this.refreshEvents();
  }

  private refreshEvents(): void {
    this.service.getMyCreatedEvents().subscribe({
      next: (response: EventDTO[]) => {
        this.events = response;
      },
      error: (error) => {
        this.events = [];
      }
    });
  }

  public delete(event: string): void {
    this.service.delete(event).subscribe({
      next: (response) => {
        this.refreshEvents();
      }
    })
  }
}
