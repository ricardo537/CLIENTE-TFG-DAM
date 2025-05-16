import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterDTO } from '@dto/registerDTO';
import { LoginDTO } from '@dto/loginDTO';
import { UpdateDTO } from '@dto/updateDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRegisterURL = "http://localhost:8080/bolas/api/user/register";
  private apiLoginURL = "http://localhost:8080/bolas/api/user/login";
  private apiUpdateURL = "http://localhost:8080/bolas/api/user/update";

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
    return this.http.post<string>(this.apiRegisterURL, body, { responseType: 'text' as 'json' });
  }

  public update(update:UpdateDTO): Observable<LoginDTO> {
    const session = LoginDTO.getSession();
    const body = {
      "email": update.email,
      "password": update.password,
      "name": update.name,
      "description": update.description,
      "session": {
        "email": session.email,
        "password": session.password
      }
    }
    return this.http.post<LoginDTO>(this.apiUpdateURL, body);
  }
}
