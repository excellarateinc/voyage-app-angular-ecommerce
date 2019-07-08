import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ForgotPassword } from './forgot-password.model';

@Injectable()
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  sendVerificationCode(model: ForgotPassword): Promise<ForgotPassword> {
    return this.http.post<ForgotPassword>(`${environment.API_URL}/forgot-password`, model).toPromise();
  }

  verifyCode(model: ForgotPassword): Promise<ForgotPassword> {
    return this.http.post<ForgotPassword>(`${environment.API_URL}/forgot-password/verify`, model).toPromise();
  }

  changePassword(model: ForgotPassword): Promise<ForgotPassword> {
    return this.http.put<ForgotPassword>(`${environment.API_URL}/forgot-password`, model).toPromise();
  }
}
