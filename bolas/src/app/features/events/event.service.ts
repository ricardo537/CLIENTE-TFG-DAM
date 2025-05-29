import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterEventDTO } from '@dto/filterEventDTO';
import { LoginDTO } from '@dto/loginDTO';
import { EventDTO } from '@dto/eventDTO';
import { Observable } from 'rxjs';
import { EventGroupDTO } from '@dto/eventGroupDTO';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiGetFilteredEventsURL = "http://localhost:8080/bolas/api/event/getFilteredEvents?page=";
  private apiGetGroupEventsURL = "http://localhost:8080/bolas/api/event/getEventsOfGroup";
  private apiJoinEventURL = "http://localhost:8080/bolas/api/event/join";
  private apiJoinInTeamURL = "http://localhost:8080/bolas/api/event/joinTeam";
  private apiUnjoinURL = "http://localhost:8080/bolas/api/event/unjoin";

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

  public getGroupEvents(groupId: string): Observable<EventGroupDTO[]> {
    const session = LoginDTO.getSession();
    const body = {
      id: groupId,
      session: {
        email: session.email,
        password: session.password
      }
    }
    return this.http.post<EventGroupDTO[]>(this.apiGetGroupEventsURL, body);
  }

  public joinEvent(groupId: string, eventId: string): Observable<Boolean> {
    const session = LoginDTO.getSession();
    const body = {
      event: eventId,
      group: groupId,
      session: {
        email: session.email,
        password: session.password
      }
    }
    return this.http.post<Boolean>(this.apiJoinEventURL, body);
  }

  public joinEventInTeam(groupId: string, eventId: string): Observable<Boolean> {
    const session = LoginDTO.getSession();
    const body = {
      event: eventId,
      group: groupId,
      session: {
        email: session.email,
        password: session.password
      }
    }
    return this.http.post<Boolean>(this.apiJoinInTeamURL, body);
  }

  public unjoin(eventId: string): Observable<Boolean> {
    const session = LoginDTO.getSession();
    const body = {
      event: eventId,
      session: {
        email: session.email,
        password: session.password
      }
    }
    return this.http.post<Boolean>(this.apiUnjoinURL, body);
  }
}
