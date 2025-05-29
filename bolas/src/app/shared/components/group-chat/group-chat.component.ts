import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventGroupDTO } from '@dto/eventGroupDTO';
import { EventService } from '@features/events/event.service';
import { FormatData } from 'app/shared/utils/format-data';

@Component({
  selector: 'app-group-chat',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.css',
  providers: [EventService]
})
export class GroupChatComponent {
  public groupId: string = "";
  public events: EventGroupDTO[] = [];
  public format: FormatData = new FormatData();

  constructor (private route: ActivatedRoute, private eventService: EventService) {
    this.route.paramMap.subscribe(params => {
          this.groupId = params.get('id') || '';
          this.refreshEvents();
    });
  }

  private refreshEvents(): void {
    this.eventService.getGroupEvents(this.groupId).subscribe({
        next: (response: EventGroupDTO[]) => {
          this.events = response;
        }
    })
  }

  public unjoin(eventId: string) {
    this.eventService.unjoin(eventId).subscribe({
      next: (response) => {
        window.location.reload();
      }
    });
  }

  public join(eventId: string): void {
    this.eventService.joinEventInTeam(this.groupId, eventId).subscribe({
      next: (response) => {
        window.location.reload();
      }
    })
  }

}
