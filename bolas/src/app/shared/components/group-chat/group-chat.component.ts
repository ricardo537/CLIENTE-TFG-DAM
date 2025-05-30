import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventGroupDTO } from '@dto/eventGroupDTO';
import { GroupResumeDTO } from '@dto/groupResumeDTO';
import { UserResumeDTO } from '@dto/userResumeDTO';
import { MediaService } from '@features/auth/media.service';
import { EventService } from '@features/events/event.service';
import { SocialService } from '@features/social/social.service';
import { FormatData } from 'app/shared/utils/format-data';

@Component({
  selector: 'app-group-chat',
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule],
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.css',
  providers: [EventService, SocialService, MediaService]
})
export class GroupChatComponent {
  public groupId: string = "";
  public groupData: GroupResumeDTO = new GroupResumeDTO('0', 'No se ha encontrado el grupo', '');
  public events: EventGroupDTO[] = [];
  public members: UserResumeDTO[] = []
  public format: FormatData = new FormatData();
  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  public changeName: boolean = false;
  public newName: string = '';

  constructor (private route: ActivatedRoute, private eventService: EventService, private socialService: SocialService, private mediaService: MediaService) {
    this.route.paramMap.subscribe(params => {
          this.groupId = params.get('id') || '';
          this.socialService.getGroupData(this.groupId).subscribe({
            next: (response: GroupResumeDTO) => {
              this.groupData = response;
              this.newName = this.groupData.name;
              this.socialService.getMembersOfGroup(this.groupId).subscribe({
                next: (memberList: UserResumeDTO[]) => {
                  this.members = memberList;
                  this.refreshEvents();
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

  public openSelector() {
    this.inputFile.nativeElement.click();
  }
  
  public fileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      this.mediaService.uploadGroup(this.groupId, formData).subscribe({
        next: (response) => {
          window.location.reload();
        }, error: (error) => {
          window.location.reload();
        }
      })
    }
  }

  public changeNameVisibility(): void {
    this.changeName = !this.changeName;
  }

  public updateName(): void {
    this.socialService.updateNameOfGroup(this.groupId, this.newName).subscribe({
      next: (response) => {
        window.location.reload();
      }
    })
  }

}
