import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '@dto/loginDTO';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUploadURL = "http://localhost:8080/bolas/api/media/upload/profile/";

  constructor(private http: HttpClient) { }

  public upload(email: string, file:FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUploadURL}${email}`, file);
  }

}
