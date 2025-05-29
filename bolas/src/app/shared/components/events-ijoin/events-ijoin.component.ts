import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { EventDTO } from '@dto/eventDTO';
import { EventService } from '@features/events/event.service';
import { FormatData } from 'app/shared/utils/format-data';

@Component({
  selector: 'app-events-ijoin',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './events-ijoin.component.html',
  styleUrl: './events-ijoin.component.css',
  providers: [EventService]
})
export class EventsIJoinComponent {
  public events: EventDTO[] = [];
  public format: FormatData = new FormatData();

  constructor(private eventService: EventService) {
    this.resfreshEvents();
  }

  public resfreshEvents(): void {
    this.eventService.getEventsIJoin().subscribe({
      next: (response: EventDTO[]) => {
        this.events = response;
      }
    })
  }

  public unjoin(eventId: string) {
    this.eventService.unjoin(eventId).subscribe({
      next: (response) => {
        window.location.reload();
      }
    })
  }
}
