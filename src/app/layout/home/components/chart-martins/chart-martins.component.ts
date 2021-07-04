import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ChartType } from 'chart.js';
import { InfoChartViewModel } from '../../models/home.model';
 
@Component({
  selector: 'app-chart-martins',
  templateUrl: './chart-martins.component.html',
  styleUrls: ['./chart-martins.component.scss']
})
export class ChartMartinsComponent implements OnInit {

  @Input()
  titulo?: string;

  @Input()
  dados: InfoChartViewModel = { loading: true, datasets: [], labels: [] };

  @Input()
  typeChart: ChartType = 'line';

  @Output()
  onRefresh: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  atualizarDados(): void {
    this.onRefresh.emit();
  }

}
