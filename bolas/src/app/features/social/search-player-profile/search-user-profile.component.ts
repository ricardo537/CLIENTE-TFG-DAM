import { Component } from '@angular/core';
import { GroupResumeDTO } from '@dto/groupResumeDTO';
import { SocialService } from '../social.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-player-profile',
  imports: [HttpClientModule],
  templateUrl: './search-user-profile.component.html',
  styleUrl: './search-user-profile.component.css',
  providers: [SocialService]
})
export class SearchUserProfileComponent {
  
}
