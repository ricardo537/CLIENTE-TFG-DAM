import { Component } from '@angular/core';
import { SocialService } from '../social.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserResumeDTO } from '@dto/userResumeDTO';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-player-profile',
  imports: [HttpClientModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './search-user-profile.component.html',
  styleUrl: './search-user-profile.component.css',
  providers: [SocialService]
})
export class SearchUserProfileComponent {
  public users: UserResumeDTO[] = [];
  public searchControl = new FormControl('');

  constructor (private service: SocialService) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(value => {
        this.service.searchUser(value).subscribe(response => {
          this.users = response;
        });
      });
  }
}
