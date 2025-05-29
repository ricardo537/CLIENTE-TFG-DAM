import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventGroupDTO } from '@dto/eventGroupDTO';
import { GroupResumeDTO } from '@dto/groupResumeDTO';
import { UserResumeDTO } from '@dto/userResumeDTO';
import { EventService } from '@features/events/event.service';
import { SocialService } from '@features/social/social.service';
import { FormatData } from 'app/shared/utils/format-data';

@Component({
  selector: 'app-group-chat',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.css',
  providers: [EventService, SocialService]
})
export class GroupChatComponent {
  public groupId: string = "";
  public groupData: GroupResumeDTO = new GroupResumeDTO('0', 'No se ha encontrado el grupo', '');
  public events: EventGroupDTO[] = [];
  public members: UserResumeDTO[] = []
  public format: FormatData = new FormatData();

  constructor (private route: ActivatedRoute, private eventService: EventService, private socialService: SocialService) {
    this.route.paramMap.subscribe(params => {
          this.groupId = params.get('id') || '';
          this.refreshEvents();
          this.socialService.getGroupData(this.groupId).subscribe({
            next: (response: GroupResumeDTO) => {
              this.groupData = response;
              this.socialService.getMembersOfGroup(this.groupId).subscribe({
                next: (memberList: UserResumeDTO[]) => {
                  this.members = memberList;
                }
              })
            }
          })
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
