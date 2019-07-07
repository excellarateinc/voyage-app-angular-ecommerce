import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';

const contactUsRoutes: Routes = [
  { path: '', component: ContactUsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(contactUsRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
