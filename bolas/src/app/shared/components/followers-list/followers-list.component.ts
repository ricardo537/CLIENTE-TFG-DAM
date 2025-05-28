import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IdDTO } from '@dto/idDTO';
import { UserResumeDTO } from '@dto/userResumeDTO';
import { SocialService } from '@features/social/social.service';

@Component({
  selector: 'app-followers-list',
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './followers-list.component.html',
  styleUrl: './followers-list.component.css',
  providers: [SocialService]
})
export class FollowersListComponent {
  public userId: IdDTO = new IdDTO("");
  public followers: UserResumeDTO[] = [];

  constructor(private socialService: SocialService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.userId = new IdDTO(params.get('id') || '');
    });
    this.getFollowers();
  }

  public getFollowers(): void {
    this.socialService.getFollowers(this.userId).subscribe({
      next: (response: UserResumeDTO[]) => {
        this.followers = response;
      }
    })
  }
}
