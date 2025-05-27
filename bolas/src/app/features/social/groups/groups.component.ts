import { Component } from '@angular/core';
import { GroupResumeDTO } from '@dto/groupResumeDTO';
import { SocialService } from '../social.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-groups',
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css',
  providers: [SocialService]
})
export class GroupsComponent {

  public groups: GroupResumeDTO[] = [];

  constructor (private service: SocialService) {
    this.getGroups();
  }

  private getGroups(): void {
    this.service.getFilteredEvents().subscribe({
      next: (response: GroupResumeDTO[]) => {
        this.groups = response;
      }
    })
  }
}
