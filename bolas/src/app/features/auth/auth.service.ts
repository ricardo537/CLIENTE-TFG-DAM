import { Injectable } from '@angular/core';
import { LoginDTO } from '../../dto/LoginDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterDTO } from '../../dto/registerDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRegisterURL = "http://localhost:8080/bolas/api/user/register";
  private apiLoginURL = "http://localhost:8080/bolas/api/user/login";

  constructor(private http: HttpClient) { }

  public login(login: LoginDTO): Observable<LoginDTO> {
    const body = {
      "email": login.email,
      "password": login.password
    };
    return this.http.post<LoginDTO>(this.apiLoginURL, body);
  }

  public register(register: RegisterDTO): Observable<string> {
    const body = {
      "email": register.email,
      "password": register.password,
      "name": register.name
    };
    console.log(body);
    return this.http.post<string>(this.apiRegisterURL, body);
  }
}
