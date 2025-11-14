import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event, SearchParams, DateTimeSearchParams } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  // private apiUrl = 'http://localhost:8081/api/v1';
  private apiUrl = 'https://pppp-api.azurewebsites.net/api/v1';
  

  constructor(private http: HttpClient) {}

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/events`, event);
  }

  searchEvents(params: SearchParams): Observable<any> {
    let httpParams = new HttpParams();
    
    if (params.eventType) {
      httpParams = httpParams.set('eventType', params.eventType);
    }
    if (params.since) {
      httpParams = httpParams.set('since', params.since);
    }
    if (params.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    return this.http.get(`${this.apiUrl}/events/search`, { params: httpParams });
  }

  searchEventsByDateTime(params: DateTimeSearchParams): Observable<any> {
    let httpParams = new HttpParams()
      .set('startTime', params.startTime)
      .set('endTime', params.endTime);
    
    if (params.eventType) {
      httpParams = httpParams.set('eventType', params.eventType);
    }
    if (params.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    return this.http.get(`${this.apiUrl}/events/search/datetime`, { params: httpParams });
  }
}
