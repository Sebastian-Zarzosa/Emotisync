import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sugerencias',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './sugerencias.html',
  styleUrls: ['./sugerencias.css']
})
export class SugerenciasComponent {
  
  constructor(private router: Router) {}

  navegarChatbot() {
    this.router.navigate(['/chatbot']);
  }

  navegarAsesor() {
    Swal.fire({
      title: 'Contactar Asesor',
      text: 'Pronto podrás agendar citas directamente con nuestros especialistas.',
      icon: 'info',
      confirmButtonColor: '#3640E0'
    });
  }
}