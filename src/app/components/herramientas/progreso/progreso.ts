import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Diarioservice } from '../../../core/services/diarioservice';
import { LoginService } from '../../../core/services/login';

// Imports para PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-progreso',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, BaseChartDirective],
  templateUrl: './progreso.html',
  styleUrls: ['./progreso.css']
})
export class ProgresoComponent implements OnInit {
  
  diasRegistrados = 0;
  diasFelices = 0;
  diasAnsiedad = 0;
  username: string = '';
  today: Date = new Date(); // Fecha actual para el reporte

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Intensidad Emocional',
        fill: true,
        tension: 0.4,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)'
      }
    ]
  };
  
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartLegend = true;

  constructor(
    private diarioService: Diarioservice,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.username = this.loginService.getUsername();
    this.cargarDatosReales();
  }

  cargarDatosReales() {
    this.diarioService.listar().subscribe(data => {
      // 1. Filtrar solo los diarios del usuario logueado
      const misDiarios = data.filter((d: any) => 
          d.usuario && d.usuario.username === this.username
      );
      
      // 2. Ordenar por fecha
      misDiarios.sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

      // 3. Mapear datos
      this.lineChartData.labels = misDiarios.map((d: any) => new Date(d.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }));
      this.lineChartData.datasets[0].data = misDiarios.map((d: any) => d.emociones ? d.emociones.intensidad : 0);

      // 4. Calcular Estadísticas
      this.diasRegistrados = misDiarios.length;
      this.diasFelices = misDiarios.filter((d: any) => d.emociones?.tipoEmocion?.toLowerCase().includes('feliz')).length;
      this.diasAnsiedad = misDiarios.filter((d: any) => d.emociones?.tipoEmocion?.toLowerCase().includes('ansioso')).length;

      // 5. Refrescar gráfico
      this.lineChartData = { ...this.lineChartData };
    });
  }

  exportarPDF() {
    // Capturamos el elemento por ID
    const DATA = document.getElementById('contenidoParaPDF');
    
    if(DATA) {
      html2canvas(DATA).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Reporte_Progreso_${this.username}.pdf`);
      });
    }
  }
}