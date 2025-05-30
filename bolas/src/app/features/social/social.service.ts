import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '@dto/loginDTO';
import { Observable } from 'rxjs';
import { GroupResumeDTO } from '@dto/groupResumeDTO';
import { UserResumeDTO } from '@dto/userResumeDTO';
import { IdDTO } from '@dto/idDTO';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private apiGetMyGroupsURL = "http://localhost:8080/bolas/api/group/getMyGroups";
  private apiSearchUserURL = "http://localhost:8080/bolas/api/group/find/user/";
  private apiFollowURL = "http://localhost:8080/bolas/api/group/follow";
  private apiUnfollowURL = "http://localhost:8080/bolas/api/group/stopFollowing";
  private apiGetFollowers = "http://localhost:8080/bolas/api/group/getFollowers";
  private apiGetFollows = "http://localhost:8080/bolas/api/group/getFollows";
  private apiCreateGroupURL = "http://localhost:8080/bolas/api/group/create";
  private apiGetMembersURL = "http://localhost:8080/bolas/api/group/getMembers";
  private apiGetGroupDataURL = "http://localhost:8080/bolas/api/group/getGroup/";
  private apiUpdateGroupNameURL = "http://localhost:8080/bolas/api/group/update";

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

  public follow(id: IdDTO): Observable<Boolean> {
    const session = LoginDTO.getSession();
    const body = {
      userId: id.id,
      session: {
          email: session.email,
          password: session.password
      }
    }
    return this.http.post<Boolean>(this.apiFollowURL, body);
  }

  public unFollow(id: IdDTO): Observable<Boolean> {
    const session = LoginDTO.getSession();
    const body = {
      userId: id.id,
      session: {
          email: session.email,
          password: session.password
      }
    }
    return this.http.post<Boolean>(this.apiUnfollowURL, body);
  }

  public getFollowers(id: IdDTO): Observable<UserResumeDTO[]> {
    const body = {
      id: id.id
    }
    return this.http.post<UserResumeDTO[]>(this.apiGetFollowers, body);
  }

  public getFollows(id: IdDTO): Observable<UserResumeDTO[]> {
    const body = {
      id: id.id
    }
    return this.http.post<UserResumeDTO[]>(this.apiGetFollows, body);
  }

  public createGroup(nameGroup: string): Observable<Boolean> {
    const session = LoginDTO.getSession();
    const body = {
      name: nameGroup,
      session: {
        email: session.email,
        password: session.password
      }
    }
    return this.http.post<Boolean>(this.apiCreateGroupURL, body);
  }

  public getMembersOfGroup(groupId: string): Observable<UserResumeDTO[]> {
    const body = {
      id: groupId
    }
    return this.http.post<UserResumeDTO[]>(this.apiGetMembersURL, body);
  }

  public getGroupData(groupId: string): Observable<GroupResumeDTO> {
    return this.http.get<GroupResumeDTO>(`${this.apiGetGroupDataURL}${groupId}`);

  }

  public updateNameOfGroup(groupId: string, newName: string): Observable<Boolean> {
    const body = {
      group: groupId, 
      name: newName
    }
    return this.http.post<Boolean>(this.apiUpdateGroupNameURL, body);
  }
}
