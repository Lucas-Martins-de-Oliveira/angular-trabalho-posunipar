import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoComponent } from './grupo.component';
import { GrupoModalComponent } from './modal/grupo-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrupoRoutingModule } from './grupo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    GrupoComponent,
    GrupoModalComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    GrupoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    GrupoModalComponent
  ]
})
export class GrupoModule { }
