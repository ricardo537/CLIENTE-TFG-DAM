import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterEventDTO } from '@dto/filterEventDTO';
import { LoginDTO } from '@dto/loginDTO';
import { EventDTO } from '@dto/eventDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiGetFilteredEventsURL = "http://localhost:8080/bolas/api/event/getFilteredEvents?page=";

  constructor(private http: HttpClient) { }

  public getFilteredEvents(filter: FilterEventDTO, page: number): Observable<EventDTO[]> {
    const session = LoginDTO.getSession();
    const body = {
        startDate: filter.startDate,
        type: filter.type,
        gender: filter.gender,
        typeParticipant:filter.typeParticipant,
        sport: filter.sport,
        session: {
            email: session.email,
            password: session.password
        }
    }
    return this.http.post<EventDTO[]>(`${this.apiGetFilteredEventsURL}${page}&size=3`, body);
  }
}
