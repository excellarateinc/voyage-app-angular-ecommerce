import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ContactUs } from './contact-us.model';

@Injectable()
export class ContactUsService {

  constructor(private http: HttpClient) { }

  getInvitedBy(): Observable<ContactUs> {
    return this.http.get<ContactUs>(`${environment.API_URL}/invitations/invited-by`);
  }
}
