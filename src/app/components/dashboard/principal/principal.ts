import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon'; // Importar Iconos
import { MatButtonModule } from '@angular/material/button'; // Importar Botones
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../core/services/login'; // Importar LoginService
import { CommonModule } from '@angular/common'; // Para pipes como date

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterLink,
    CommonModule
  ],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal implements OnInit {
  username: string = '';
  today: Date = new Date();
  isAdmin: boolean = false;
  isPaciente: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.username = this.loginService.getUsername();
    this.isAdmin = this.loginService.isAdmin();
    this.isPaciente = this.loginService.isPaciente();
  }
}