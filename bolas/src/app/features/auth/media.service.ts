import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUploadURL = "http://localhost:8080/bolas/api/media/upload/profile/";
  private apiUploadGroupURL = "http://127.0.0.1:8080/bolas/api/media/upload/group/";

  constructor(private http: HttpClient) { }

  public upload(email: string, file:FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUploadURL}${email}`, file);
  }

  public uploadGroup(groupId: string, file: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUploadGroupURL}${groupId}`, file);
  }

}
