import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list'; // Importante para la lista
import { RecursoService } from '../../../core/services/recurso-service';
import { Recurso } from '../../../models/recurso';
import { LoginService } from '../../../core/services/login';
import { UsuarioService } from '../../../core/services/usuarioservice';

@Component({
  selector: 'app-grabadora',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatListModule],
  templateUrl: './grabadora.html',
  styleUrls: ['./grabadora.css']
})
export class GrabadoraComponent implements OnInit, OnDestroy {
  isRecording = false;
  recordingTime = '00:00';
  hasRecording = false;
  
  private mediaRecorder: any; 
  private chunks: any[] = []; 
  audioUrl: SafeUrl | null = null; 
  audioBlob: Blob | null = null; // Variable para el archivo crudo
  private stream: MediaStream | null = null; 
  
  seconds = 0;
  intervalId: any;

  misGrabaciones: Recurso[] = []; // Lista para el historial

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private recursoService: RecursoService,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarGrabaciones();
  }

  // Cargar grabaciones filtradas por el usuario actual
  cargarGrabaciones() {
    const usuarioActual = this.loginService.getUsername();
  
  this.recursoService.list().subscribe(data => {
    this.misGrabaciones = data.filter(r => 
      (r.nombreCreador === usuarioActual || r.creador?.username === usuarioActual) && r.tipo === 'Audio'
    ).sort((a, b) => new Date(b.fechaCr).getTime() - new Date(a.fechaCr).getTime());
  });
  }

  async toggleRecording() {
    this.isRecording ? this.stopRecording() : await this.startRecording();
  }

  async startRecording() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.chunks = [];

      this.mediaRecorder.ondataavailable = (event: any) => this.chunks.push(event.data);

      this.mediaRecorder.onstop = () => {
        this.audioBlob = new Blob(this.chunks, { type: 'audio/webm' }); 
        const unsafeUrl = URL.createObjectURL(this.audioBlob);
        this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeUrl);
        this.hasRecording = true;
        this.cdr.detectChanges();
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this.startTimer();
    } catch (err) {
      console.error('Error al acceder al micrófono:', err);
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop(); 
      this.stream?.getTracks().forEach(track => track.stop());
      this.isRecording = false;
      this.stopTimer();
    }
  }

  startTimer() {
    this.seconds = 0;
    this.intervalId = setInterval(() => {
      this.seconds++;
      const mins = Math.floor(this.seconds / 60).toString().padStart(2, '0');
      const secs = (this.seconds % 60).toString().padStart(2, '0');
      this.recordingTime = `${mins}:${secs}`;
    }, 1000);
  }

  stopTimer() { clearInterval(this.intervalId); }

  // Convierte el audio a Base64 para guardarlo en la BD
  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  async guardarAudio() {
    if (this.audioBlob) {
      const username = this.loginService.getUsername();
      const base64Audio = await this.blobToBase64(this.audioBlob);

      this.usuarioService.listar().subscribe(usuarios => {
          // Asegúrate de que 'u.username' coincida con lo que devuelve loginService
          const usuarioActual = usuarios.find((u: any) => u.username === username || u.email === username);
          
          if (usuarioActual) {
              const recursoDTO = {
                  id: 0, 
                  titulo: 'Bitácora ' + new Date().toLocaleString(),
                  descripcion: 'Grabación de voz',
                  tipo: 'Audio',
                  enlace: base64Audio,
                  fechaCr: new Date().toISOString().split('T')[0], 
                  
                  // IMPORTANTE: Asegúrate que idUsuario tenga valor
                  creadorId: usuarioActual.idUsuario, 
                  destinatarioId: usuarioActual.idUsuario,
                  
                  esPublico: false
              };

              console.log("Enviando al backend:", recursoDTO); // Para depurar

              this.recursoService.insert(recursoDTO as any).subscribe({
                  next: () => {
                      this.cargarGrabaciones();
                      this.descartarAudio();
                  },
                  error: (err) => console.error("Error al guardar:", err)
              });
          } else {
             console.error("No se encontró el usuario logueado en la lista");
          }
      });
    }
}

  // Descarga el audio (Ya sea local o desde la lista)
  descargarAudio(audioData: any, isLocal: boolean) {
    let url = audioData;
    if(isLocal && this.audioBlob) {
       url = window.URL.createObjectURL(this.audioBlob);
    }
    const link = document.createElement('a');
    link.href = url;
    link.download = `grabacion_${new Date().getTime()}.mp3`; 
    link.click();
  }

  descartarAudio() {
    this.hasRecording = false;
    this.audioUrl = null;
    this.audioBlob = null;
    this.recordingTime = '00:00';
    this.seconds = 0;
  }

  eliminarGrabacion(id: number) {
    if(confirm("¿Estás seguro de eliminar esta grabación?")) {
      this.recursoService.delete(id).subscribe(() => this.cargarGrabaciones());
    }
  }

  ngOnDestroy() { this.stopRecording(); this.stopTimer(); }
}