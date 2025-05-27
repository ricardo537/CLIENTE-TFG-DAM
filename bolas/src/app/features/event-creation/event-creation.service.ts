import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '@dto/loginDTO';
import { EventCreationDTO } from '@dto/eventCreationDTO';

@Injectable({
  providedIn: 'root'
})
export class EventCreationService {
  private apiPublishURL = "http://localhost:8080/bolas/api/event/publish";
  private apiGetMyCreatedEventsURL = "http://localhost:8080/bolas/api/event/getMyCreatedEvents";

  constructor(private http: HttpClient) { }

  public publish(event: EventCreationDTO): Observable<Boolean> {
    const session = LoginDTO.getSession();
    const body = {
        name: event.name,
        description: event.description,
        address: event.address,
        startDate: event.startDate,
        endDate: event.endDate,
        type: event.type,
        sport: event.sport,
        minParticipants: event.minParticipants,
        maxParticipants: event.maxParticipants,
        session: {
            email: session.email,
            password: session.password
        },
        price: event.price,
        gender: event.gender,
        typeParticipant: event.typeParticipant
    }
    return this.http.post<Boolean>(this.apiPublishURL, body);
  }

  //public getMyCreatedEvents(): Observable<any> {
    
  //}

}
