import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Emocionesservice } from '../../../../../core/services/emocionesservice';

@Component({
  selector: 'app-graf-promemociointen',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './graf-promemociointen.html',
  styleUrl: './graf-promemociointen.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class GrafPromemociointen implements OnInit  {
  hasData = false;
    barChartOptions: ChartOptions = {
      responsive: true,
    };
    barChartLabels: string[] = [];
    barChartLegend = true;
    barChartData: ChartDataset[] = [];
    // tipo 'pie' (torta), 'bar' (barras), 'doughnut' (dona)
    barChartType: ChartType = 'pie';
  
    constructor(private eService: Emocionesservice) {}

    ngOnInit(): void {
    // Llamamos al servicio
    this.eService.getPromEmocioInten().subscribe((data) => {
      // Un console.log para que veas en el navegador qué llega
      console.log('Datos llegando del backend:', data); 
      // Verificamos si la lista tiene datos
      if (data && data.length > 0) {
        this.hasData = true;

        // PASO CLAVE 1: Asignar las etiquetas (Labels)
        // En tu Java tienes 'intensidad', así que usaremos eso como nombre.
        // Quedará algo como: ["Intensidad 1", "Intensidad 5", etc.]
        this.barChartLabels = data.map((item: any) => 'Usuario ' + item.intensidad);

        // PASO CLAVE 2: Asignar los datos numéricos y colores
        this.barChartData = [
          {
            data: data.map((item: any) => item.promedio),
            label: 'Promedio de Intensidad', // Cambié el título para que tenga sentido
            // Agregué más colores por si traes más de 2 intensidades
            backgroundColor: [
              '#FF6384', // Rojo claro
              '#36A2EB', // Azul
              '#FFCE56', // Amarillo
              '#4BC0C0', // Verde agua
              '#9966FF'  // Violeta
            ],
          },
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
