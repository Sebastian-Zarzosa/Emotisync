import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RecursoService } from '../../../core/services/recurso-service';
import { Recurso } from '../../../models/recurso';
import { LoginService } from '../../../core/services/login';
import { UsuarioService } from '../../../core/services/usuarioservice';

@Component({
  selector: 'app-grabadora',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './grabadora.html',
  styleUrls: ['./grabadora.css']
})
export class GrabadoraComponent implements OnDestroy {
  isRecording = false;
  recordingTime = '00:00';
  hasRecording = false;
  
  private mediaRecorder: any; 
  private chunks: any[] = []; 
  audioUrl: SafeUrl | null = null; 
  private stream: MediaStream | null = null; 
  
  seconds = 0;
  intervalId: any;

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private recursoService: RecursoService,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {}

  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  async startRecording() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.chunks = [];

      this.mediaRecorder.ondataavailable = (event: any) => {
        this.chunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'audio/webm' }); 
        this.chunks = [];
        
        const unsafeUrl = URL.createObjectURL(blob);
        this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeUrl);
        
        this.hasRecording = true;
        this.cdr.detectChanges();
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this.startTimer();

    } catch (err) {
      console.error('Error al acceder al micrófono:', err);
      alert('No pudimos acceder a tu micrófono. Por favor verifica los permisos.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop(); 
      
      this.stream?.getTracks().forEach(track => track.stop());
      
      this.isRecording = false;
      this.stopTimer();
    }
  }

  startTimer() {
    this.seconds = 0;
    this.recordingTime = '00:00';
    this.intervalId = setInterval(() => {
      this.seconds++;
      const mins = Math.floor(this.seconds / 60).toString().padStart(2, '0');
      const secs = (this.seconds % 60).toString().padStart(2, '0');
      this.recordingTime = `${mins}:${secs}`;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  guardarAudio() {
    if (this.audioUrl) {
      const username = this.loginService.getUsername();
      
      // Buscamos al usuario actual para asignarle la grabación
      this.usuarioService.listar().subscribe(usuarios => {
          const usuarioActual = usuarios.find((u: any) => u.username === username);
          
          if (usuarioActual) {
              const nuevoRecurso: Recurso = new Recurso();
              nuevoRecurso.titulo = 'Grabación de Voz - ' + new Date().toLocaleString();
              nuevoRecurso.descripcion = 'Bitácora de voz registrada desde la app';
              nuevoRecurso.tipo = 'Audio';
              
              // NOTA: Aquí simulamos la URL porque no tenemos subida de archivos real al backend.
              // En un proyecto real, primero subirías el Blob y el backend te daría la URL.
              nuevoRecurso.enlace = 'grabacion_guardada_localmente'; 
              
              // Asegúrate de que tu modelo 'Recurso' tenga este campo (fechaCr o fecha)
              // Si en tu modelo es 'fechaCr', usa ese.
              nuevoRecurso.fechaCr = new Date(); 
              
              nuevoRecurso.creador = usuarioActual; 
              nuevoRecurso.destinatario = usuarioActual; 
              nuevoRecurso.esPublico = false;

              this.recursoService.insert(nuevoRecurso).subscribe(() => {
                  alert("¡Grabación registrada en tu historial!");
                  this.descartarAudio(); // Limpia la pantalla
              });
          }
      });
    }
  }

  descartarAudio() {
    this.hasRecording = false;
    this.audioUrl = null;
    this.recordingTime = '00:00';
    this.seconds = 0;
  }

  ngOnDestroy() {
    this.stopRecording();
    this.stopTimer();
  }
}