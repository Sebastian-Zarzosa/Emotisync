import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CrisisDTO } from '../../../../../models/CrisisDTO';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { CrisisService } from '../../../../../core/services/crisisservice';

@Component({
  selector: 'app-busq-buscarporusurangofechas',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, BaseChartDirective],
  templateUrl: './busq-buscarporusurangofechas.html',
  styleUrl: './busq-buscarporusurangofechas.css',
  providers: [provideCharts(withDefaultRegisterables())],
  standalone: true,
})
export class BusqBuscarporusurangofechas implements OnInit {
  // Variables para el formulario
  userId: number | null = null;
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;

  // Variables de control
  hasData = false;
  mensajeError = '';
  listaCrisis: CrisisDTO[] = [];
  displayedColumns: string[] = ['id', 'fecha', 'ritmo', 'duracion'];

  // Configuración del Grafico (LINEA para ver evolución temporal)
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: { tension: 0.3 }
    },
    scales: {
      y: { title: { display: true, text: 'Ritmo Cardíaco' } }
    },
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Evolución en el rango seleccionado' }
    }
  };

  lineChartType: ChartType = 'line';
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  constructor(private cService: CrisisService) {}

  ngOnInit(): void {}

  buscar() {
    // Validaciones
    if (!this.userId || !this.fechaInicio || !this.fechaFin) {
      this.mensajeError = "Por favor completa todos los campos";
      return;
    }

    // Formatear fechas a string 'YYYY-MM-DD' para Java
    const inicioStr = this.formatearFecha(this.fechaInicio);
    const finStr = this.formatearFecha(this.fechaFin);

    this.hasData = false;
    this.mensajeError = '';

    this.cService.getBuscarporusurangofechas(this.userId, inicioStr, finStr).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.listaCrisis = data;
          this.actualizarGrafico(data);
        } else {
          this.mensajeError = "No se encontraron crisis para este usuario en esas fechas.";
        }
      },
      error: (err) => {
        console.error(err);
        this.mensajeError = "Ocurrió un error al buscar (Verifica el ID o las fechas).";
      }
    });
  }

  actualizarGrafico(data: CrisisDTO[]) {
    // MatDatepicker entrega un objeto Date de JavaScript. date: Date
    // backend espera un LocalDate, Spring Boot necesita String "YYYY-MM-DD"
    // la funcion transforma el objeto Date a String
    // ordenamos por fecha para que la línea tenga sentido cronológico
    // (asumiendo que data.fecha es string ISO o Date)
    data.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

    const etiquetas = data.map(item => {
        // Formato corto de fecha para el eje X
        const d = new Date(item.fecha);
        return `${d.getDate()}/${d.getMonth() + 1}`;
    });
    
    const ritmos = data.map(item => item.ritmo);

    this.lineChartData = {
      labels: etiquetas,
      datasets: [
        {
          data: ritmos,
          label: 'Ritmo Cardíaco',
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          fill: true,
          pointBackgroundColor: '#1E88E5'
        }
      ]
    };
  }

  // convertir Date de JS a "YYYY-MM-DD"
  formatearFecha(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
    //return year + '-' + month + '-' + day;
  }

}
