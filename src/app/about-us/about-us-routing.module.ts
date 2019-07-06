import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us.component';

const aboutUsRoutes: Routes = [
  { path: '', component: AboutUsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(aboutUsRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
