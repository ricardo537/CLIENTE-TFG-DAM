import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventDTO } from '@dto/eventDTO';
import { EventCreationService } from '../event-creation.service';

@Component({
  selector: 'app-event-creation-history',
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './event-creation-history.component.html',
  styleUrl: './event-creation-history.component.css',
  providers: [EventCreationService]
})
export class EventCreationHistoryComponent {
  public events: EventDTO[] = [];

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

  public generateGoogleMapsSearchUrl(address: string): string {
    const baseUrl = "https://www.google.com/maps/search/";
    const formattedAddress = encodeURIComponent(address.trim()).replace(/%20/g, "+");
    return `${baseUrl}${formattedAddress}`;
  }

  public formatReadableDateCreation(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return date.toLocaleString('es-ES', options);
  }

  public formatReadableDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return date.toLocaleString('es-ES', options);
  }

  public delete(event: string): void {
    this.service.delete(event).subscribe({
      next: (response) => {
        this.refreshEvents();
      }
    })
  }
}
