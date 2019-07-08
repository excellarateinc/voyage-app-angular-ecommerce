import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { ExamplesModule } from '../examples/examples.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    StoreRoutingModule,
    ExamplesModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [StoreComponent]
})
export class StoreModule { }
