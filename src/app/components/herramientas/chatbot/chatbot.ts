import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../../core/services/chatbotservice';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Interfaz simple para los mensajes
interface Mensaje {
  texto: string;
  esUsuario: boolean; // true = Usuario, false = IA
  hora: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatIconModule, 
    MatButtonModule, 
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  mensajes: Mensaje[] = [
    { texto: '¡Hola! Soy EmotiBot 🤖. ¿En qué puedo apoyarte hoy?', esUsuario: false, hora: new Date() }
  ];
  
  nuevoMensaje: string = '';
  escribiendo: boolean = false;

  constructor(private chatService: ChatbotService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  enviar() {
    if (!this.nuevoMensaje.trim()) return;

    // 1. Agregar mensaje del usuario
    const pregunta = this.nuevoMensaje;
    this.mensajes.push({ texto: pregunta, esUsuario: true, hora: new Date() });
    this.nuevoMensaje = '';
    this.escribiendo = true;

    // 2. Llamar al backend
    this.chatService.enviarMensaje(pregunta).subscribe({
      next: (res: any) => {
        this.mensajes.push({ 
          texto: res.respuesta, 
          esUsuario: false, 
          hora: new Date() 
        });
        this.escribiendo = false;
      },
      error: (err) => {
        console.error(err);
        this.mensajes.push({ 
          texto: 'Lo siento, tuve un problema de conexión. Intenta de nuevo.', 
          esUsuario: false, 
          hora: new Date() 
        });
        this.escribiendo = false;
      }
    });
  }
}