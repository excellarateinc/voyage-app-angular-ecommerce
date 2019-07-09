import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './verification/verification.component';
import { PublicGuardService } from './public-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SmsConfirmationComponent } from './sms-confirmation/sms-confirmation.component';
import { AuthGuardService } from './auth-guard.service';

const authRoutes: Routes = [
  { path: 'authentication/login', component: LoginComponent, canActivate: [PublicGuardService] },
  { path: 'authentication/register', component: RegisterComponent, canActivate: [PublicGuardService] },
  { path: 'authentication/verification', component: VerificationComponent },
  { path: 'authentication/forgot-password', component: ForgotPasswordComponent, canActivate: [PublicGuardService] },
  { path: 'authentication/sms-confirmation', component: SmsConfirmationComponent, canActivate: [PublicGuardService] },
  { path: 'authentication/linked-in-sync', component: SmsConfirmationComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
