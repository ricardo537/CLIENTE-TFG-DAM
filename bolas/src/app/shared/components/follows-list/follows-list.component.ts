import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IdDTO } from '@dto/idDTO';
import { UserResumeDTO } from '@dto/userResumeDTO';
import { SocialService } from '@features/social/social.service';

@Component({
  selector: 'app-follows-list',
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './follows-list.component.html',
  styleUrl: './follows-list.component.css',
  providers: [SocialService]
})
export class FollowsListComponent {
  public userId: IdDTO = new IdDTO("");
  public follows: UserResumeDTO[] = [];

  constructor(private socialService: SocialService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.userId = new IdDTO(params.get('id') || '');
    });
    this.getFollows();
  }

  public getFollows(): void {
    this.socialService.getFollows(this.userId).subscribe({
      next: (response: UserResumeDTO[]) => {
        this.follows = response;
      }
    })
  }
}
