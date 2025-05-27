import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '@dto/loginDTO';
import { Observable } from 'rxjs';
import { GroupResumeDTO } from '@dto/groupResumeDTO';
import { UserResumeDTO } from '@dto/userResumeDTO';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private apiGetMyGroupsURL = "http://localhost:8080/bolas/api/group/getMyGroups";
  private apiSearchUserURL = "http://localhost:8080/bolas/api/group/find/user/";

  constructor(private http: HttpClient) { }

  public getFilteredEvents(): Observable<GroupResumeDTO[]> {
    const session = LoginDTO.getSession();
    const body = {
        email: session.email,
        password: session.password
    }
    return this.http.post<GroupResumeDTO[]>(this.apiGetMyGroupsURL, body);
  }

  public searchUser(search:any): Observable<UserResumeDTO[]> {
    return this.http.get<UserResumeDTO[]>(`${this.apiSearchUserURL}${search}`);
  }
}
