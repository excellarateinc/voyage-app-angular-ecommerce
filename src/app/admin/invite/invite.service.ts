import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InviteService {

  constructor(private http: HttpClient) { }

  invite(phone: string): Observable<void> {
    return this.http.post<void>(`${environment.API_URL}/invitations`, { phone });
  }
}
