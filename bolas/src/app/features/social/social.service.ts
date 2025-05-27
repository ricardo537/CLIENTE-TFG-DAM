import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '@dto/loginDTO';
import { Observable } from 'rxjs';
import { GroupResumeDTO } from '@dto/groupResumeDTO';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private apiGetMyGroupsURL = "http://localhost:8080/bolas/api/group/getMyGroups";

  constructor(private http: HttpClient) { }

  public getFilteredEvents(): Observable<GroupResumeDTO[]> {
    const session = LoginDTO.getSession();
    const body = {
        email: session.email,
        password: session.password
    }
    return this.http.post<GroupResumeDTO[]>(this.apiGetMyGroupsURL, body);
  }
}
