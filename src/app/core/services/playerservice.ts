import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  currentTrack = signal<any>(null);
  isPlaying = signal<boolean>(false);
  
  volume = signal<number>(0.5); 

  private audio = new Audio();

  constructor() {
    this.audio.volume = this.volume();
    
    this.audio.onended = () => this.isPlaying.set(false);
  }

  playTrack(track: any) {
    this.currentTrack.set(track);
    this.audio.src = track.audio;
    this.audio.load();
    this.play();
  }

  play() {
    this.audio.play();
    this.isPlaying.set(true);
  }

  pause() {
    this.audio.pause();
    this.isPlaying.set(false);
  }

  toggle() {
    this.isPlaying() ? this.pause() : this.play();
  }

  close() {
    this.pause();
    this.audio.src = '';
    this.currentTrack.set(null);
  }

  setVolume(val: number) {
    this.audio.volume = val; 
    this.volume.set(val);    
  }
  
  
  toggleMute() {
    if (this.volume() > 0) {
        this.audio.volume = 0;
        this.volume.set(0);
    } else {
        this.audio.volume = 0.5; 
        this.volume.set(0.5);
    }
  }
}