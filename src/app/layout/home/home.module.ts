import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CardComponent } from './components/card/card.component';
import { ChartMartinsComponent } from './components/chart-martins/chart-martins.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    ChartsModule
  ],
  declarations: [
    HomeComponent,
    CardComponent,
    ChartMartinsComponent
  ],
  exports: [

  ]
})
export class HomeModule { }
