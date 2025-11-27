import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Diarioservice } from '../../../core/services/diarioservice';
import { LoginService } from '../../../core/services/login';

@Component({
  selector: 'app-progreso',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, BaseChartDirective],
  templateUrl: './progreso.html',
  styleUrls: ['./progreso.css']
})
export class ProgresoComponent implements OnInit {
  
  // Datos para las tarjetas de resumen
  diasRegistrados = 0;
  diasFelices = 0;
  diasAnsiedad = 0;

  // Configuración del Gráfico
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [], // Se llenará dinámicamente con fechas reales
    datasets: [
      {
        data: [], // Se llenará con intensidades reales
        label: 'Nivel de Intensidad Emocional',
        fill: true,
        tension: 0.4,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)'
      }
    ]
  };
  
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { display: true } }
  };
lineChartLegend: boolean|undefined;

  constructor(
    private diarioService: Diarioservice,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.cargarDatosReales();
  }

  cargarDatosReales() {
    const usuarioActual = this.loginService.getUsername(); // Obtener usuario logueado

    this.diarioService.listar().subscribe(data => {
      // 1. Filtrar solo los diarios de este usuario
      const misDiarios = data.filter((d: any) => d.usuario.username === usuarioActual);
      
      // 2. Ordenar por fecha (antiguo a nuevo)
      misDiarios.sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

      // 3. Mapear datos para el gráfico
      this.lineChartData.labels = misDiarios.map((d: any) => new Date(d.fecha).toLocaleDateString('es-ES', { weekday: 'short' }));
      
      // Asumimos que en 'emociones' guardas la intensidad. Si es una lista, tomamos la primera o promedio.
      this.lineChartData.datasets[0].data = misDiarios.map((d: any) => {
         return d.emociones ? d.emociones.intensidad : 5; // Valor por defecto si no hay emoción
      });

      // 4. Calcular Estadísticas
      this.diasRegistrados = misDiarios.length;
      this.diasFelices = misDiarios.filter((d: any) => d.emociones?.tipoEmocion === 'Feliz').length;
      this.diasAnsiedad = misDiarios.filter((d: any) => d.emociones?.tipoEmocion === 'Ansioso').length;

      // Actualizar gráfico (truco para refrescar ng2-charts)
      this.lineChartData = { ...this.lineChartData };
    });
  }

  exportarPDF() {
    // Aquí podrías usar jsPDF para generar el reporte real con los datos de 'misDiarios'
    alert('Generando reporte PDF con tus ' + this.diasRegistrados + ' registros...');
  }
}