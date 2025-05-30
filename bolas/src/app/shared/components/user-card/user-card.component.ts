import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IdDTO } from '@dto/idDTO';
import { ProfileDTO } from '@dto/profileDTO';
import { AuthService } from '@features/auth/auth.service';
import { SocialService } from '@features/social/social.service';

@Component({
  selector: 'app-user-card',
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
  providers: [AuthService, SocialService]
})
export class UserCardComponent {
  public profile: ProfileDTO = ProfileDTO.getVoid();
  public userId: IdDTO = new IdDTO("");

  constructor(private authService: AuthService, private route: ActivatedRoute, private socialService: SocialService) {
    this.route.paramMap.subscribe(params => {
      this.userId = new IdDTO(params.get('id') || '');
    });
    this.getProfileData();
  }

  public getProfileData(): void {
    this.authService.getProfile(this.userId).subscribe({
      next: (prof: ProfileDTO) => {
        this.profile = prof;
      }
    });
  }

  public follow(): void {
    this.socialService.follow(this.userId).subscribe({
      next: (response) => {
        this.getProfileData();
      }
    })
  }

  public unfollow(): void {
    this.socialService.unFollow(this.userId).subscribe({
      next: (response) => {
        this.getProfileData();
      }
    })
  }

}
