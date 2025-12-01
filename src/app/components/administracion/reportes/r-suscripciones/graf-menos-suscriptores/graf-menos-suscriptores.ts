import { Component, OnInit } from '@angular/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UsuarioSuscripcionService } from '../../../../../core/services/usuario_suscripcionservice';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-graf-menos-suscriptores',
  standalone: true,
  imports: [BaseChartDirective, MatIcon],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './graf-menos-suscriptores.html',
  styleUrl: './graf-menos-suscriptores.css'
})
export class GrafMenosSuscriptores implements OnInit {
  public pieChartOptions: ChartOptions = { responsive: true };
  public pieChartLabels: string[] = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartData: ChartDataset[] = [];
  public hasData = false;

  constructor(private uS: UsuarioSuscripcionService) {}

  ngOnInit() {
    this.uS.buscarMenosSuscriptores().subscribe(data => {
      if (data.length > 0) {
        this.hasData = true;
        this.pieChartLabels = data.map(d => d.nombrePlan);
        this.pieChartData = [{
          data: data.map(d => d.suscriptoresActivos),
          label: 'Suscriptores Activos'
        }];
      }
    });
  }
}