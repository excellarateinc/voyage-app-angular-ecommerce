import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsService } from './contact-us.service';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ContactUsComponent],
  providers: [
    ContactUsService
  ]
})
export class ContactUsModule { }
