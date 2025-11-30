import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../core/services/login';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatListModule } from "@angular/material/list";


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterLink, MatListModule],
  templateUrl: './principal.html',
  styleUrls: ['./principal.css']
})
export class Principal implements OnInit {
  rol: string = '';
  username: string = '';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.rol = this.loginService.getRole();
    this.username = this.loginService.getUsername();
  }

  // Helpers para el HTML
  get isPaciente() { return this.rol === 'PACIENTE'; }
  get isEspecialista() { return this.rol === 'ESPECIALISTA'; }
  get isFamiliar() { return this.rol === 'FAMILIAR'; }
  get isAdmin() { return this.rol === 'ADMIN'; }
}