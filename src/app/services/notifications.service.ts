import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private apiUrl = 'http://localhost:8000/api/notifications/';
  

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  marquerCommeLue(notificationId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}${notificationId}/`, { lu: true });
  }
}
